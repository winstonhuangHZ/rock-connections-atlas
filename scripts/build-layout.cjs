const fs = require('node:fs');
const vm = require('node:vm');
const directory = require('node:path').resolve(__dirname, '..') + '/';
const context = {};
for (const file of ['catalog', 'lineups', 'connections', 'connections-musicbrainz', 'connections-research', 'connections-enrichment', 'layout']) {
  vm.runInNewContext(fs.readFileSync(directory + file + '.js', 'utf8'), context);
}
const { artists, relations, sources, types, atlasPositions } = vm.runInNewContext(
  '({artists,relations,sources,types,atlasPositions})',
  context
);
const ids = Object.keys(artists);
const pairKeys = new Set();
for (const edge of relations) {
  const { a, b, type, ref, title, detail } = edge;
  if (!artists[a] || !artists[b] || a === b || !sources[ref] || !types[type] || !title || !detail) {
    throw Error(JSON.stringify(edge));
  }
  const key = [a, b].sort().concat(type, title).join('|');
  if (pairKeys.has(key)) throw Error('Duplicate: ' + key);
  pairKeys.add(key);
}

const isBand = id => artists[id].scene.endsWith('乐队');
const landmarks = new Set([
  'nico', 'dylan', 'the-rolling-stones', 'the-clash', 'beatles', 'oasis',
  'zeppelin', 'nirvana', 'queen', 'radiohead', 'metallica', 'pink-floyd', 'no-party-for-cao-dong'
]);

// Optional fresh fcose pass when cytoscape + cytoscape-fcose are installed; otherwise refine existing coordinates
let seedPositions = {};
try {
  const cytoscape = require('cytoscape');
  cytoscape.use(require('cytoscape-fcose'));
  const cy = cytoscape({
    headless: true,
    styleEnabled: true,
    style: [{ selector: 'node', style: { width: 24, height: 24 } }],
    elements: [
      ...ids.map(id => ({ data: { id } })),
      ...relations.map(({ a, b, type }, index) => ({ data: { id: 'edge-' + index, source: a, target: b, type } }))
    ]
  });
  const components = cy.elements().components().sort((a, b) => b.nodes().length - a.nodes().length);
  let rng = 17211;
  Math.random = () => ((rng = (Math.imul(rng, 1664525) + 1013904223) >>> 0) / 4294967296);
  for (const cluster of components) {
    cluster.layout({
      name: 'fcose',
      quality: 'proof',
      randomize: true,
      animate: false,
      fit: false,
      packComponents: false,
      nodeRepulsion: 18500,
      idealEdgeLength: edge => (edge.data('type') === 'member' ? 88 : 138),
      gravity: 0.19,
      numIter: 2500
    }).run();
  }
  const boxes = components.map(component => [component, component.nodes().boundingBox({ includeLabels: false })]);
  const main = boxes[0][1];
  const total = boxes.reduce((sum, [, box]) => sum + (box.w + 110) * (box.h + 110), 0);
  const maxWidth = Math.max(main.w + 520, Math.sqrt(total * 1.65));
  let x = 0, y = 0, row = 0;
  for (const [cluster, box] of boxes) {
    if (x + box.w > maxWidth && x > 0) { y += row + 95; x = 0; row = 0; }
    cluster.nodes().forEach(node => {
      const pos = node.position();
      seedPositions[node.id()] = {
        x: (pos.x - box.x1 + x) * 1.38,
        y: (pos.y - box.y1 + y) * 1.18
      };
    });
    x += box.w + 85;
    row = Math.max(row, box.h);
  }
  cy.destroy();
} catch {
  const boxes = Object.values(atlasPositions);
  const maxX = Math.max(...boxes.map(p => p.x));
  const alreadyExpanded = maxX > 3000;
  for (const id of ids) {
    const p = atlasPositions[id] || { x: 1000, y: 800 };
    seedPositions[id] = alreadyExpanded
      ? { x: p.x, y: p.y }
      : { x: (p.x / 1.13) * 1.76, y: (p.y / 0.78) * 1.52 };
  }
}

const pts = {};
const anchor = {};
for (const id of ids) {
  pts[id] = { x: seedPositions[id].x, y: seedPositions[id].y };
  anchor[id] = { x: seedPositions[id].x, y: seedPositions[id].y };
}

// Anisotropic label-aware spring + repulsion relaxation
for (let iter = 0; iter < 160; iter++) {
  const decay = 1 - iter / 210;
  for (let i = 0; i < ids.length; i++) {
    const idA = ids[i], a = pts[idA];
    const radA = landmarks.has(idA) ? 66 : isBand(idA) ? 50 : 39;
    for (let j = i + 1; j < ids.length; j++) {
      const idB = ids[j], b = pts[idB];
      const radB = landmarks.has(idB) ? 66 : isBand(idB) ? 50 : 39;
      const minD = radA + radB;
      const dx = b.x - a.x, dy = b.y - a.y;
      const effD = Math.hypot(dx * 0.82, dy * 1.18) || 0.01;
      if (effD < minD) {
        const push = ((minD - effD) / effD) * 0.32 * decay;
        a.x -= dx * push;
        a.y -= dy * push * 1.1;
        b.x += dx * push;
        b.y += dy * push * 1.1;
      }
    }
  }
  for (const e of relations) {
    const a = pts[e.a], b = pts[e.b];
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || 0.01;
    const ideal = e.type === 'member' ? 92 : 162;
    const strength = e.type === 'member' ? 0.038 : 0.01;
    const pull = ((d - ideal) / d) * strength * decay;
    a.x += dx * pull;
    a.y += dy * pull;
    b.x -= dx * pull;
    b.y -= dy * pull;
  }
  for (const id of ids) {
    pts[id].x += (anchor[id].x - pts[id].x) * 0.022;
    pts[id].y += (anchor[id].y - pts[id].y) * 0.022;
  }
}

// Hard minimum-distance collision clearance pass
for (let iter = 0; iter < 70; iter++) {
  for (let i = 0; i < ids.length; i++) {
    const idA = ids[i], a = pts[idA];
    const radA = landmarks.has(idA) ? 48 : isBand(idA) ? 39 : 33;
    for (let j = i + 1; j < ids.length; j++) {
      const idB = ids[j], b = pts[idB];
      const radB = landmarks.has(idB) ? 48 : isBand(idB) ? 39 : 33;
      const minD = radA + radB;
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.01;
      if (d < minD) {
        const push = ((minD - d) / d) * 0.45;
        a.x -= dx * push;
        a.y -= dy * push;
        b.x += dx * push;
        b.y += dy * push;
      }
    }
  }
}

let minX = Infinity, minY = Infinity;
for (const id of ids) {
  minX = Math.min(minX, pts[id].x);
  minY = Math.min(minY, pts[id].y);
}
const positions = {};
for (const id of ids) {
  positions[id] = {
    x: Math.round(pts[id].x - minX + 48),
    y: Math.round(pts[id].y - minY + 48)
  };
}
fs.writeFileSync(directory + 'layout.js', 'const atlasPositions = ' + JSON.stringify(positions) + ';\n');
const bandCount = Object.values(artists).filter(p => p.scene.endsWith('乐队')).length;
console.log({ people: ids.length - bandCount, bandCount, edges: relations.length });
