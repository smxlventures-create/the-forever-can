/**
 * Generate wallpaper tiles, lookbook can cards, and how-to diagrams.
 * Run: node scripts/make-pattern-art.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import catalog from '../src/data/products.json' with { type: 'json' };

const outDir = resolve(import.meta.dirname, '../public/images');
await mkdir(outDir, { recursive: true });

function svg(w, h, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
${body}
</svg>
`;
}

function tileDefs(id, inner, size = 160) {
  return `<defs>
  <pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
    ${inner}
  </pattern>
</defs>`;
}

const tiles = {
  'palm-aviary': (s = 180) => `
    <rect width="${s}" height="${s}" fill="#f6f1e6"/>
    <g fill="none" stroke="#2d6a4f" stroke-width="1.6" opacity=".85">
      <path d="M90 170 C70 110 40 80 20 40"/>
      <path d="M90 170 C110 110 140 80 164 36"/>
      <path d="M20 40 c18 8 28 4 40-10 M20 40 c10 16 6 28-8 38"/>
      <path d="M164 36 c-16 10-24 8-38-8 M164 36 c-8 18-4 30 10 40"/>
    </g>
    <g fill="#c45a7a" opacity=".7">
      <ellipse cx="48" cy="72" rx="7" ry="3" transform="rotate(-25 48 72)"/>
      <ellipse cx="136" cy="88" rx="6" ry="2.6" transform="rotate(20 136 88)"/>
    </g>
    <circle cx="90" cy="52" r="3" fill="#2b5bac"/>
    <path d="M58 128 c10-18 22-18 32 0 c-8 4-16 4-32 0Z" fill="#2d6a4f" opacity=".35"/>
  `,
  'blush-garden': (s = 160) => `
    <rect width="${s}" height="${s}" fill="#f3e6e0"/>
    <g fill="#c45a7a" opacity=".55">
      <circle cx="40" cy="40" r="14"/>
      <circle cx="52" cy="34" r="10"/>
      <circle cx="34" cy="52" r="9"/>
      <circle cx="120" cy="110" r="16"/>
      <circle cx="134" cy="102" r="11"/>
      <circle cx="112" cy="124" r="10"/>
    </g>
    <g fill="none" stroke="#6b7a5a" stroke-width="1.4">
      <path d="M48 54 C60 80 70 90 88 120"/>
      <path d="M124 120 C110 90 100 70 90 48"/>
    </g>
    <circle cx="88" cy="78" r="5" fill="#f7d6e0"/>
  `,
  'rose-trellis': (s = 160) => `
    <rect width="${s}" height="${s}" fill="#f7efe8"/>
    <g fill="#c47a86">
      <path d="M36 48 c8-16 24-16 32 0 c-8 6-16 8-32 0Z"/>
      <path d="M44 40 c10-8 18-4 20 8 c-8 2-14 2-20-8Z"/>
      <path d="M108 112 c10-18 28-16 34 4 c-10 6-20 8-34-4Z"/>
    </g>
    <g fill="none" stroke="#6d7b5e" stroke-width="1.3">
      <path d="M20 20 C50 40 50 80 20 120"/>
      <path d="M140 20 C110 40 110 80 140 120"/>
      <path d="M52 70 C70 90 90 90 110 70"/>
    </g>
    <circle cx="80" cy="80" r="3.5" fill="#c45a7a"/>
  `,
  'sage-chinoiserie': (s = 180) => `
    <rect width="${s}" height="${s}" fill="#e6eee6"/>
    <g fill="none" stroke="#5a7a6a" stroke-width="1.5">
      <path d="M20 160 C40 110 50 80 90 40"/>
      <path d="M90 40 C100 70 130 90 164 70"/>
      <path d="M70 90 c8-14 18-12 22 2"/>
      <path d="M118 78 c6-12 16-10 18 4"/>
      <path d="M40 130 h20 v28 h-8 v-12 h-12 z" />
      <path d="M44 130 l6-10 6 10"/>
    </g>
    <g fill="#5a7a6a">
      <circle cx="92" cy="48" r="2.4"/>
      <ellipse cx="64" cy="86" rx="7" ry="2.4"/>
      <ellipse cx="132" cy="74" rx="6" ry="2.2"/>
    </g>
  `,
  'ink-toile': (s = 180) => `
    <rect width="${s}" height="${s}" fill="#f4efe6"/>
    <g fill="none" stroke="#1a1a1a" stroke-width="1.35">
      <path d="M30 160 C40 110 70 90 70 50"/>
      <path d="M70 50 C55 70 40 74 28 68"/>
      <path d="M110 160 C120 100 150 90 150 48"/>
      <circle cx="48" cy="118" r="10"/>
      <path d="M44 112 v-16 h8 v16"/>
      <path d="M90 140 c10-20 30-20 40 0"/>
    </g>
    <circle cx="150" cy="40" r="2.2" fill="#1a1a1a"/>
  `,
  'blush-damask': (s = 160) => `
    <rect width="${s}" height="${s}" fill="#f4e4e8"/>
    <g fill="none" stroke="#d4a5b0" stroke-width="2">
      <path d="M80 16 C110 40 110 70 80 88 C50 70 50 40 80 16Z"/>
      <path d="M80 88 C110 112 110 142 80 164 C50 142 50 112 80 88Z"/>
      <path d="M16 80 C40 50 70 50 88 80 C70 110 40 110 16 80Z"/>
      <path d="M88 80 C112 50 142 50 164 80 C142 110 112 110 88 80Z"/>
    </g>
    <circle cx="80" cy="80" r="6" fill="#f7d6e0"/>
  `,
  'cobalt-lattice': (s = 160) => `
    <rect width="${s}" height="${s}" fill="#f4efe4"/>
    <g fill="none" stroke="#2b5bac" stroke-width="10">
      <path d="M-20 40 L40 -20 M0 160 L160 0 M40 180 L180 40"/>
    </g>
    <g fill="none" stroke="#ffd84d" stroke-width="6">
      <path d="M-20 80 L80 -20 M20 180 L180 20"/>
    </g>
    <g fill="none" stroke="#0d0d12" stroke-width="4">
      <path d="M-10 120 L120 -10 M60 190 L190 60"/>
    </g>
  `,
  'peony-studio': (s = 160) => `
    <rect width="${s}" height="${s}" fill="#f3ece4"/>
    <g fill="#c9a08a" opacity=".75">
      <circle cx="50" cy="52" r="18"/>
      <circle cx="66" cy="46" r="12"/>
      <circle cx="42" cy="66" r="11"/>
      <circle cx="118" cy="118" r="20"/>
      <circle cx="136" cy="110" r="12"/>
    </g>
    <g fill="none" stroke="#8a7a68" stroke-width="1.3">
      <path d="M58 70 C70 96 86 110 110 130"/>
      <path d="M24 90 C40 100 48 120 46 150"/>
    </g>
    <circle cx="52" cy="54" r="4" fill="#f7efe8"/>
  `,
  'atelier-stripe': (s = 80) => `
    <rect width="${s}" height="${s}" fill="#eee9df"/>
    <rect x="0" width="10" height="${s}" fill="#0d0d12"/>
    <rect x="14" width="6" height="${s}" fill="#f4b6c8"/>
    <rect x="26" width="12" height="${s}" fill="#2b5bac"/>
    <rect x="42" width="5" height="${s}" fill="#ffd84d"/>
    <rect x="54" width="10" height="${s}" fill="#0d0d12"/>
    <rect x="68" width="6" height="${s}" fill="#c45a7a"/>
  `,
  'fern-conservatory': (s = 160) => `
    <rect width="${s}" height="${s}" fill="#e8efe4"/>
    <g fill="none" stroke="#3d5c3a" stroke-width="1.6">
      <path d="M80 150 C78 90 70 50 80 16"/>
      <path d="M80 40 c-22 4-28 16-22 28 M80 60 c22 4 28 16 22 28"/>
      <path d="M80 80 c-24 6-30 18-22 32 M80 100 c24 6 30 18 22 32"/>
      <path d="M30 140 C28 90 18 70 14 40"/>
      <path d="M130 20 C132 70 148 90 150 130"/>
    </g>
    <g fill="#3d5c3a" opacity=".35">
      <ellipse cx="58" cy="54" rx="12" ry="5" transform="rotate(-20 58 54)"/>
      <ellipse cx="104" cy="86" rx="12" ry="5" transform="rotate(22 104 86)"/>
    </g>
  `,
  'calacatta-stone': (s = 200) => `
    <rect width="${s}" height="${s}" fill="#f4f0ea"/>
    <g fill="none" stroke="#b8aea2" stroke-width="2.2">
      <path d="M0 40 C40 30 70 70 110 60 C150 48 170 90 200 80"/>
      <path d="M0 120 C50 140 80 100 130 118 C160 130 180 110 200 124"/>
    </g>
    <g fill="none" stroke="#8e8578" stroke-width="1.1" opacity=".7">
      <path d="M20 0 C30 50 10 90 40 200"/>
      <path d="M160 0 C150 60 180 110 150 200"/>
      <path d="M80 10 C90 80 70 130 95 200"/>
    </g>
  `,
  'midnight-toile': (s = 180) => `
    <rect width="${s}" height="${s}" fill="#1b2a4a"/>
    <g fill="none" stroke="#e8e4dc" stroke-width="1.4">
      <path d="M24 160 C40 100 70 80 88 36"/>
      <path d="M88 36 C76 60 50 70 30 64"/>
      <path d="M120 170 C130 110 158 90 164 40"/>
      <path d="M50 120 c12-8 22-4 18 10"/>
      <path d="M140 90 c10-14 22-8 16 8"/>
    </g>
    <g fill="#e8e4dc">
      <ellipse cx="46" cy="108" rx="8" ry="3"/>
      <ellipse cx="148" cy="78" rx="7" ry="2.6"/>
      <circle cx="88" cy="32" r="2.2"/>
    </g>
  `
};

const tileSize = {
  'atelier-stripe': 80,
  'calacatta-stone': 200,
  'palm-aviary': 180,
  'sage-chinoiserie': 180,
  'ink-toile': 180,
  'midnight-toile': 180
};

function lookCard(pattern) {
  const tile = tiles[pattern.slug];
  const size = tileSize[pattern.slug] || 160;
  const light = pattern.colors[0];
  const dark = pattern.colors[1];
  return svg(
    900,
    1200,
    `
  ${tileDefs('p', tile(size), size)}
  <rect width="900" height="1200" fill="url(#p)"/>
  <rect x="0" y="980" width="900" height="220" fill="${light}"/>
  <rect x="0" y="978" width="900" height="3" fill="#0d0d12"/>
  <!-- leftover roll -->
  <g transform="translate(70,820)">
    <rect x="18" y="40" width="150" height="18" rx="4" fill="url(#p)" stroke="#0d0d12" stroke-width="2"/>
    <ellipse cx="18" cy="49" rx="16" ry="22" fill="${dark}" stroke="#0d0d12" stroke-width="2"/>
    <ellipse cx="18" cy="49" rx="8" ry="12" fill="${light}"/>
    <text x="40" y="88" fill="#0d0d12" font-family="ui-monospace, monospace" font-size="14">LEFTOVER ROLL</text>
  </g>
  <!-- can -->
  <g transform="translate(310,250)">
    <ellipse cx="140" cy="620" rx="128" ry="22" fill="#0d0d12" opacity=".18"/>
    <path d="M28 90 L252 90 L230 620 L50 620 Z" fill="url(#p)" stroke="#0d0d12" stroke-width="3"/>
    <path d="M40 110 L240 110 L222 600 L58 600 Z" fill="none" stroke="#fff" stroke-width="2" opacity=".35"/>
    <ellipse cx="140" cy="90" rx="116" ry="36" fill="${dark}" stroke="#0d0d12" stroke-width="3"/>
    <ellipse cx="140" cy="90" rx="88" ry="24" fill="#d7d3cc"/>
    <ellipse cx="140" cy="90" rx="70" ry="18" fill="#8a8f96"/>
    <text x="140" y="690" text-anchor="middle" fill="#0d0d12" font-family="Georgia, Times New Roman, serif" font-size="28" letter-spacing="0">Forever Can</text>
    <text x="140" y="722" text-anchor="middle" fill="#0d0d12" font-family="Helvetica Neue, Arial, sans-serif" font-size="16">in ${pattern.name}</text>
  </g>
  <rect x="36" y="36" width="828" height="54" fill="#fffdf8" stroke="#0d0d12" stroke-width="2"/>
  <text x="56" y="72" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" fill="#0d0d12">${pattern.index}  /  ${pattern.style}  /  Match the wall</text>
`
  );
}

function stepDiagram(kind) {
  const frames = {
    hang: `
      <rect width="640" height="420" fill="#f7d6e0"/>
      <rect x="40" y="36" width="360" height="300" fill="url(#p)" stroke="#0d0d12" stroke-width="3"/>
      <rect x="430" y="220" width="150" height="22" fill="#eee9df" stroke="#0d0d12" stroke-width="2"/>
      <ellipse cx="430" cy="231" rx="16" ry="20" fill="#c45a7a" stroke="#0d0d12" stroke-width="2"/>
      <text x="40" y="384" font-family="Georgia, Times New Roman, serif" font-size="32">Hang. Keep the scraps.</text>
    `,
    trace: `
      <rect width="640" height="420" fill="#ffd84d"/>
      <rect x="70" y="50" width="360" height="240" fill="#fffdf8" stroke="#0d0d12" stroke-width="3"/>
      <rect x="110" y="80" width="200" height="180" fill="none" stroke="#0d0d12" stroke-width="3" stroke-dasharray="8 6"/>
      <path d="M320 250 L390 310" stroke="#0d0d12" stroke-width="4"/>
      <circle cx="400" cy="322" r="10" fill="#0d0d12"/>
      <text x="70" y="384" font-family="Georgia, Times New Roman, serif" font-size="32">Trace the template.</text>
    `,
    drop: `
      <rect width="640" height="420" fill="#c7b5ff"/>
      <path d="M230 70 L410 70 L390 320 L250 320 Z" fill="none" stroke="#0d0d12" stroke-width="4"/>
      <path d="M250 90 L390 90 L374 300 L266 300 Z" fill="url(#p)" stroke="#0d0d12" stroke-width="2"/>
      <ellipse cx="320" cy="70" rx="90" ry="22" fill="#d7d3cc" stroke="#0d0d12" stroke-width="3"/>
      <text x="40" y="384" font-family="Georgia, Times New Roman, serif" font-size="32">Cut. Overlap. Drop.</text>
    `,
    match: `
      <rect width="640" height="420" fill="#d7e4d6"/>
      <rect x="40" y="30" width="560" height="280" fill="url(#p)" stroke="#0d0d12" stroke-width="3"/>
      <path d="M250 90 L390 90 L376 270 L264 270 Z" fill="url(#p)" stroke="#0d0d12" stroke-width="3"/>
      <ellipse cx="320" cy="90" rx="72" ry="16" fill="#8a8f96" stroke="#0d0d12" stroke-width="3"/>
      <text x="40" y="384" font-family="Georgia, Times New Roman, serif" font-size="32">Now it matches. Swap later.</text>
    `
  };
  return svg(
    640,
    420,
    `
  ${tileDefs('p', tiles['blush-garden'](160), 160)}
  ${frames[kind]}
`
  );
}

for (const pattern of catalog.patterns) {
  const size = tileSize[pattern.slug] || 160;
  const tile = tiles[pattern.slug](size);
  await writeFile(resolve(outDir, `pattern-${pattern.slug}.svg`), svg(size, size, tile));
  await writeFile(resolve(outDir, `look-${pattern.slug}.svg`), lookCard(pattern));
}

await writeFile(resolve(outDir, 'step-01-hang.svg'), stepDiagram('hang'));
await writeFile(resolve(outDir, 'step-02-trace.svg'), stepDiagram('trace'));
await writeFile(resolve(outDir, 'step-03-drop.svg'), stepDiagram('drop'));
await writeFile(resolve(outDir, 'step-04-match.svg'), stepDiagram('match'));

await writeFile(
  resolve(outDir, 'README.md'),
  `# Image drop-in slots

Keep the existing Etsy CDN stills (\`etsy-forever-can-1.jpg\`, \`etsy-forever-can-2.jpg\`) and the lookbook PNGs.

Until campaign photography lands, shop cards use those photos plus generated SVG tiles (\`pattern-*.svg\`) and look cards (\`look-*.svg\`).

## Drop files here (same filenames)

| File | Replaces |
| --- | --- |
| \`higgsfield-hero.jpg\` | Home hero still (can flush against matching wallpaper + leftover roll). Then point \`index.html\` hero \`<img>\` at this file. |
| \`ig-01.jpg\` … \`ig-06.jpg\` | Instagram strip frames. Then update the \`data-ig\` list in \`src/main.js\`. |
| \`pattern-{slug}.jpg\` | Pattern campaign still. Each pattern already lists this path as \`campaignSlot\` in \`src/data/products.json\`. Swap that path into \`images[0]\` when the file exists. |
| \`howto-01.jpg\` … \`howto-04.jpg\` | Real DIY photos for the how-it-works diagrams. |

### Pattern slugs

palm-aviary, blush-garden, rose-trellis, sage-chinoiserie, ink-toile, blush-damask, cobalt-lattice, peony-studio, atelier-stripe, fern-conservatory, calacatta-stone, midnight-toile

Do not delete the Etsy JPEGs. They are the real product.
`
);

console.log(`Wrote tiles, look cards, diagrams, and ${outDir}/README.md`);
