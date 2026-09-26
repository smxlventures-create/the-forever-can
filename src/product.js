import './styles.css';
import './site-shell.js';
import { patterns, getProduct, formatPrice, productUrl, shop, howItWorks } from './products.js';
import { howStepsMarkup } from './markup.js';

const slug = document.body.dataset.product;
const product = getProduct(slug);
const root = document.querySelector('#product-root');
const price = product.price || shop.price;
const etsy = product.etsyUrl || shop.etsyListing;
const buyLabel = `Open Etsy · ${formatPrice(price)}`;

document.documentElement.style.setProperty('--side-light', product.colors[0]);
document.documentElement.style.setProperty('--side-dark', product.colors[1]);
document.documentElement.style.setProperty('--product-accent', product.accent);
document.title = `${product.title} — The Forever Can`;

const structuredData = document.createElement('script');
structuredData.type = 'application/ld+json';
structuredData.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.images.map((src) => new URL(src, window.location.origin).href),
  brand: { '@type': 'Brand', name: 'The Forever Can' },
  material: shop.materials,
  color: product.name,
  offers: {
    '@type': 'Offer',
    url: etsy,
    priceCurrency: shop.currency,
    price: String(price),
    availability: 'https://schema.org/InStock'
  },
  aggregateRating: shop.rating
    ? { '@type': 'AggregateRating', ratingValue: String(shop.rating), reviewCount: String(shop.reviewCount) }
    : undefined
});
document.head.append(structuredData);

const next = patterns[(patterns.findIndex((item) => item.slug === product.slug) + 1) % patterns.length];
const gallery = product.images
  .map(
    (src, index) => `<figure>
      <img src="${src}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} alt="${product.title} view ${index + 1}" />
      <figcaption>${index === 0 ? 'Look / match the wall' : 'Paper / template / kit'}</figcaption>
    </figure>`
  )
  .join('');

if (root) {
  root.innerHTML = `
    <section class="pdp-cover">
      <div class="pdp-title">
        <p class="utility">${product.style} / Look ${product.index}</p>
        <h1>${product.name}</h1>
        <p>${product.story}</p>
        <div class="pdp-actions">
          <a class="solid-btn" href="${etsy}" target="_blank" rel="noopener">${buyLabel}</a>
          <a class="ghost-btn" href="/how-it-works/">How it works</a>
          <a class="text-btn" href="/shop/">Back to shop</a>
        </div>
      </div>
      <figure class="pdp-product-stage">
        <img class="pdp-cover-image" src="${product.images[0]}" width="1254" height="1254" fetchpriority="high" alt="${product.title} matching the wall" />
        <figcaption>${product.mood} / ${(product.rooms || []).join(' · ')}</figcaption>
      </figure>
      <div class="pdp-float">
        <span>The Forever Can / this look</span>
        <b>${formatPrice(price)} <small>One can</small></b>
        <em>Checkout opens the live Etsy listing. Pick nickel or gold insert there.</em>
        <a class="solid-btn" href="${etsy}" target="_blank" rel="noopener">${buyLabel}</a>
        <div class="pdp-float-links">
          <a class="text-btn" href="/how-it-works/">How it works</a>
          <a class="text-btn" href="/shop/">Back to shop</a>
        </div>
      </div>
    </section>
    <div class="sticky-buy" aria-label="Buy The Forever Can">
      <a class="solid-btn" href="${etsy}" target="_blank" rel="noopener">${buyLabel}</a>
    </div>
    <section class="pdp-palette" aria-label="Other wallpaper looks">
      <p class="utility">OTHER PAPERS</p>
      <div>${patterns
        .map(
          (item) => `<a class="swatch-link${item.slug === product.slug ? ' is-current' : ''}" href="${productUrl(item.slug)}">
            <span style="background-image:url('${item.patternTile}');--swatch-light:${item.colors[0]};--swatch-dark:${item.colors[1]}"></span>
            <b>${item.index}</b><em>${item.name}</em>
          </a>`
        )
        .join('')}</div>
    </section>
    <section class="pdp-intro">
      <p class="utility">LEFTOVER PAPER / ${shop.patent}</p>
      <h2>${product.story}</h2>
      <p>${product.longDescription}</p>
    </section>
    <section class="pdp-photo-suite" id="gallery">
      <header>
        <p class="utility">THE LOOK</p>
        <h2>Same can.<br /><span>This paper.</span></h2>
        <p>${product.description}</p>
      </header>
      <div class="pdp-gallery">${gallery}</div>
    </section>
    <section class="howto-band pdp-howto" id="howto">
      <header>
        <p class="utility">HOW IT WORKS</p>
        <h2>Four steps.<br />No glue.</h2>
        <a class="ghost-btn" href="/how-it-works/">Full how-to</a>
      </header>
      <div class="how-steps how-steps-compact">${howStepsMarkup(howItWorks, { diagrams: false })}</div>
    </section>
    <section class="pdp-specs" id="specs">
      <div class="spec-lead">
        <p class="utility">LOOK ${product.index}</p>
        <h2>The<br />kit.</h2>
        <p>One patented can. Nickel or gold insert chosen on Etsy. This page is the wallpaper look.</p>
      </div>
      <dl>
        <div><dt>Price</dt><dd>${formatPrice(price)}</dd></div>
        <div><dt>Look</dt><dd>${product.name}</dd></div>
        <div><dt>Mood</dt><dd>${product.mood}</dd></div>
        <div><dt>Rooms</dt><dd>${(product.rooms || []).join(', ')}</dd></div>
        <div><dt>Insert</dt><dd>Nickel or gold — pick on Etsy</dd></div>
        <div><dt>Shell</dt><dd>Clear acrylic cylinder</dd></div>
        <div><dt>Includes</dt><dd>Cutting template</dd></div>
        <div><dt>Size</dt><dd>${shop.size}</dd></div>
        <div><dt>Care</dt><dd>${shop.care}</dd></div>
        <div><dt>Shop</dt><dd>${shop.etsyShop}</dd></div>
        <div><dt>Rating</dt><dd>${shop.rating}.0 / ${shop.reviewCount} reviews</dd></div>
        <div><dt>Inventor</dt><dd>${shop.inventor}</dd></div>
        <div><dt>Patent</dt><dd>${shop.patent}</dd></div>
      </dl>
    </section>
    <section class="pdp-release">
      <p class="utility">YOUR FOREVER CAN</p>
      <h2>${formatPrice(price)}<br /><em>Keep the can.</em></h2>
      <p>Checkout opens the live WallpaperWastebasket listing. Choose nickel or gold insert there.</p>
      <div class="pdp-release-links">
        <a class="solid-btn" href="${etsy}" target="_blank" rel="noopener">${buyLabel}</a>
        <a class="ghost-btn" href="/how-it-works/">How it works</a>
        <a class="text-btn" href="/shop/">Back to shop</a>
      </div>
    </section>
    <a class="next-color" href="${productUrl(next.slug)}" style="--next-light:${next.colors[0]};--next-dark:${next.colors[1]}">
      <span>Next look / ${next.index}</span>
      <strong>${next.name}</strong>
      <b>View</b>
    </a>`;
}
