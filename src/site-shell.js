import { cartCount, subscribeCart } from './cart.js';

const links = [
  { href: '/shop/', label: 'Shop' },
  { href: '/how-it-works/', label: 'How-to' },
  { href: '/about/', label: 'About' },
  { href: '/cart/', label: 'Cart' }
];

const currentPath = window.location.pathname;
const header = document.querySelector('.site-header');

function cartLabel(count) {
  return count > 0 ? `Cart / ${String(count).padStart(2, '0')} ↗` : 'Cart ↗';
}

function refreshCartTags(count = cartCount()) {
  document.querySelectorAll('[data-cart-count]').forEach((node) => {
    node.textContent = cartLabel(count);
  });
  const cartNav = document.querySelector('.site-nav a[href="/cart/"] span');
  if (cartNav) cartNav.textContent = count > 0 ? `Cart (${count})` : 'Cart';
}

if (header) {
  const nav = header.querySelector('nav');
  if (nav) {
    nav.classList.add('site-nav');
    nav.id = 'site-nav';
    nav.innerHTML = links
      .map(({ href, label }, index) => {
        const active =
          currentPath === href ||
          (href === '/shop/' && currentPath.startsWith('/products/')) ||
          (href === '/how-it-works/' && currentPath.startsWith('/how-it-works/'));
        return `<a href="${href}"${active ? ' aria-current="page"' : ''}><small>${String(index + 1).padStart(2, '0')}</small><span>${label}</span><i aria-hidden="true"></i></a>`;
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

  const shopLink = header.querySelector('.header-tag');
  if (shopLink && !shopLink.hasAttribute('data-cart-count')) {
    shopLink.href = '/shop/';
    shopLink.textContent = 'Shop looks ↗';
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
    { href: '/contact/', label: 'Contact' },
    { href: 'https://www.instagram.com/the_forever_can/', label: 'Instagram' }
  ];
  nav.innerHTML = footer
    .map(({ href, label }) => {
      const external = href.startsWith('http');
      return `<a href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${label.toUpperCase()}</a>`;
    })
    .join('');
});

refreshCartTags();
subscribeCart((items) => refreshCartTags(cartCount(items)));
