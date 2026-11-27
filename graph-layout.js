function spreadGraphPositions(positions, wideScreen) {
  const stretch = wideScreen ? 1.22 : 1;
  const clearanceX = wideScreen ? 150 : 175;
  const clearanceY = wideScreen ? 95 : 110;
  const anchorStrength = wideScreen ? 0.08 : 0.055;
  const points = Object.entries(positions).map(([id, seed]) => ({
    id, x: seed.x * stretch, y: seed.y, anchorX: seed.x * stretch, anchorY: seed.y
  }));
  const xs = points.map(point => point.x);
  const ys = points.map(point => point.y);
  const left = Math.min(...xs), right = Math.max(...xs);
  const top = Math.min(...ys), bottom = Math.max(...ys);

  // Elliptical clearance leaves extra horizontal room for names. The original
  // coordinates pull each node back toward its neighborhood after each pass.
  for (let pass = 0; pass < 70; pass++) {
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        if (Math.abs(dx) >= clearanceX || Math.abs(dy) >= clearanceY) continue;
        const distance = Math.hypot(dx / clearanceX, dy / clearanceY);
        if (distance === 0 || distance >= 1) continue;
        const push = (1 - distance) / distance * 0.34;
        a.x -= dx * push;
        b.x += dx * push;
        a.y -= dy * push;
        b.y += dy * push;
      }
    }
    for (const point of points) {
      const x = point.x + (point.anchorX - point.x) * anchorStrength;
      const y = point.y + (point.anchorY - point.y) * anchorStrength;
      point.x = Math.min(right, Math.max(left, x));
      point.y = Math.min(bottom, Math.max(top, y));
    }
  }

  return Object.fromEntries(points.map(({id, x, y}) => [id, {x, y}]));
}
