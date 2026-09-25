import './styles.css';
import './site-shell.js';
import { products, getProduct, formatPrice, productUrl, shop } from './products.js';
import { addToCart } from './cart.js';

const slug = document.body.dataset.product;
const product = getProduct(slug);
const root = document.querySelector('#product-root');

document.documentElement.style.setProperty('--side-light', product.colors[0]);
document.documentElement.style.setProperty('--side-dark', product.colors[1]);
document.documentElement.style.setProperty('--product-accent', product.accent);
document.title = `${product.title} — The Forever Can`;

const structuredData = document.createElement('script');
structuredData.type = 'application/ld+json';
structuredData.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${product.title} — The Forever Can`,
  description: product.description,
  image: product.images.map((src) => new URL(src, window.location.origin).href),
  brand: { '@type': 'Brand', name: 'The Forever Can' },
  material: product.materials,
  color: product.pattern,
  offers: {
    '@type': 'Offer',
    url: product.etsyUrl || new URL(productUrl(product.slug), window.location.origin).href,
    priceCurrency: product.currency,
    price: String(product.price),
    availability: 'https://schema.org/InStock'
  },
  aggregateRating: shop.rating
    ? { '@type': 'AggregateRating', ratingValue: String(shop.rating), reviewCount: String(shop.reviewCount) }
    : undefined
});
document.head.append(structuredData);

const next = products[(products.findIndex((item) => item.slug === product.slug) + 1) % products.length];
const gallery = product.images
  .map(
    (src, index) => `<figure>
      <img src="${src}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} alt="${product.title} view ${index + 1}" />
      <figcaption>${index === 0 ? 'PATTERN / CAMPAIGN STILL' : 'ROOM / COLLECTION'}</figcaption>
    </figure>`
  )
  .join('');

if (root) {
  root.innerHTML = `
    <section class="pdp-cover">
      <div class="pdp-title">
        <p class="utility">PATTERN ${product.index} / ${product.pattern.toUpperCase()}</p>
        <h1>${product.title.toUpperCase()}</h1>
        <p>${product.story}</p>
        <a class="pdp-title-link" href="#gallery">SEE THE PAPER ↘</a>
      </div>
      <figure class="pdp-product-stage">
        <img class="pdp-cover-image" src="${product.images[0]}" width="1254" height="1254" fetchpriority="high" alt="${product.title} wallpaper wastebasket" />
        <figcaption>WALLPAPER INSERT / PATENTED SHELL</figcaption>
      </figure>
      <div class="pdp-float">
        <span>THE FOREVER CAN</span>
        <b>${formatPrice(product.price)} <small>ONE CAN</small></b>
        <em>${product.materials.toUpperCase()}</em>
        <button type="button" class="solid-btn" data-add="${product.id}">ADD TO CART</button>
        <a href="${product.etsyUrl}" target="_blank" rel="noopener">BUY ON ETSY ↗</a>
      </div>
    </section>
    <section class="pdp-palette" aria-label="Other patterns">
      <p class="utility">PICK ANOTHER PAPER</p>
      <div>${products
        .map(
          (item) => `<a class="swatch-link${item.slug === product.slug ? ' is-current' : ''}" href="${productUrl(item.slug)}">
            <span style="--swatch-light:${item.colors[0]};--swatch-dark:${item.colors[1]}"></span>
            <b>${item.index}</b><em>${item.title}</em>
          </a>`
        )
        .join('')}</div>
    </section>
    <section class="pdp-intro">
      <p class="utility">PATENTED / ${shop.patent}</p>
      <h2>${product.story.toUpperCase()}</h2>
      <p>${product.longDescription}</p>
    </section>
    <section class="pdp-photo-suite" id="gallery">
      <header>
        <p class="utility">THE LOOK</p>
        <h2>PAPER YOU<br /><span>CAN CHANGE.</span></h2>
        <p>${product.description}</p>
      </header>
      <div class="pdp-gallery">${gallery}</div>
    </section>
    <section class="pdp-specs" id="specs">
      <div class="spec-lead">
        <p class="utility">CAN ${product.index}</p>
        <h2>THE<br />DETAILS.</h2>
        <p>A wallpaper wastebasket, not a glued souvenir.</p>
      </div>
      <dl>
        <div><dt>Price</dt><dd>${formatPrice(product.price)}</dd></div>
        <div><dt>Finish</dt><dd>${product.finish || product.pattern}</dd></div>
        <div><dt>Look</dt><dd>${product.pattern}</dd></div>
        <div><dt>Size</dt><dd>${product.size}</dd></div>
        <div><dt>Materials</dt><dd>${product.materials}</dd></div>
        <div><dt>Care</dt><dd>${product.care}</dd></div>
        <div><dt>Shop</dt><dd>${shop.etsyShop || 'WallpaperWastebasket'}</dd></div>
        <div><dt>Rating</dt><dd>${shop.rating}.0 / ${shop.reviewCount} reviews</dd></div>
        <div><dt>Returns</dt><dd>${shop.returns}</dd></div>
        <div><dt>Inventor</dt><dd>Patti Gilley</dd></div>
        <div><dt>Patent</dt><dd>${shop.patent}</dd></div>
      </dl>
    </section>
    <section class="pdp-release">
      <p class="utility">YOUR FOREVER CAN</p>
      <h2>${formatPrice(product.price)}<br /><em>KEEP THE CAN.</em></h2>
      <p>Add it to a local cart, then check out through the matching Etsy listing — or send an inquiry with your shipping details.</p>
      <div class="pdp-release-links">
        <button type="button" class="solid-btn" data-add="${product.id}">ADD TO CART</button>
        <a href="${product.etsyUrl}" target="_blank" rel="noopener">OPEN ETSY ↗</a>
      </div>
    </section>
    <a class="next-color" href="${productUrl(next.slug)}" style="--next-light:${next.colors[0]};--next-dark:${next.colors[1]}">
      <span>NEXT PAPER / ${next.index}</span>
      <strong>${next.title.toUpperCase()}</strong>
      <b>↗</b>
    </a>`;
}

document.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add]');
  if (!add) return;
  addToCart(add.dataset.add);
  add.textContent = 'ADDED TO CART';
});
