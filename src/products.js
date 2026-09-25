import catalog from './data/products.json';

export const shop = catalog.shop;
export const products = catalog.products;

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product]));

export function getProduct(slug) {
  return productMap[slug] || products[0];
}

export function formatPrice(value, currency = 'USD') {
  const amount = Number(value);
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export function productUrl(slug) {
  return `/products/${slug}/`;
}
