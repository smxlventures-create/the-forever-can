import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const tiles = [
  {
    file: 'pattern-grey-botanical.svg',
    fill: '#f3f0ea',
    ink: '#7d7d7d',
    paths: `<g fill="none" stroke="#7d7d7d" stroke-width="1.4">
      <path d="M18 150 C40 90 70 50 110 28"/>
      <path d="M70 80 C86 54 118 40 150 48"/>
      <path d="M40 120 c14-22 28-18 30 4"/>
      <path d="M96 70 c10-18 24-14 26 6"/>
      <path d="M28 158 h16 v-22"/>
    </g>
    <g fill="#7d7d7d">
      <ellipse cx="108" cy="36" rx="10" ry="4"/>
      <ellipse cx="72" cy="74" rx="8" ry="3"/>
      <circle cx="148" cy="52" r="2"/>
    </g>`
  },
  {
    file: 'pattern-koi-harmony.svg',
    fill: '#f7f3e8',
    ink: '#1a1a1a',
    paths: `<g fill="none" stroke="#1a1a1a" stroke-width="1.6">
      <path d="M30 120 c20-30 50-20 46 8 c-8 18-28 16-36 2"/>
      <path d="M110 70 c16-22 40-10 36 12"/>
      <path d="M70 40 l12 18 -12 4 z"/>
    </g>
    <circle cx="48" cy="108" r="3" fill="#c45a3a"/>
    <circle cx="128" cy="78" r="2.4" fill="#2b5bac"/>
    <path d="M140 140 h8 v-10 h6 v-6 h-6 v-8 h-8 z" fill="#1a1a1a"/>
    <ellipse cx="86" cy="150" rx="16" ry="5" fill="#7cb07a" opacity=".7"/>`
  },
  {
    file: 'pattern-dark-floral.svg',
    fill: '#1a1a1a',
    ink: '#f4f1ea',
    paths: `<g fill="#f4f1ea">
      <circle cx="28" cy="30" r="2.2"/>
      <circle cx="52" cy="22" r="1.6"/>
      <circle cx="70" cy="48" r="2"/>
      <circle cx="110" cy="28" r="1.8"/>
      <circle cx="140" cy="50" r="2.2"/>
      <circle cx="40" cy="90" r="1.7"/>
      <circle cx="88" cy="80" r="2.1"/>
      <circle cx="130" cy="100" r="1.6"/>
      <circle cx="24" cy="140" r="2"/>
      <circle cx="68" cy="130" r="1.5"/>
      <circle cx="108" cy="148" r="2.2"/>
      <circle cx="156" cy="132" r="1.7"/>
    </g>
    <g fill="none" stroke="#f4f1ea" stroke-width="1">
      <path d="M28 32 C40 50 48 70 44 96"/>
      <path d="M88 82 C100 100 120 110 140 104"/>
    </g>`
  },
  {
    file: 'pattern-banana-leaf.svg',
    fill: '#eef2f8',
    ink: '#1b3a6b',
    paths: `<g fill="#1b3a6b">
      <path d="M20 160 C36 90 70 40 120 18 C90 70 70 110 78 160 Z"/>
      <path d="M70 170 C90 100 130 50 176 40 C140 90 120 130 128 170 Z"/>
    </g>
    <g fill="none" stroke="#eef2f8" stroke-width="1.2">
      <path d="M48 40 l-10 30 14 8 -8 28"/>
      <path d="M110 55 l-12 32 16 8 -10 30"/>
    </g>`
  },
  {
    file: 'pattern-fan-palm.svg',
    fill: '#f6f4ef',
    ink: '#9aa7b5',
    paths: `<g fill="none" stroke="#9aa7b5" stroke-width="1.3">
      <path d="M90 170 L40 40"/>
      <path d="M90 170 L70 28"/>
      <path d="M90 170 L90 22"/>
      <path d="M90 170 L112 28"/>
      <path d="M90 170 L140 42"/>
      <path d="M90 170 L158 70"/>
      <path d="M90 170 L28 78"/>
    </g>`
  },
  {
    file: 'pattern-hydrangea.svg',
    fill: '#dce8f2',
    ink: '#8a9a7a',
    paths: `<g fill="#f7fbff" stroke="#c5d4e0" stroke-width=".8">
      <circle cx="70" cy="50" r="10"/>
      <circle cx="86" cy="42" r="10"/>
      <circle cx="98" cy="56" r="10"/>
      <circle cx="84" cy="64" r="10"/>
      <circle cx="68" cy="62" r="9"/>
      <circle cx="130" cy="110" r="9"/>
      <circle cx="144" cy="102" r="9"/>
      <circle cx="152" cy="116" r="9"/>
      <circle cx="138" cy="122" r="9"/>
    </g>
    <g fill="none" stroke="#8a9a7a" stroke-width="1.4">
      <path d="M84 70 C80 110 70 140 64 168"/>
      <path d="M138 124 C132 146 128 160 126 172"/>
      <path d="M70 120 c12-8 20-4 18 8"/>
    </g>`
  },
  {
    file: 'pattern-blue-palm.svg',
    fill: '#f4f6f8',
    ink: '#4a6d8a',
    paths: `<g fill="#4a6d8a" opacity=".85">
      <path d="M20 30 C50 20 80 40 70 80 C40 70 18 50 20 30Z"/>
      <path d="M90 10 C130 8 160 40 140 90 C110 70 88 40 90 10Z"/>
      <path d="M30 100 C70 90 90 130 70 170 C40 150 22 120 30 100Z"/>
      <path d="M110 110 C150 100 176 140 150 176 C124 156 108 130 110 110Z"/>
    </g>`
  },
  {
    file: 'pattern-feathers.svg',
    fill: '#f4efe4',
    ink: '#c4a05a',
    paths: `<g fill="none" stroke-width="1.5">
      <path d="M40 160 C44 90 70 40 90 20" stroke="#c4a05a"/>
      <path d="M40 110 l18-10 M48 90 l16-8 M56 70 l14-8" stroke="#e07a5a"/>
      <path d="M110 170 C120 100 150 50 168 28" stroke="#1a1a1a"/>
      <path d="M118 120 l16-8 M128 96 l16-8" stroke="#c4a05a"/>
    </g>
    <ellipse cx="90" cy="24" rx="5" ry="3" fill="#e07a5a"/>`
  },
  {
    file: 'pattern-paisley.svg',
    fill: '#f0e4c8',
    ink: '#c45a7a',
    paths: `<g fill="#c45a7a">
      <path d="M50 40 c18-28 50-20 46 10 c-2 22-22 34-40 28 c8-10 16-8 18 2 c-16 8-28-8-24-40z"/>
      <path d="M120 90 c18-28 50-18 44 12 c-4 22-24 32-42 26 c8-10 16-6 16 4 c-16 8-26-10-18-42z"/>
      <path d="M36 120 c14-22 40-14 36 10 c-2 16-18 24-32 20 c6-8 12-6 14 2 c-12 6-22-6-18-32z"/>
    </g>`
  }
];

const dir = resolve(import.meta.dirname, '../public/images');
for (const tile of tiles) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" role="img">
  <rect width="180" height="180" fill="${tile.fill}"/>
  ${tile.paths}
</svg>
`;
  const dest = resolve(dir, tile.file);
  await writeFile(dest, svg);
  console.log(dest);
}
