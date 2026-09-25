import './styles.css';
import './site-shell.js';
import { products, formatPrice, productUrl, shop } from './products.js';
import { cartLines, setQty, removeItem, getCart, subscribeCart } from './cart.js';

const root = document.querySelector('#cart-root');

function render() {
  if (!root) return;
  const lines = cartLines(products);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  if (!lines.length) {
    root.innerHTML = `
      <section class="cart-empty">
        <p class="utility">CART / 00</p>
        <h1>NOTHING<br />IN THE CAN.</h1>
        <p>The shop is wallpaper looks for one patented can. Add a look, then check out through Etsy.</p>
        <a class="release-bar" href="/shop/"><span>OPEN THE PATTERN SHOP</span><strong>SEE THE LOOKS ↗</strong></a>
      </section>`;
    return;
  }

  root.innerHTML = `
    <section class="cart-hero">
      <div>
        <p class="utility">LOCAL CART / NO CARD KEYS</p>
        <h1>YOUR<br />LOOKS.</h1>
        <p>Each line is a wallpaper look for The Forever Can. Purchase happens on Etsy — one listing, nickel or gold insert at checkout.</p>
      </div>
      <aside>
        <span>SUBTOTAL</span>
        <strong>${formatPrice(subtotal)}</strong>
        <small>${lines.length} LOOK${lines.length === 1 ? '' : 'S'}</small>
      </aside>
    </section>
    <section class="cart-lines" aria-label="Cart items">
      ${lines
        .map(
          (line) => `<article>
            <a href="${productUrl(line.product.slug)}"><img src="${line.product.images[0]}" alt="${line.product.title}" /></a>
            <div>
              <p class="utility">${(line.product.style || line.product.pattern || '').toUpperCase()}</p>
              <h2>${line.product.title}</h2>
              <p>${formatPrice(line.product.price || shop.price)} each</p>
            </div>
            <label>Qty <input type="number" min="1" max="12" value="${line.qty}" data-qty="${line.product.id}" /></label>
            <strong>${formatPrice(line.lineTotal)}</strong>
            <button type="button" data-remove="${line.product.id}">Remove</button>
          </article>`
        )
        .join('')}
    </section>
    <section class="cart-checkout">
      <div>
        <p class="utility">PATH 01</p>
        <h2>BUY ON<br />ETSY.</h2>
        <p>Opens the live WallpaperWastebasket listing. Choose nickel or gold insert there. Looks are inspiration until custom SKUs exist.</p>
        <button type="button" class="solid-btn" id="etsy-checkout">OPEN ETSY LISTING ↗</button>
      </div>
      <form id="inquire-form" class="inquire-form">
        <p class="utility">PATH 02</p>
        <h2>INQUIRE<br />TO ORDER.</h2>
        <p>Name, email, and shipping. Posted to an API route — no payment processor secrets.</p>
        <label>Name <input required name="name" autocomplete="name" /></label>
        <label>Email <input required type="email" name="email" autocomplete="email" /></label>
        <label>Shipping address <textarea required name="shipping" rows="3"></textarea></label>
        <label>Note <textarea name="message" rows="3" placeholder="Wallpaper leftover, look preference, nickel or gold"></textarea></label>
        <button class="solid-btn" type="submit">SEND INQUIRY</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>`;

  root.querySelectorAll('[data-qty]').forEach((input) => {
    input.addEventListener('change', () => setQty(input.dataset.qty, input.value));
  });
  root.querySelectorAll('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => removeItem(button.dataset.remove));
  });
  root.querySelector('#etsy-checkout')?.addEventListener('click', () => {
    window.open(shop.etsyListing, '_blank', 'noopener');
  });
  root.querySelector('#inquire-form')?.addEventListener('submit', submitInquiry);
}

async function submitInquiry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const data = Object.fromEntries(new FormData(form));
  const items = cartLines(products, getCart()).map((line) => ({
    id: line.product.id,
    slug: line.product.slug,
    title: line.product.title,
    qty: line.qty,
    price: line.product.price || shop.price
  }));
  status.textContent = 'Sending…';
  try {
    const response = await fetch('/api/inquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, items })
    });
    if (!response.ok) throw new Error('request failed');
    status.textContent = 'Inquiry sent. Patti’s studio will confirm by email.';
    form.reset();
  } catch {
    const subject = encodeURIComponent('Forever Can order inquiry');
    const body = encodeURIComponent(
      `${data.name}\n${data.email}\n${data.shipping}\n\n${data.message || ''}\n\n${items
        .map((item) => `${item.qty} × ${item.title}`)
        .join('\n')}`
    );
    window.location.href = `mailto:hello@theforevercan.com?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your mail app as a fallback.';
  }
}

render();
subscribeCart(render);
