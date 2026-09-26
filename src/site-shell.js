import { cartCount, subscribeCart } from './cart.js';
import { shop } from './products.js';

const etsy = shop.etsyListing;
const buyLabel = 'Open Etsy · $59.95';

const links = [
  { href: '/shop/', label: 'Shop' },
  { href: '/how-it-works/', label: 'How it works' }
];

const menuLinks = [
  { href: '/shop/', label: 'Shop', hint: 'Wallpaper looks' },
  { href: '/how-it-works/', label: 'How it works', hint: 'Four leftover-paper steps' },
  { href: etsy, label: 'Buy on Etsy', hint: 'Opens Etsy · $59.95', external: true },
  { href: '/about/', label: 'About', hint: 'Patti + the patent' }
];

const currentPath = window.location.pathname;
const header = document.querySelector('.site-header');

function refreshCartTags(count = cartCount()) {
  const cartNav = document.querySelector('.site-nav a[href="/cart/"] span');
  if (cartNav) cartNav.textContent = count > 0 ? `Cart (${count})` : 'Cart';
}

if (header) {
  const nav = header.querySelector('nav');
  if (nav) {
    nav.classList.add('site-nav');
    nav.id = 'site-nav';
    nav.innerHTML = menuLinks
      .map(({ href, label, hint, external }) => {
        const active =
          !external &&
          (currentPath === href ||
            (href === '/shop/' && currentPath.startsWith('/products/')) ||
            (href === '/how-it-works/' && currentPath.startsWith('/how-it-works/')));
        return `<a href="${href}"${active ? ' aria-current="page"' : ''}${external ? ' target="_blank" rel="noopener"' : ''}><small>${hint}</small><span>${label}</span></a>`;
      })
      .join('');
  }

  const button = document.createElement('button');
  button.className = 'menu-toggle';
  button.type = 'button';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'site-nav');
  button.setAttribute('aria-label', 'Open menu');
  button.innerHTML = '<span>Menu</span><b aria-hidden="true">+</b>';
  header.insertBefore(button, nav);

  const buyLink = header.querySelector('.header-tag');
  if (buyLink) {
    buyLink.removeAttribute('data-cart-count');
    buyLink.classList.add('header-buy');
    buyLink.href = etsy;
    buyLink.target = '_blank';
    buyLink.rel = 'noopener';
    buyLink.setAttribute('aria-label', 'Open the live Etsy listing — $59.95');
    buyLink.innerHTML = `<span class="buy-full">${buyLabel}</span><span class="buy-short">Etsy · $59.95</span>`;
  }

  const setMenu = (open, returnFocus = false) => {
    const wasOpen = document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    button.querySelector('span').textContent = open ? 'Close' : 'Menu';
    button.querySelector('b').textContent = open ? '−' : '+';
    if (open) nav?.querySelector('a')?.focus();
    else if (returnFocus && wasOpen) button.focus();
  };

  button.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false, true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
  });
}

document.querySelectorAll('.site-footer nav').forEach((nav) => {
  const footer = [
    ...links,
    { href: etsy, label: 'Buy on Etsy', external: true },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' }
  ];
  nav.innerHTML = footer
    .map(({ href, label, external }) => {
      return `<a href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`;
    })
    .join('');
});

refreshCartTags();
subscribeCart((items) => refreshCartTags(cartCount(items)));
