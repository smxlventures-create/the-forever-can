import './styles.css';
import './site-shell.js';
import { products, formatPrice, productUrl } from './products.js';

const featured = document.querySelector('#featured-grid');
if (featured) {
  featured.innerHTML = products
    .slice(0, 4)
    .map(
      (product) => `<a class="color-card" href="${productUrl(product.slug)}" style="--card-light:${product.colors[0]};--card-dark:${product.colors[1]}">
        <div class="color-photo">
          <img src="${product.images[0]}" width="1254" height="1254" loading="lazy" decoding="async" alt="${product.title} wallpaper wastebasket" />
          <span class="round-index">${product.index}</span>
        </div>
        <div class="color-name">
          <span>${product.title.toUpperCase()}</span>
          <b>${formatPrice(product.price)} / ${product.pattern.toUpperCase()} ↗</b>
        </div>
      </a>`
    )
    .join('');
}
