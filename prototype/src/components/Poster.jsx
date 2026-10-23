// Generated "pencil test" artwork: one shape per title drawn as the current frame
// (graphite outline, tinted fill) over two ghost frames in non-photo blue (onion skin).
// Real posters will come from YouTube thumbnails; this keeps the prototype free of copyrighted art.

function seeded(seed) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Smooth closed path through points (Catmull-Rom converted to cubic Bézier)
function smoothPath(points) {
  const n = points.length;
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
}

function blob(rand, cx, cy, r, points = 7, spiky = false) {
  const pts = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2 - Math.PI / 2;
    const k = spiky ? (i % 2 ? 0.55 : 1.05) : 0.72 + rand() * 0.45;
    pts.push([cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k]);
  }
  return smoothPath(pts);
}

function shapesFor(title) {
  const rand = seeded(title.id * 17 + 3);
  const kind = title.id % 3;
  if (kind === 0) return [blob(rand, 120, 98, 58, 8)];
  if (kind === 1) return [blob(rand, 120, 118, 46, 7), blob(rand, 120, 52, 24, 6)]; // body + head
  return [blob(rand, 120, 92, 62, 10, true)];
}

export default function Poster({ title, className = "" }) {
  const shapes = shapesFor(title);
  const tint = title.colors[1];
  return (
    <svg className={`poster ${className}`} viewBox="0 0 240 180" preserveAspectRatio={className.includes("fill") ? "xMidYMid slice" : "xMidYMid meet"} role="img" aria-label={`Artwork placeholder for ${title.name}`}>
      <rect width="240" height="180" fill={tint} opacity="0.12" />
      <line x1="16" y1="160" x2="224" y2="160" stroke="var(--blue)" strokeOpacity="0.35" strokeDasharray="2 5" />
      {[2, 1].map((k) => (
        <g key={k} className="onion-ghost" transform={`translate(${-k * 9} ${k * 3}) rotate(${-k * 4} 120 90)`} opacity={0.18 * (3 - k)}>
          {shapes.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--blue)" strokeWidth="1.4" />
          ))}
        </g>
      ))}
      <g>
        {shapes.map((d, i) => (
          <path key={i} d={d} fill={tint} fillOpacity="0.55" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        ))}
      </g>
    </svg>
  );
}
