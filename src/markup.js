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
          <h3>${escapeHtml(step.title.toUpperCase())}</h3>
          <p>${escapeHtml(step.body)}</p>
        </div>
      </article>`
    )
    .join('');
}

export function patternCard(pattern, { compact = false } = {}) {
  return `<article class="shop-card" style="--card-light:${pattern.colors[0]};--card-dark:${pattern.colors[1]}">
    <a class="shop-card-image" href="${productUrl(pattern.slug)}" aria-label="View ${escapeHtml(pattern.title)}">
      <img src="${pattern.images[0]}" width="1024" height="1024" loading="lazy" decoding="async" alt="${escapeHtml(pattern.title)} matching the wall" />
      <span>${pattern.index}</span>
      <i class="pattern-swatch" style="background-image:url('${pattern.patternTile}')" aria-hidden="true"></i>
    </a>
    <div class="shop-card-copy">
      <p class="utility">${pattern.style.toUpperCase()} / ${escapeHtml(roomsOf(pattern).toUpperCase())}</p>
      <h2>${escapeHtml((pattern.title || `Forever Can — ${pattern.name}`).toUpperCase())}</h2>
      <p>${escapeHtml(compact ? pattern.story : pattern.description)}</p>
      <p class="lookbook-note">${escapeHtml(shop.lookbookNote)}</p>
      <div class="shop-card-buy">
        <strong>${formatPrice(pattern.price || shop.price)}</strong>
        <small>${escapeHtml(pattern.mood.toUpperCase())}</small>
        <button type="button" class="solid-btn" data-add="${pattern.id}">ADD LOOK</button>
        <a class="ghost-btn" href="${pattern.etsyUrl || shop.etsyListing}" target="_blank" rel="noopener">BUY ON ETSY</a>
        <a class="text-btn" href="${productUrl(pattern.slug)}">FULL LOOK ↗</a>
      </div>
    </div>
  </article>`;
}

export function instagramFrame(src, alt, index) {
  return `<a class="ig-frame" href="${shop.instagram}" target="_blank" rel="noopener">
    <img src="${src}" width="800" height="800" loading="lazy" decoding="async" alt="${escapeHtml(alt)}" />
    <span>${shop.instagramHandle} / ${String(index + 1).padStart(2, '0')}</span>
  </a>`;
}
