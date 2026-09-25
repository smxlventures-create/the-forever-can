# The Forever Can

Editorial storefront for **The Forever Can** — Patti Gilley’s patented wallpaper wastebasket (`US 2024/0327113 A1`). Visual language is adapted from the Toala towels site (Archivo Black / Space Grotesk / DM Mono, hard rules, color blocking) and re-skinned for wallpaper, home décor, and the pink Instagram mark. It is not a towel shop.

Primary Etsy listing: [etsy.com/listing/1552653332](https://www.etsy.com/listing/1552653332/)

Etsy bot protection blocked a live scrape, so `src/data/products.json` ships a seeded catalog of six real wallpaper-wastebasket concepts (custom, floral, chinoiserie, geometric, damask, toile). The known listing URL is attached. Refresh from the Open API when you have a key.

## Run

```bash
npm install
npm run dev
```

Vite serves a static multipage site:

- `/` home
- `/shop/` collection + quick view
- `/products/<slug>/` detail
- `/cart/` localStorage cart
- `/about/` Patti / patent
- `/contact/` inquiry form

## Build / deploy

```bash
npm run build
npm run preview
```

The `dist/` folder is a static Vite build and deploys cleanly on Vercel. `api/inquire.js` is a Vercel serverless route used by the cart inquiry and contact form. It validates name/email, logs the payload, and returns JSON. There are **no payment processor secrets**. Purchase is:

1. **Etsy** — cart “Buy on Etsy” opens the matching listing URL(s)
2. **Inquiry** — name, email, shipping posted to `/api/inquire` (mailto fallback in local Vite)

## Refresh products from Etsy

```bash
# without a key: keeps the seeded JSON
npm run fetch:etsy

# with an Open API key
ETSY_API_KEY=xxxxx npm run fetch:etsy
```

`scripts/fetch-etsy.mjs` pulls listing `1552653332`, then that shop’s active listings, and rewrites `src/data/products.json`. Create an app key at [etsy.com/developers](https://www.etsy.com/developers/).

## Catalog fields

Each product in `src/data/products.json`:

`id`, `slug`, `title`, `price`, `currency`, `description`, `images[]`, `etsyUrl`, `tags`

plus editorial fields used by the pages (`pattern`, `story`, `materials`, `size`, `colors`).

## Brand

- Instagram: [@the_forever_can](https://www.instagram.com/the_forever_can/)
- Mark: `/public/forever-mark.svg`
- Design notes: `DESIGN.md`
