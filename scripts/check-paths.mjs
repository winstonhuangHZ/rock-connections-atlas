import {data} from './data.mjs';

const {artists,relations} = data;
const neighbours = Object.fromEntries(Object.keys(artists).map(id => [id,[]]));
for (const edge of relations) {
  neighbours[edge.a].push(edge);
  neighbours[edge.b].push(edge);
}

const other = (edge,id) => edge.a === id ? edge.b : edge.a;
function shortestPath(from,to,type = 'all') {
  const queue = [from];
  const previous = new Map([[from,null]]);
  for (let index = 0; index < queue.length; index++) {
    const id = queue[index];
    if (id === to) break;
    for (const edge of neighbours[id]) {
      if (type !== 'all' && edge.type !== type) continue;
      const next = other(edge,id);
      if (previous.has(next)) continue;
      previous.set(next,edge);
      queue.push(next);
    }
  }
  if (!previous.has(to)) return null;
  const steps = [];
  for (let id = to; id !== from;) {
    const edge = previous.get(id);
    steps.unshift([id,edge]);
    id = other(edge,id);
  }
  return steps;
}

const checks = [
  ['joe-strummer','nico',7],
  ['joe-strummer','paul',2],
  ['brian-may','rivers',2],
  ['brian-may','ringo',3],
  ['brian-may','weezer',3],
  ['bonham','oasis',4],
  ['buddy','kurt',5],
  ['chuck-berry','liam',3],
  ['jim','chester-bennington',11],
  ['brian-wilson','thom-yorke',6],
  ['lou','grohl',3],
  ['johnny-rotten','thom-yorke',7],
  ['james-hetfield','liam',8],
  ['tony-iommi','kurt',4],
  ['patti','chris-cornell',7],
  ['ray-davies','axl-rose',5],
  ['r-e-m','radiohead',1]
];
let failed = false;
for (const [from,to,maximum] of checks) {
  const path = shortestPath(from,to);
  if (!path) {
    console.error(`FAIL ${artists[from].name} → ${artists[to].name}: no path`);
    failed = true;
    continue;
  }
  const names = [artists[from].name,...path.map(([id]) => artists[id].name)];
  const status = path.length <= maximum ? 'PASS' : 'FAIL';
  console.log(`${status} ${path.length}≤${maximum}: ${names.join(' → ')}`);
  if (path.length > maximum) failed = true;
}

const memberExample = shortestPath('page','bonham','member');
if (!memberExample || memberExample.length !== 2) {
  console.error('FAIL relationship-type filtered traversal');
  failed = true;
} else {
  console.log('PASS relationship-type filtered traversal');
}
if (failed) process.exitCode = 1;
