/**
 * Refresh src/data/products.json from the Etsy Open API.
 *
 * Usage:
 *   ETSY_API_KEY=xxxxx npm run fetch:etsy
 *
 * Without ETSY_API_KEY the seeded catalog is left in place.
 * Primary listing: https://www.etsy.com/listing/1552653332/the-forever-can-wallpaper-wastebasket
 * Shop: WallpaperWastebasket. Seeded price is $59.95 when the API is unavailable.
 *
 * Etsy Open API v3 docs:
 *   https://developers.etsy.com/documentation/reference
 *
 * Required scopes / key: an app key from https://www.etsy.com/developers/
 * Listings endpoint needs `x-api-key`. Shop listings need the shop_id
 * returned on the primary listing.
 */

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import seeded from '../src/data/products.json' with { type: 'json' };

const LISTING_ID = process.env.ETSY_LISTING_ID || '1552653332';
const API = 'https://openapi.etsy.com/v3/application';
const OUT = resolve(import.meta.dirname, '../src/data/products.json');

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48);
}

function money(listing) {
  const price = listing.price || {};
  const amount = Number(price.amount ?? 0);
  const divisor = Number(price.divisor ?? 100) || 100;
  return Math.round(amount / divisor);
}

async function etsy(path, key) {
  const response = await fetch(`${API}${path}`, {
    headers: { 'x-api-key': key }
  });
  if (!response.ok) {
    throw new Error(`Etsy ${path} → ${response.status} ${await response.text()}`);
  }
  return response.json();
}

if (!process.env.ETSY_API_KEY) {
  console.log('ETSY_API_KEY is not set. Keeping the seeded catalog in src/data/products.json.');
  console.log('Create an app at https://www.etsy.com/developers/ and rerun:');
  console.log('  ETSY_API_KEY=xxxxx npm run fetch:etsy');
  console.log(`Primary listing remains ${seeded.shop.etsyListing}`);
  process.exit(0);
}

const key = process.env.ETSY_API_KEY;
const primary = await etsy(`/listings/${LISTING_ID}?includes=images,shop`, key);
const shopId = primary.shop_id || primary.shop?.shop_id;
const shopListings = shopId
  ? await etsy(`/shops/${shopId}/listings/active?limit=25&includes=images`, key)
  : { results: [primary] };

const listings = shopListings.results?.length ? shopListings.results : [primary];
const products = listings.map((listing, index) => {
  const images = (listing.images || []).map((image) => image.url_570xN || image.url_fullxfull).filter(Boolean);
  const title = listing.title || `Forever Can ${index + 1}`;
  return {
    id: String(listing.listing_id),
    slug: slugify(title) || `listing-${listing.listing_id}`,
    title,
    pattern: (listing.tags || [])[0] || 'Wallpaper wastebasket',
    price: money(listing) || seeded.shop.price || 59.95,
    currency: listing.price?.currency_code || 'USD',
    featured: index < 4,
    index: String(index + 1).padStart(2, '0'),
    story: (listing.title || '').slice(0, 90),
    description: listing.description || seeded.products[0].description,
    longDescription: listing.description || seeded.products[0].longDescription,
    materials: 'Forever Can system with wallpaper insert',
    size: 'Standard powder-room / bath can',
    care: 'Wipe the shell. Swap the paper. No glue, no peel.',
    images: images.length ? images : seeded.products[index % seeded.products.length].images,
    etsyUrl: listing.url || `https://www.etsy.com/listing/${listing.listing_id}/`,
    tags: listing.tags || ['wallpaper'],
    colors: seeded.products[index % seeded.products.length].colors,
    accent: seeded.products[index % seeded.products.length].accent
  };
});

const next = {
  shop: {
    ...seeded.shop,
    source: 'etsy-open-api',
    shopId,
    updatedAt: new Date().toISOString()
  },
  products
};

await writeFile(OUT, `${JSON.stringify(next, null, 2)}\n`);
console.log(`Wrote ${products.length} listings from shop ${shopId || 'unknown'} → src/data/products.json`);
