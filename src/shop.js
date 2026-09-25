import './styles.css';
import './site-shell.js';
import { patterns, shop, styleLabels, styles } from './products.js';
import { patternCard } from './markup.js';
import { addToCart } from './cart.js';

const grid = document.querySelector('#shop-grid');
const chips = document.querySelector('#filter-chips');
const count = document.querySelector('#filter-count');
const dialog = document.querySelector('#quick-view');

let active = 'all';

function render() {
  const visible = active === 'all' ? patterns : patterns.filter((item) => item.style === active);
  if (grid) grid.innerHTML = visible.map((item) => patternCard(item)).join('');
  if (count) {
    count.textContent =
      active === 'all'
        ? `${visible.length} wallpaper looks`
        : `${visible.length} ${active} look${visible.length === 1 ? '' : 's'}`;
  }
  chips?.querySelectorAll('[data-style]').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.style === active));
  });
}

if (chips) {
  const labels = [
    { id: 'all', label: 'All looks' },
    ...styles.map((style) => ({ id: style, label: styleLabels[style] || style }))
  ];
  chips.innerHTML = labels
    .map(
      ({ id, label }) =>
        `<button type="button" class="chip" data-style="${id}" aria-pressed="${id === 'all'}">${label}</button>`
    )
    .join('');
}

render();

chips?.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-style]');
  if (!chip) return;
  active = chip.dataset.style;
  render();
  grid?.scrollIntoView({ block: 'start', behavior: 'smooth' });
});

document.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add);
    add.textContent = 'ADDED';
  }
  const quick = event.target.closest('[data-quick]');
  if (quick) {
    event.preventDefault();
    const pattern = patterns.find((item) => item.slug === quick.dataset.quick);
    if (!pattern || !dialog) return;
    dialog.innerHTML = `
      <div class="quick-panel">
        <button class="quick-close" type="button" data-close>Close</button>
        <figure><img src="${pattern.images[0]}" alt="${pattern.title}" /></figure>
        <div>
          <p class="utility">${pattern.style.toUpperCase()} / ${pattern.mood.toUpperCase()}</p>
          <h2>${pattern.title.toUpperCase()}</h2>
          <p>${pattern.description}</p>
          <b>$${shop.price}</b>
          <div class="quick-actions">
            <button type="button" class="solid-btn" data-add="${pattern.id}">ADD LOOK</button>
            <a class="ghost-btn" href="${shop.etsyListing}" target="_blank" rel="noopener">BUY ON ETSY ↗</a>
          </div>
        </div>
      </div>`;
    dialog.showModal();
  }
  if (event.target.closest('[data-close]') || event.target === dialog) dialog?.close();
});
