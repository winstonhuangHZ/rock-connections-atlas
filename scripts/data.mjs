import {existsSync, readFileSync} from 'node:fs';
import {createContext, runInContext} from 'node:vm';

const root = new URL('../', import.meta.url);
const context = createContext({});
for (const name of ['catalog','lineups','connections','connections-musicbrainz','connections-research','connections-enrichment','portraits','layout','locale']) {
  const url = new URL(name+'.js',root);
  runInContext(readFileSync(url,'utf8'),context,{filename:url.pathname});
}
export const data = runInContext('({artists,relations,types,sources,portraits,atlasPositions,englishStoryMap,englishYearWords})',context);

if (process.argv[2] === '--check') {
  const {artists,relations,types,sources,portraits,atlasPositions,englishStoryMap} = data;
  const ids = Object.keys(artists);
  if (Object.keys(atlasPositions).length !== ids.length) throw Error('Rebuild layout.js after editing the catalog.');
  for (const id of ids) {
    const pos = atlasPositions[id];
    if (!pos || !Number.isFinite(pos.x) || !Number.isFinite(pos.y)) throw Error('Missing layout position: '+id);
  }
  const pairs = new Set();
  for (const edge of relations) {
    const {a,b,type,ref,title,detail,en,direction} = edge;
    const check = [a,b].sort().concat(type,title).join('|');
    if (!artists[a] || !artists[b] || a === b || !types[type] || !title || !detail || (direction !== undefined && direction !== 'forward') || pairs.has(check)) {
      throw Error('Invalid or duplicate relationship: '+check);
    }
    if (!sources[ref]?.[0] || new URL(sources[ref][1]).protocol !== 'https:') throw Error('Invalid source: '+ref);
    if (type !== 'member' && !(en?.title && en?.detail) && !englishStoryMap.has(a+'|'+b)) {
      throw Error('Missing English summary: '+check);
    }
    pairs.add(check);
  }
  for (const [id,picture] of Object.entries(portraits)) {
    if (!artists[id] || !picture.license || !picture.url || !existsSync(new URL(picture.path,root))) throw Error('Invalid portrait: '+id);
  }
  const bands = Object.values(artists).filter(p=>p.scene.endsWith('乐队')).length;
  console.log({people:ids.length-bands,bands,relationships:relations.length,portraits:Object.keys(portraits).length});
}
