const KEY = 'forever-can-cart';

const listeners = new Set();

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((line) => line?.id && line.qty > 0) : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((fn) => fn(items));
}

export function getCart() {
  return read();
}

export function subscribeCart(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function addToCart(id, qty = 1) {
  const items = read();
  const existing = items.find((line) => line.id === id);
  if (existing) existing.qty += qty;
  else items.push({ id, qty });
  write(items);
  return items;
}

export function setQty(id, qty) {
  const next = Math.max(0, Number(qty) || 0);
  const items = read().flatMap((line) => {
    if (line.id !== id) return [line];
    return next > 0 ? [{ ...line, qty: next }] : [];
  });
  write(items);
  return items;
}

export function removeItem(id) {
  write(read().filter((line) => line.id !== id));
}

export function clearCart() {
  write([]);
}

export function cartCount(items = read()) {
  return items.reduce((sum, line) => sum + line.qty, 0);
}

export function cartLines(products, items = read()) {
  return items
    .map((line) => {
      const product = products.find((item) => item.id === line.id);
      if (!product) return null;
      return {
        ...line,
        product,
        lineTotal: product.price * line.qty
      };
    })
    .filter(Boolean);
}
