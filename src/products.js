import catalog from './data/products.json';

export const shop = catalog.shop;
export const products = catalog.products;

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product]));

export function getProduct(slug) {
  return productMap[slug] || products[0];
}

export function formatPrice(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function productUrl(slug) {
  return `/products/${slug}/`;
}
