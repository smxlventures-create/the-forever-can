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
    { src: '/images/etsy-forever-can-1.jpg', alt: 'Forever Can matched to tropical wallpaper' },
    { src: '/images/craft-kit.png', alt: 'Paper dropping behind the clear acrylic shell' },
    { src: '/images/etsy-forever-can-2.jpg', alt: 'Cutting template on The Forever Can insert' },
    { src: '/images/hero-blush-floral.png', alt: 'Blush garden look on a Forever Can' },
    { src: '/images/editorial-collection.png', alt: 'Four wallpaper looks on Forever Cans' },
    { src: '/images/product-chinoiserie.png', alt: 'Sage chinoiserie look' }
  ];
  igStrip.innerHTML = frames.map((frame, index) => instagramFrame(frame.src, frame.alt, index)).join('');
}

document.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add]');
  if (!add) return;
  addToCart(add.dataset.add);
  add.textContent = 'ADDED';
});
