import {data} from './data.mjs';

const {artists,relations,types} = data;
const ids = Object.keys(artists);
const adjacency = new Map(ids.map(id => [id,new Set()]));
for (const edge of relations) {
  adjacency.get(edge.a).add(edge.b);
  adjacency.get(edge.b).add(edge.a);
}

const degree = Object.fromEntries(ids.map(id => [id,adjacency.get(id).size]));
const typeCounts = Object.fromEntries(Object.keys(types).map(type => [type,0]));
for (const edge of relations) typeCounts[edge.type]++;

const components = [];
const visited = new Set();
for (const start of ids) {
  if (visited.has(start)) continue;
  const queue = [start];
  const component = [];
  visited.add(start);
  for (let index = 0; index < queue.length; index++) {
    const id = queue[index];
    component.push(id);
    for (const next of adjacency.get(id)) {
      if (visited.has(next)) continue;
      visited.add(next);
      queue.push(next);
    }
  }
  components.push(component);
}
components.sort((a,b) => b.length-a.length);

const largest = components[0] ?? [];
let diameter = 0;
let diameterPair = null;
let pathLength = 0;
let pathCount = 0;
for (const start of largest) {
  const distances = new Map([[start,0]]);
  const queue = [start];
  for (let index = 0; index < queue.length; index++) {
    const id = queue[index];
    const nextDistance = distances.get(id)+1;
    for (const next of adjacency.get(id)) {
      if (distances.has(next)) continue;
      distances.set(next,nextDistance);
      queue.push(next);
      pathLength += nextDistance;
      pathCount++;
      if (nextDistance > diameter) {
        diameter = nextDistance;
        diameterPair = [start,next];
      }
    }
  }
}

// A non-leaf bridge is a unique pair whose removal separates two groups.
const bridges = [];
for (const component of components) {
  for (const a of component) {
    if (degree[a] < 2) continue;
    for (const b of adjacency.get(a)) {
      if (b <= a || degree[b] < 2) continue;
      const seen = new Set([a]);
      const queue = [a];
      for (const id of queue) {
        for (const next of adjacency.get(id)) {
          if ((id === a && next === b) || seen.has(next)) continue;
          seen.add(next);
          queue.push(next);
        }
      }
      if (!seen.has(b)) bridges.push({a,b,smallerGroup:Math.min(seen.size,component.length-seen.size)});
    }
  }
}
bridges.sort((a,b) => b.smallerGroup-a.smallerGroup);
const betweenness = Object.fromEntries(ids.map(id => [id,0]));
for (const source of ids) {
  const stack = [];
  const predecessors = new Map(ids.map(id => [id,[]]));
  const paths = new Map(ids.map(id => [id,0]));
  const depth = new Map(ids.map(id => [id,-1]));
  paths.set(source,1);
  depth.set(source,0);
  const queue = [source];
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];
    stack.push(current);
    for (const next of adjacency.get(current)) {
      if (depth.get(next) < 0) {
        queue.push(next);
        depth.set(next,depth.get(current)+1);
      }
      if (depth.get(next) === depth.get(current)+1) {
        paths.set(next,paths.get(next)+paths.get(current));
        predecessors.get(next).push(current);
      }
    }
  }
  const scores = new Map(ids.map(id => [id,0]));
  while (stack.length) {
    const child = stack.pop();
    for (const parent of predecessors.get(child)) {
      scores.set(parent,scores.get(parent)+(paths.get(parent)/paths.get(child))*(1+scores.get(child)));
    }
    if (child !== source) betweenness[child] += scores.get(child);
  }
}

const sortedDegree = Object.values(degree).sort((a,b) => a-b);
const histogram = {};
for (const value of sortedDegree) histogram[value] = (histogram[value] ?? 0)+1;

console.log(JSON.stringify({
  nodes:ids.length,
  people:ids.filter(id => !artists[id].scene.endsWith('乐队')).length,
  bands:ids.filter(id => artists[id].scene.endsWith('乐队')).length,
  relationships:relations.length,
  uniqueConnectedPairs:new Set(relations.map(edge => [edge.a,edge.b].sort().join('|'))).size,
  types:typeCounts,
  meanDegree:sortedDegree.reduce((a,b) => a+b,0)/sortedDegree.length,
  medianDegree:sortedDegree.length%2?sortedDegree[(sortedDegree.length-1)/2]:
    (sortedDegree[sortedDegree.length/2-1]+sortedDegree[sortedDegree.length/2])/2,
  isolated:Object.values(degree).filter(value => value === 0).length,
  singleConnection:Object.values(degree).filter(value => value === 1).length,
  degreeHistogram:histogram,
  components:components.length,
  componentSizes:components.map(component => component.length),
  largestComponent:largest.length,
  largestComponentShare:largest.length/ids.length,
  averageShortestPath:pathCount ? pathLength/pathCount : null,
  nonLeafBridgeCount:bridges.length,
  mostFragileBridges:bridges.slice(0,20),
  diameter,
  diameterPair:diameterPair?.map(id => ({id,name:artists[id].name})) ?? null,
  topDegree:Object.entries(degree).sort((a,b) => b[1]-a[1]).slice(0,20)
    .map(([id,value]) => ({id,name:artists[id].name,degree:value,centrality:Number((value/Math.max(ids.length-1,1)).toFixed(6))})),
  topBetweenness:Object.entries(betweenness).sort((a,b) => b[1]-a[1]).slice(0,20)
    .map(([id,value]) => ({id,name:artists[id].name,betweenness:Number((value/2).toFixed(3))}))
},null,2));
