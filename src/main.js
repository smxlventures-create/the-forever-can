import './styles.css';
import './site-shell.js';
import { featuredPatterns, howItWorks, productUrl } from './products.js';
import { howStepsMarkup, instagramFrame } from './markup.js';

const featured = document.querySelector('#featured-grid');
if (featured) {
  featured.innerHTML = featuredPatterns(4)
    .map(
      (pattern) => `<a class="color-card" href="${productUrl(pattern.slug)}" style="--card-light:${pattern.colors[0]};--card-dark:${pattern.colors[1]}">
        <div class="color-photo">
          <img src="${pattern.images[0]}" width="1254" height="1254" loading="lazy" decoding="async" alt="${pattern.name} leftover wallpaper look" />
          <span class="round-index">${pattern.index}</span>
        </div>
        <div class="color-name">
          <span>${pattern.name}</span>
          <b>View look</b>
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
    { src: '/images/ig/lifestyle-blue-damask.jpg', alt: 'Blue damask wallpaper and matching Forever Can' },
    { src: '/images/ig/lifestyle-tropical-silhouette.jpg', alt: 'Monochrome tropical silhouette wrap' },
    { src: '/images/ig/lifestyle-maritime-scatter.jpg', alt: 'Maritime fish-scatter wallpaper' },
    { src: '/images/etsy-product-2.jpg', alt: 'Forever Can cutting template insert' }
  ];
  igStrip.innerHTML = frames.map((frame, index) => instagramFrame(frame.src, frame.alt, index)).join('');
}
