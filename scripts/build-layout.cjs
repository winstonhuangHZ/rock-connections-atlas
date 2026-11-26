const fs = require('node:fs');
const vm = require('node:vm');
const cytoscape = require('cytoscape');
cytoscape.use(require('cytoscape-fcose'));
const directory = require('node:path').resolve(__dirname,'..')+'/';
const context = {};
for (const file of ['catalog','lineups','connections']) {
  vm.runInNewContext(fs.readFileSync(directory+file+'.js','utf8'),context);
}
const {artists,relations,sources,types} = vm.runInNewContext('({artists,relations,sources,types})',context);
const ids = Object.keys(artists);
const pairKeys = new Set();
for (const edge of relations) {
  const {a,b,type,ref,title,detail} = edge;
  if (!artists[a] || !artists[b] || a === b || !sources[ref] || !types[type] || !title || !detail) throw Error(JSON.stringify(edge));
  const key = [a,b].sort().concat(type,title).join('|');
  if (pairKeys.has(key)) throw Error('Duplicate: '+key);
  pairKeys.add(key);
}
const cy = cytoscape({
  headless:true, styleEnabled:true,
  style:[{selector:'node',style:{width:22,height:22}}],
  elements:[
    ...ids.map(id => ({data:{id}})),
    ...relations.map(({a,b,type},index) => ({data:{id:'edge-'+index,source:a,target:b,type}}))
  ]
});
const components = cy.elements().components().sort((a,b) => b.nodes().length - a.nodes().length);
let rng = 17211;
Math.random = () => ((rng = (Math.imul(rng,1664525)+1013904223) >>> 0) / 4294967296);
for (const cluster of components) {
  cluster.layout({
    name:'fcose',quality:'proof',randomize:true,animate:false,fit:false,packComponents:false,
    nodeRepulsion:10500,idealEdgeLength:edge => edge.data('type') === 'member' ? 59 : 82,
    gravity:.23,numIter:2000
  }).run();
}
const positions = {};
const boxes = components.map(component => [component,component.nodes().boundingBox({includeLabels:false})]);
const main = boxes[0][1];
const total = boxes.reduce((sum,[,box]) => sum+(box.w+85)*(box.h+85),0);
const maxWidth = Math.max(main.w + 460, Math.sqrt(total*1.85));
let x = 0,y = 0,row = 0;
for (const [cluster,box] of boxes) {
  if (x + box.w > maxWidth && x > 0) { y += row + 75; x = 0; row = 0; }
  cluster.nodes().forEach(node => {
    const position = node.position();
    positions[node.id()] = {x:Math.round((position.x-box.x1+x)*1.13),y:Math.round((position.y-box.y1+y)*.78)};
  });
  x += box.w + 65;
  row = Math.max(row,box.h);
}
cy.destroy();
fs.writeFileSync(directory+'layout.js','const atlasPositions = '+JSON.stringify(positions)+';\n');
const bandCount = Object.values(artists).filter(p=>p.scene.endsWith('乐队')).length;
console.log({people:ids.length-bandCount,bandCount,edges:relations.length,components:boxes.length});
