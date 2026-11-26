import {data} from './data.mjs';

const normalize = value => value.normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const groups = Map.groupBy(data.relations.filter(r=>r.ref.startsWith('lineup-')),r=>r.ref);
const results = [];
for (const [ref,edges] of groups) {
  const [,url] = data.sources[ref];
  try {
    const response = await fetch(url,{
      signal:AbortSignal.timeout(12000),
      headers:{'User-Agent':'RockConnectionsAtlas/1.0 (historical lineup source audit)'}
    });
    if (!response.ok) throw Error('HTTP '+response.status);
    const markup = await response.text();
    const searchable = normalize(markup.replace(/<[^>]+>/g,' '));
    const present = [];
    const review = [];
    for (const {a} of edges) {
      const person = data.artists[a];
      (searchable.includes(normalize(person.name)) ? present : review).push(person.name);
    }
    results.push({url,present,review});
  } catch (err) {
    results.push({url,error:err.message,review:edges.map(({a})=>data.artists[a].name)});
    if (err.message === 'HTTP 429') break;
  }
}
console.log(JSON.stringify(results,null,2));
