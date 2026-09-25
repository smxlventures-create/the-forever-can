# The Forever Can visual system

Adapted from the editorial ecommerce language of `smxlventures-create/toala-towels-site`, then rewritten for **wallpaper craft**: leftover rolls, matching walls, a clear acrylic can. Do not copy the TOALA wordmark or towel claims. Do not sell insert finishes as separate products.

## Direction

Bold editorial ecommerce: oversized type, hard black rules, deliberate color blocking. Lead with **match-the-wall photography** and the DIY template — not a towel-style grid of fake SKUs.

The first screen must say the product: leftover wallpaper from the wall wraps the can so the trash can matches the room.

## Typography

- Display: Archivo Black
- Body: Space Grotesk
- Utility labels: DM Mono

Headlines stay huge, slightly skewed in the hero, and break aggressively. Labels stay mono and uppercase.

## Palette

Toala starting point, then a house pink from the Instagram mark:

- Ink `#0d0d12`
- Paper `#eee9df`
- Sun `#ffd84d`
- Cobalt `#2b5bac`
- Lilac `#c7b5ff`
- Tomato `#df5f3d`
- Pink `#f4b6c8`
- Blush `#f7d6e0`
- Rose `#c45a7a`

Pattern pages tint the shell with each look’s light/dark pair. Wallpaper tiles sit behind the type as craft texture.

## Brand mark

`/public/forever-mark.svg` is the house badge: a candy-pink circle, a white tapered wastebasket, and WALLPAPER / WASTEBASKET on the ring.

## Product photography

Campaign stills live under `/public/images/`. The real Etsy photos are the source of truth (can flush against matching tropical wallpaper; gold template insert). Lookbook PNGs and SVG pattern tiles stand in until Higgsfield / Instagram stills drop. See `public/images/README.md`.

## Responsive behavior

Primary viewport is **390px**. Desktop uses split-screen editorial compositions and two-column shop grids. At 900 px and below, pages stack, navigation becomes a labeled menu, shop filters stay chips, and a sticky Etsy/Add bar stays thumb-reachable. At 520 px fact strips and how-to steps become a single column. No horizontal overflow.
