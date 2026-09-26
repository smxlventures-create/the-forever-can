import { formatPrice, productUrl, roomsOf, shop } from './products.js';

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function howStepsMarkup(steps, { diagrams = true } = {}) {
  return steps
    .map(
      (step) => `<article class="how-step" id="step-${step.n}">
        ${
          diagrams
            ? `<figure class="how-step-diagram">
          <img src="${step.diagram}" width="640" height="420" loading="lazy" decoding="async" alt="${escapeHtml(step.title)}" />
        </figure>`
            : ''
        }
        <b>${step.n}</b>
        <div>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.body)}</p>
        </div>
      </article>`
    )
    .join('');
}

export function patternCard(pattern) {
  const name = pattern.name || pattern.title;
  return `<article class="shop-card" style="--card-light:${pattern.colors[0]};--card-dark:${pattern.colors[1]}">
    <a class="shop-card-image" href="${productUrl(pattern.slug)}">
      <img src="${pattern.images[0]}" width="1024" height="1024" loading="lazy" decoding="async" alt="${escapeHtml(name)} leftover wallpaper look" />
      <span>${pattern.index}</span>
      <i class="pattern-swatch" style="background-image:url('${pattern.patternTile}')" aria-hidden="true"></i>
    </a>
    <div class="shop-card-copy">
      <p class="utility">${pattern.style} · ${escapeHtml(roomsOf(pattern))}</p>
      <h2>${escapeHtml(name)}</h2>
      <p>${escapeHtml(pattern.story)}</p>
      <div class="shop-card-buy">
        <strong>${formatPrice(pattern.price || shop.price)}</strong>
        <small>${escapeHtml(pattern.mood)}</small>
        <a class="solid-btn" href="${productUrl(pattern.slug)}">View look</a>
      </div>
    </div>
  </article>`;
}

export function shopEmptyState(styleLabel) {
  return `<div class="shop-empty" role="status">
    <p class="utility">NO MATCHES</p>
    <h2>No ${escapeHtml((styleLabel || 'looks').toLowerCase())} looks.</h2>
    <p>These chips group leftover-wallpaper styles. Reset to see every Forever Can look, then pick another filter.</p>
    <button type="button" class="solid-btn" data-reset-filter>Show all looks</button>
  </div>`;
}

export function instagramFrame(src, alt, index) {
  return `<a class="ig-frame" href="${shop.instagram}" target="_blank" rel="noopener">
    <img src="${src}" width="800" height="800" loading="lazy" decoding="async" alt="${escapeHtml(alt)}" />
    <span>${shop.instagramHandle} / ${String(index + 1).padStart(2, '0')}</span>
  </a>`;
}
