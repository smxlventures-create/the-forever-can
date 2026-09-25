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
    { src: '/images/ig/lifestyle-grey-botanical.jpg', alt: 'Grey botanical wall and matching Forever Can' },
    { src: '/images/ig/lifestyle-banana-leaf.jpg', alt: 'Navy banana-leaf can beside a navy vanity' },
    { src: '/images/ig/lifestyle-koi-harmony.jpg', alt: 'Harmony koi pond wallpaper and matching can' },
    { src: '/images/ig/lifestyle-hydrangea.jpg', alt: 'Pale blue hydrangea powder room' },
    { src: '/images/ig/retail-shelf-patterns-a.jpg', alt: 'Retail shelf of wallpaper-wrapped Forever Cans' },
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
