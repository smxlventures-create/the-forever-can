import './styles.css';
import './site-shell.js';
import { products, formatPrice, productUrl } from './products.js';
import { addToCart } from './cart.js';

const grid = document.querySelector('#shop-grid');
const dialog = document.querySelector('#quick-view');

function card(product) {
  return `<article class="shop-card" style="--card-light:${product.colors[0]};--card-dark:${product.colors[1]}">
    <a class="shop-card-image" href="${productUrl(product.slug)}" aria-label="View ${product.title}">
      <img src="${product.images[0]}" width="1254" height="1254" loading="lazy" decoding="async" alt="${product.title} wallpaper wastebasket" />
      <span>${product.index}</span>
    </a>
    <div class="shop-card-copy">
      <p class="utility">PATTERN ${product.index} / ${product.pattern.toUpperCase()}</p>
      <h2>${product.title.toUpperCase()}</h2>
      <p>${product.story}</p>
      <div class="shop-card-buy">
        <strong>${formatPrice(product.price)}</strong>
        <small>${product.size.toUpperCase()}</small>
        <button type="button" class="text-btn" data-quick="${product.slug}">QUICK VIEW</button>
        <a href="${productUrl(product.slug)}">VIEW CAN ↗</a>
      </div>
    </div>
  </article>`;
}

if (grid) grid.innerHTML = products.map(card).join('');

function openQuick(slug) {
  const product = products.find((item) => item.slug === slug);
  if (!product || !dialog) return;
  dialog.innerHTML = `
    <div class="quick-panel">
      <button class="quick-close" type="button" data-close>Close</button>
      <figure><img src="${product.images[0]}" alt="${product.title}" /></figure>
      <div>
        <p class="utility">PATTERN ${product.index}</p>
        <h2>${product.title.toUpperCase()}</h2>
        <p>${product.description}</p>
        <b>${formatPrice(product.price)}</b>
        <div class="quick-actions">
          <button type="button" class="solid-btn" data-add="${product.id}">ADD TO CART</button>
          <a class="ghost-btn" href="${productUrl(product.slug)}">FULL DETAILS ↗</a>
        </div>
      </div>
    </div>`;
  dialog.showModal();
}

document.addEventListener('click', (event) => {
  const quick = event.target.closest('[data-quick]');
  if (quick) {
    event.preventDefault();
    openQuick(quick.dataset.quick);
  }
  if (event.target.closest('[data-close]') || event.target === dialog) dialog?.close();
  const add = event.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add);
    add.textContent = 'ADDED';
  }
});
