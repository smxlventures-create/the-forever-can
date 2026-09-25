import './styles.css';
import './site-shell.js';
import { featuredPatterns, formatPrice, howItWorks, productUrl, shop } from './products.js';
import { howStepsMarkup, instagramFrame } from './markup.js';
import { addToCart } from './cart.js';

const featured = document.querySelector('#featured-grid');
if (featured) {
  featured.innerHTML = featuredPatterns(4)
    .map(
      (pattern) => `<a class="color-card" href="${productUrl(pattern.slug)}" style="--card-light:${pattern.colors[0]};--card-dark:${pattern.colors[1]}">
        <div class="color-photo">
          <img src="${pattern.images[0]}" width="1254" height="1254" loading="lazy" decoding="async" alt="${pattern.title} wallpaper wastebasket" />
          <span class="round-index">${pattern.index}</span>
        </div>
        <div class="color-name">
          <span>${pattern.name.toUpperCase()}</span>
          <b>${formatPrice(pattern.price || shop.price)} / ${pattern.style.toUpperCase()} ↗</b>
        </div>
      </a>`
    )
    .join('');
}

const howBand = document.querySelector('#how-band');
if (howBand) howBand.innerHTML = howStepsMarkup(howItWorks);

const igStrip = document.querySelector('#ig-strip');
if (igStrip) {
  const frames = [
    { src: '/images/hero-match-wall.jpg', alt: 'Leftover roll beside a matching Forever Can' },
    { src: '/images/shop-chinoiserie.jpg', alt: 'Chinoiserie Blue Bird look' },
    { src: '/images/shop-botanical.jpg', alt: 'Botanical Fern look' },
    { src: '/images/shop-tropical.jpg', alt: 'Tropical Palm look' },
    { src: '/images/etsy-product-1.jpg', alt: 'Live Etsy Forever Can matching tropical wallpaper' },
    { src: '/images/etsy-product-2.jpg', alt: 'Forever Can cutting template insert' }
  ];
  igStrip.innerHTML = frames.map((frame, index) => instagramFrame(frame.src, frame.alt, index)).join('');
}

document.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add]');
  if (!add) return;
  addToCart(add.dataset.add);
  add.textContent = 'ADDED';
});
