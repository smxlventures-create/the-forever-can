import { mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import catalog from '../src/data/products.json' with { type: 'json' };

const productsDir = resolve(import.meta.dirname, '../products');
const retired = ['the-forever-can', 'brushed-nickel', 'gold-finish', 'custom-diy', 'art-photos', 'seasonal-holiday'];

for (const slug of retired) {
  await rm(resolve(productsDir, slug), { recursive: true, force: true });
}

for (const product of catalog.patterns) {
  const title = product.title || `Forever Can in ${product.name}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="theme-color" content="${product.accent}" />
    <title>${title} — The Forever Can</title>
    <meta name="description" content="${product.description}" />
    <link rel="canonical" href="https://the-forever-can.vercel.app/products/${product.slug}/" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="The Forever Can" />
    <meta property="og:title" content="${title} — The Forever Can" />
    <meta property="og:description" content="${product.story}" />
    <meta property="og:url" content="https://the-forever-can.vercel.app/products/${product.slug}/" />
    <meta property="og:image" content="https://the-forever-can.vercel.app${product.images[0]}" />
    <meta property="product:price:amount" content="${catalog.shop.price}" />
    <meta property="product:price:currency" content="${catalog.shop.currency}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preload" as="image" href="${product.images[0]}" fetchpriority="high" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&amp;family=DM+Mono:wght@400;500&amp;family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <script type="module" src="/src/product.js"></script>
  </head>
  <body class="product-page" data-product="${product.slug}">
    <a class="skip" href="#product-root">Skip to product</a>
    <div class="ticker"><div><span>${title.toUpperCase()}</span><i>✦</i><span>$${catalog.shop.price}</span><i>✦</i><span>${product.style.toUpperCase()}</span><i>✦</i><span>THE FOREVER CAN</span></div></div>
    <header class="site-header">
      <a class="brand" href="/" aria-label="The Forever Can home"><img src="/forever-mark.svg" alt="" /><b>THE<br />FOREVER<br />CAN</b></a>
      <nav aria-label="Main navigation"><a href="/shop/">Shop</a><a href="/how-it-works/">How-to</a><a href="/about/">About</a><a href="/cart/">Cart</a></nav>
      <a class="header-tag" data-cart-count href="/cart/">Cart ↗</a>
    </header>
    <main id="product-root"></main>
    <footer class="site-footer">
      <img class="footer-mark" src="/forever-mark.svg" alt="The Forever Can mark" />
      <p class="footer-word">FOREVER CAN</p>
      <div>
        <p>${title.toUpperCase()} / ${product.style.toUpperCase()}</p>
        <nav aria-label="Footer navigation"></nav>
        <p>© 2026 THE FOREVER CAN</p>
      </div>
    </footer>
  </body>
</html>
`;
  const dir = resolve(productsDir, product.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'index.html'), html);
  console.log(resolve(dir, 'index.html'));
}
