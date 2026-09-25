# Image drop-in slots

Keep the existing Etsy CDN stills (`etsy-forever-can-1.jpg`, `etsy-forever-can-2.jpg`) and the lookbook PNGs.

Until campaign photography lands, shop cards use those photos plus generated SVG tiles (`pattern-*.svg`) and look cards (`look-*.svg`).

## Drop files here (same filenames)

| File | Replaces |
| --- | --- |
| `higgsfield-hero.jpg` | Home hero still (can flush against matching wallpaper + leftover roll). Then point `index.html` hero `<img>` at this file. |
| `ig-01.jpg` … `ig-06.jpg` | Instagram strip frames. Then update the `data-ig` list in `src/main.js`. |
| `pattern-{slug}.jpg` | Pattern campaign still. Each pattern already lists this path as `campaignSlot` in `src/data/products.json`. Swap that path into `images[0]` when the file exists. |
| `howto-01.jpg` … `howto-04.jpg` | Real DIY photos for the how-it-works diagrams. |

### Pattern slugs

palm-aviary, blush-garden, rose-trellis, sage-chinoiserie, ink-toile, blush-damask, cobalt-lattice, peony-studio, atelier-stripe, fern-conservatory, calacatta-stone, midnight-toile

Do not delete the Etsy JPEGs. They are the real product.
