function createGraphLabels(cy) {
  const layer = document.createElement('div');
  layer.className = 'graph-labels';
  layer.setAttribute('aria-hidden', 'true');
  cy.container().append(layer);

  const canvas = document.createElement('canvas').getContext('2d');
  const widths = new Map();
  const visible = new Map();
  const nodes = cy.nodes().map(node => {
    const id = node.id();
    const degree = node.neighborhood('node').length;
    const collaborators = new Set();
    node.connectedEdges('.record, .member, .tour').forEach(edge => {
      collaborators.add(edge.source().id() === id ? edge.target().id() : edge.source().id());
    });
    const landmark = node.hasClass('landmark');
    // Repeated credits to the same collaborator count once. The bonuses adjust
    // close contests while total degree remains the main ranking signal.
    const importance = Math.log1p(degree) + 0.18 * Math.log1p(collaborators.size) + (landmark ? 0.13 : 0);
    return {node, id, degree, importance, prominent: degree >= 13 || landmark};
  });
  const maxDegree = Math.max(2, ...nodes.map(({degree}) => degree));
  const degreeScale = degree => {
    const relativeDegree = Math.log1p(Math.max(0, degree - 1) / 3) / Math.log1p((maxDegree - 1) / 3);
    return relativeDegree ** 1.45;
  };
  let frame = 0;

  function schedule() {
    if (!frame) frame = requestAnimationFrame(layout);
  }

  function refreshFonts() {
    widths.clear();
    schedule();
  }

  function layout() {
    frame = 0;
    const {clientWidth: width, clientHeight: height} = layer;
    if (!width || !height) return;
    const zoom = cy.zoom();
    const inspecting = cy.nodes('.active-node').length > 0;
    const fontGrowth = Math.round(Math.min(5, Math.max(0, (zoom - 0.3) * 4)) * 2) / 2;
    const maxLabelSize = width < 500 ? 23 : 28;
    const family = getComputedStyle(layer).fontFamily;
    const occupied = new Map();
    const candidates = [];
    const kept = new Set();

    for (const entry of nodes) {
      const {node, id, importance, prominent} = entry;
      const {x, y} = node.renderedPosition();
      const rx = node.renderedOuterWidth() / 2;
      const ry = node.renderedOuterHeight() / 2;
      if (x + rx < 0 || x - rx > width || y + ry < 0 || y - ry > height) continue;
      const hovered = node.hasClass('hovered');
      const marker = {
        left: x - rx, right: x + rx, top: y - ry, bottom: y + ry,
        background: inspecting ? node.hasClass('muted') : !prominent && !hovered,
        small: Math.max(rx, ry) <= 4
      };
      for (const key of graphLabelCells(marker)) {
        if (!occupied.has(key)) occupied.set(key, []);
        occupied.get(key).push(marker);
      }

      const active = node.hasClass('active-node');
      const related = node.hasClass('related');
      const priority = active ? 3 : hovered ? 2 : related ? 1 : 0;
      if (x < 0 || x > width || y < 0 || y > height) continue;
      if (!priority && inspecting) continue;
      const score = importance + (visible.has(id) ? 0.025 : 0);
      candidates.push({...entry, x, y, rx, ry, priority, score});
    }

    candidates.sort((a, b) =>
      b.priority - a.priority || b.score - a.score || b.degree - a.degree || a.id.localeCompare(b.id, 'en')
    );
    for (const {node, id, degree, x, y, rx, ry, priority, prominent} of candidates) {
      const name = node.data('name');
      const baseSize = 10.5 + (maxLabelSize - 10.5) * degreeScale(degree);
      const focusSize = [0, 13, maxLabelSize, maxLabelSize + 2][priority];
      const fontSize = Math.round(Math.max(baseSize, focusSize) * 2) / 2 + fontGrowth;
      const useExtendedAnchors = priority > 0 || prominent;
      const weight = priority >= 2 || degree >= 13 ? 700 : priority || degree >= 6 ? 600 : 400;
      const lineHeight = fontSize + 3;
      const font = `${weight} ${fontSize}px ${family}`;
      const key = `${font}\n${name}`;
      if (!widths.has(key)) {
        canvas.font = font;
        widths.set(key, Math.ceil(canvas.measureText(name).width));
      }
      const labelWidth = widths.get(key) + 4; // Two pixels of CSS padding on each side.
      const previous = visible.get(id);
      const gaps = useExtendedAnchors ? [5, 15, 25, 39] : [5, 12];
      const offsets = gaps.flatMap(gap => [
        [rx + gap, -lineHeight / 2],
        [-labelWidth / 2, ry + gap],
        [-rx - gap - labelWidth, -lineHeight / 2],
        [-labelWidth / 2, -ry - gap - lineHeight],
        [rx + gap, -ry - gap - lineHeight],
        [rx + gap, ry + gap],
        [-rx - gap - labelWidth, -ry - gap - lineHeight],
        [-rx - gap - labelWidth, ry + gap]
      ]);
      // Keep the previous anchor as long as its screen rectangle still fits.
      const order = offsets.map((_, index) => index);
      if (previous && previous.anchor < order.length) order.unshift(...order.splice(previous.anchor, 1));
      // A paper backing lets a label use space over small context markers when needed.
      const attempts = order.map(anchor => ({anchor, allowBackground: false}));
      attempts.push(...order.map(anchor => ({anchor, allowBackground: true})));
      for (const {anchor, allowBackground} of attempts) {
        const left = Math.round(x + offsets[anchor][0]);
        const top = Math.round(y + offsets[anchor][1]);
        const pad = 1;
        const box = {left: left - pad, top: top - pad, right: left + labelWidth + pad, bottom: top + lineHeight + pad};
        if (box.left < 0 || box.top < 0 || box.right > width || box.bottom > height) continue;
        const cells = graphLabelCells(box);
        if (cells.some(cell => occupied.get(cell)?.some(other =>
          !(allowBackground && other.background && (useExtendedAnchors || other.small)) &&
          box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top
        ))) continue;

        const label = previous?.label || document.createElement('span');
        const leader = previous?.leader || document.createElement('span');
        if (!previous) {
          label.className = 'graph-label';
          label.dataset.nodeId = id;
          leader.className = 'graph-label-leader';
          layer.append(leader, label);
        }
        if (label.textContent !== name) label.textContent = name;
        label.style.fontSize = `${fontSize}px`;
        label.style.fontWeight = weight;
        label.style.lineHeight = `${lineHeight}px`;
        label.style.transform = `translate(${left}px, ${top}px)`;
        leader.hidden = anchor < 8;
        if (!leader.hidden) {
          const dx = Math.min(Math.max(x, left), left + labelWidth) - x;
          const dy = Math.min(Math.max(y, top), top + lineHeight) - y;
          const angle = Math.atan2(dy, dx);
          const start = Math.max(rx, ry) + 2;
          leader.style.width = `${Math.hypot(dx, dy) - start - 2}px`;
          leader.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) translateX(${start}px)`;
        }
        visible.set(id, {label, anchor, leader});
        kept.add(id);
        for (const cell of cells) {
          if (!occupied.has(cell)) occupied.set(cell, []);
          occupied.get(cell).push(box);
        }
        break;
      }
    }

    for (const [id, {label, leader}] of visible) {
      if (kept.has(id)) continue;
      label.remove();
      leader.remove();
      visible.delete(id);
    }
  }

  cy.on('viewport resize', schedule);
  document.fonts.ready.then(refreshFonts);
  document.fonts.addEventListener('loadingdone', refreshFonts);
  return schedule;
}

function graphLabelCells({left, top, right, bottom}) {
  const size = 64;
  const cells = [];
  for (let col = Math.floor(left / size); col <= Math.floor(right / size); col++) {
    for (let row = Math.floor(top / size); row <= Math.floor(bottom / size); row++) {
      cells.push(`${col},${row}`);
    }
  }
  return cells;
}
