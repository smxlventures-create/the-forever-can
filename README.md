# The Forever Can

Editorial storefront for **The Forever Can** — Patti Gilley’s patented wallpaper wastebasket (`US 2024/0327113 A1`). The site sells the real product story: **use leftover wallpaper from your walls to wrap the can so the trash can matches the room.** When you redecorate, swap the paper. The can lasts forever.

Visual language keeps Toala bones (Archivo Black / Space Grotesk / DM Mono, hard rules, color blocking) and is re-skinned for wallpaper craft — not a towel shop, and not a grid of fake insert-finish SKUs.

Primary Etsy listing: [The Forever Can](https://www.etsy.com/listing/1552653332/the-forever-can-wallpaper-wastebasket) in shop **WallpaperWastebasket** — $59.95 USD, 5.0 (~18 reviews), 30-day returns. Inventor: Patti Gilley. Instagram [@the_forever_can](https://www.instagram.com/the_forever_can/).

## The product

Clear acrylic cylindrical wastebasket + interchangeable metal insert (nickel or gold) + cutting template.

1. Hang your wallpaper as usual — keep the leftover scraps.
2. Trace the included template on the leftover paper.
3. Cut, overlap the ends, drop the wrap behind the clear shell.
4. The can matches the wall. Swap anytime (seasonal paper, photos, art too).

## Catalog

`src/data/products.json` is a **wallpaper pattern shop** (`shop`, `howItWorks`, `patterns[]`). Each card is “Forever Can in [Pattern Name]” — a lookbook wrap, not a separate SKU. Price stays $59.95. Checkout deep-links the live Etsy listing. Nickel vs gold is an Etsy finish choice, not a product.

Pattern fields: `slug`, `name`, `mood`, `style`, `rooms`, `colors`, `description`, `images`, `patternTile`, `campaignSlot`.

## Imagery drop-in

Keep the Etsy CDN stills in `/public/images/` (`etsy-forever-can-1.jpg`, `etsy-forever-can-2.jpg`).

Until campaign assets arrive, the shop uses those photos plus generated SVG tiles (`pattern-*.svg`) and look cards (`look-*.svg`).

Drop replacements here — see [`public/images/README.md`](public/images/README.md):

| File | Use |
| --- | --- |
| `hero-match-wall.jpg` | Home hero (leftover roll + matching can) — **in repo** |
| `hero-before-after.jpg` | How-it-works value prop — **in repo** |
| `shop-*.jpg` | Pattern campaign stills — **in repo** |
| `etsy-product-1.jpg` / `etsy-product-2.jpg` | Live Etsy kit / template — **in repo** |
| `ig-01.jpg` … `ig-06.jpg` | Instagram strip. Update the list in `src/main.js`. |

## Run

```bash
npm install
npm run dev
```

Vite multipage:

- `/` leftover-wallpaper hero, 4-step how-it-works, pattern teaser, Instagram strip, Etsy CTA
- `/shop/` wallpaper pattern grid + style chips
- `/products/<slug>/` pattern PDP
- `/how-it-works/` template DIY
- `/about/` Patti + patent + Instagram
- `/cart/` localStorage cart → Etsy checkout or inquiry
- `/contact/` studio note

```bash
npm run build
npm run preview
npm run write:pages   # regenerate /products/<slug>/ from patterns[]
npm run make:art      # regenerate SVG tiles, look cards, diagrams
```

## Checkout

There are **no payment processor secrets**. Purchase is:

1. **Etsy** — “Buy on Etsy” opens listing 1552653332
2. **Inquiry** — name, email, shipping posted to `/api/inquire` (mailto fallback in local Vite)

`npm run fetch:etsy` updates shop metadata only. It will not replace the wallpaper lookbook with listing variants.

## Brand

- Instagram: [@the_forever_can](https://www.instagram.com/the_forever_can/)
- Mark: `/public/forever-mark.svg`
- Design notes: `DESIGN.md`
