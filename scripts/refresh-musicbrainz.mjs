import {existsSync} from 'node:fs';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {data} from './data.mjs';

const {artists,relations} = data;
const root = new URL('../',import.meta.url);
const cacheDirectory = new URL('.cache/musicbrainz/',root);
const outputPath = new URL('musicbrainz-candidates.json',root);
const userAgent = 'RockConnectionsAtlasResearch/1.0 (repository maintainer)';
const fetchLimit = Number(process.env.MB_LIMIT ?? Object.keys(artists).length);
await mkdir(cacheDirectory,{recursive:true});

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve,milliseconds));
async function fetchJSON(url,options = {}) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const response = await fetch(url,{
      ...options,
      headers:{'User-Agent':userAgent,'Accept':'application/json',...(options.headers ?? {})}
    });
    if (response.ok) return response.json();
    if ((response.status === 429 || response.status >= 500) && attempt < 4) {
      await sleep(2500*attempt);
      continue;
    }
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
}
async function loadOrCreate(path,create) {
  if (existsSync(path)) return JSON.parse(await readFile(path,'utf8'));
  const value = await create();
  await writeFile(path,JSON.stringify(value,null,2));
  return value;
}
function articleURL(wiki) {
  return 'https://en.wikipedia.org/wiki/'+encodeURIComponent(wiki.replaceAll(' ','_'));
}

let mbids = {};
const mbidsPath = new URL('musicbrainz-mbids.json',root);
if (existsSync(mbidsPath)) {
  mbids = JSON.parse(await readFile(mbidsPath,'utf8'));
} else {
  const byURL = new Map();
  for (const person of Object.values(artists)) {
    const url = articleURL(person.wiki);
    if (!byURL.has(url)) byURL.set(url,[]);
    byURL.get(url).push(person.id);
  }
  const urls = [...byURL.keys()];
  for (let start = 0; start < urls.length; start += 40) {
    const values = urls.slice(start,start+40).map(url => `<${url}>`).join(' ');
    const query = `
      PREFIX schema: <http://schema.org/>
      SELECT ?article ?item ?mbid WHERE {
        VALUES ?article { ${values} }
        ?article schema:about ?item ;
          schema:isPartOf <https://en.wikipedia.org/> .
        OPTIONAL { ?item wdt:P434 ?mbid. }
      }`;
    const endpoint = new URL('https://query.wikidata.org/sparql');
    endpoint.searchParams.set('query',query);
    endpoint.searchParams.set('format','json');
    const result = await fetchJSON(endpoint);
    for (const binding of result.results.bindings) {
      const ids = byURL.get(binding.article.value) ?? [];
      const id = ids.length === 1 ? ids[0] : null;
      if (!id || !binding.mbid) continue;
      mbids[id] = {
        id,name:artists[id].name,wiki:artists[id].wiki,
        wikidata:binding.item.value,mbid:binding.mbid.value
      };
    }
    console.log(`Wikidata: ${Math.min(start+40,urls.length)}/${urls.length}`);
  }
  await writeFile(mbidsPath,JSON.stringify(mbids,null,2));
}

const mbidToId = new Map(Object.values(mbids).map(person => [person.mbid,person.id]));
const mapping = new Map([
  ['member of band','member'],['founder','member'],
  ['collaboration','record'],['supporting musician','record'],
  ['instrumental supporting musician','record'],['vocal supporting musician','record'],
  ['guest performance','record'],['performed with','record'],
  ['influenced by','influence'],['artistic inspiration','influence'],
  ['spouse','family'],['married','family'],['sibling','family'],['parent','family'],
  ['child','family'],['family','family'],['relative','family'],
  ['friend','personal'],['mentor','personal'],['mentored by','personal']
]);
const existing = new Set(relations.map(edge => [edge.a,edge.b].sort().concat(edge.type).join('|')));
const candidates = new Map();
let processed = 0;
for (const person of Object.values(mbids)) {
  if (processed >= fetchLimit) break;
  processed++;
  const cachePath = new URL(`${person.mbid}.json`,cacheDirectory);
  const result = await loadOrCreate(cachePath,async () => {
    const value = await fetchJSON(`https://musicbrainz.org/ws/2/artist/${person.mbid}?inc=artist-rels&fmt=json`);
    await sleep(1100);
    return value;
  });
  const normalize = value => value.normalize('NFKD').toLowerCase()
    .replace(/^the\s+/,'').replace(/[\p{P}\p{M}\s]/gu,'');
  const expectedNames = [
    artists[person.id].name,
    artists[person.id].wiki.replace(/\s*\([^)]*\)$/,''),
    ...artists[person.id].aliases.split(/\s+/)
  ].map(normalize).filter(Boolean);
  if (!expectedNames.includes(normalize(result.name ?? ''))) {
    console.warn(`Skipping ambiguous identity: ${person.id} (${result.name})`);
    continue;
  }
  for (const relation of result.relations ?? []) {
    const relatedId = mbidToId.get(relation.artist?.id);
    const type = mapping.get(relation.type);
    if (!relatedId || relatedId === person.id || !type) continue;
    let a = person.id;
    let b = relatedId;
    if (type === 'member') {
      const sourceIsBand = artists[a].scene.endsWith('乐队');
      const targetIsBand = artists[b].scene.endsWith('乐队');
      if (sourceIsBand && !targetIsBand) [a,b] = [b,a];
      else if (sourceIsBand === targetIsBand) continue;
    }
    if (type === 'influence' && relation.direction === 'forward') [a,b] = [b,a];
    const pairType = [a,b].sort().concat(type).join('|');
    if (existing.has(pairType)) continue;
    const key = [a,b].sort().concat(type,relation.type,relation.begin ?? '',relation.end ?? '').join('|');
    candidates.set(key,{
      a,b,type,begin:relation.begin ?? '',end:relation.end ?? '',
      mbType:relation.type,attributes:relation.attributes ?? [],
      sourceMbid:person.mbid,
      sourceURL:`https://musicbrainz.org/artist/${person.mbid}/relationships`
    });
  }
  if (processed % 25 === 0 || processed === fetchLimit) {
    console.log(`MusicBrainz: ${processed}/${Math.min(fetchLimit,Object.keys(mbids).length)}`);
  }
}

const output = [...candidates.values()].sort((a,b) =>
  a.type.localeCompare(b.type) ||
  artists[a.a].name.localeCompare(artists[b.a].name,'en') ||
  artists[a.b].name.localeCompare(artists[b.b].name,'en')
);
await writeFile(outputPath,JSON.stringify(output,null,2));
const counts = {};
for (const candidate of output) counts[candidate.type] = (counts[candidate.type] ?? 0)+1;
console.log({candidates:output.length,counts,output:outputPath.pathname});
