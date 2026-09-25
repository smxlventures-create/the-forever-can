import catalog from './data/products.json';

export const shop = catalog.shop;
export const howItWorks = catalog.howItWorks;
export const patterns = catalog.patterns.map((item) => ({
  ...item,
  title: item.title || `Forever Can in ${item.name}`,
  pattern: item.name,
  price: item.price ?? catalog.shop.price,
  currency: item.currency ?? catalog.shop.currency,
  etsyUrl: item.etsyUrl ?? catalog.shop.etsyListing,
  materials: item.materials ?? catalog.shop.materials,
  size: item.size ?? catalog.shop.size,
  care: item.care ?? catalog.shop.care
}));
export const products = patterns;

const STYLE_ORDER = ['botanical', 'tropical', 'chinoiserie', 'floral', 'damask', 'geometric', 'novelty'];
export const styles = STYLE_ORDER.filter((style) => patterns.some((item) => item.style === style));
export const styleLabels = {
  botanical: 'Botanical',
  tropical: 'Tropical',
  chinoiserie: 'Chinoiserie / Birds',
  floral: 'Floral',
  damask: 'Damask',
  geometric: 'Geometric',
  novelty: 'Animal / Novelty'
};

export const productMap = Object.fromEntries(patterns.map((item) => [item.slug, item]));

export function getProduct(slug) {
  return productMap[slug] || patterns[0];
}

export function formatPrice(value, currency = shop.currency || 'USD') {
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

export function featuredPatterns(limit = 4) {
  return patterns.filter((item) => item.featured).slice(0, limit);
}

export function roomsOf(pattern) {
  return (pattern.rooms || []).join(' · ');
}
