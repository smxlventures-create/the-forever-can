import './styles.css';
import './site-shell.js';
import { patterns, styleLabels, styles } from './products.js';
import { patternCard, shopEmptyState } from './markup.js';

const grid = document.querySelector('#shop-grid');
const chips = document.querySelector('#filter-chips');
const count = document.querySelector('#filter-count');

let active = 'all';

const chipLabels = {
  botanical: 'Botanical',
  tropical: 'Tropical',
  chinoiserie: 'Chinoiserie',
  floral: 'Floral',
  damask: 'Damask',
  geometric: 'Trellis',
  sunburst: 'Sunburst',
  novelty: 'Novelty',
  maritime: 'Maritime',
  neutral: 'Neutral'
};

function render() {
  const visible = active === 'all' ? patterns : patterns.filter((item) => item.style === active);
  const styleName = styleLabels[active] || chipLabels[active] || active;
  if (grid) {
    grid.innerHTML = visible.length
      ? visible.map((item) => patternCard(item)).join('')
      : shopEmptyState(styleName);
  }
  if (count) {
    count.textContent =
      active === 'all'
        ? `${visible.length} wallpaper looks`
        : `${visible.length} ${styleName.toLowerCase()} look${visible.length === 1 ? '' : 's'}`;
  }
  chips?.querySelectorAll('[data-style]').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.style === active));
  });
}

if (chips) {
  const labels = [
    { id: 'all', label: 'All looks', title: 'All leftover-wallpaper looks' },
    ...styles.map((style) => ({
      id: style,
      label: chipLabels[style] || styleLabels[style] || style,
      title: styleLabels[style] || style
    }))
  ];
  chips.innerHTML = labels
    .map(
      ({ id, label, title }) =>
        `<button type="button" class="chip" data-style="${id}" aria-pressed="${id === 'all'}" title="${title}">${label}</button>`
    )
    .join('');
}

render();

function setFilter(style) {
  active = style;
  render();
  grid?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

chips?.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-style]');
  if (!chip) return;
  setFilter(chip.dataset.style);
});

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-reset-filter]')) setFilter('all');
});
