/**
 * Refresh shop metadata from the Etsy Open API.
 * Does not overwrite the wallpaper lookbook in `patterns`.
 *
 * Usage:
 *   ETSY_API_KEY=xxxxx npm run fetch:etsy
 *
 * Without ETSY_API_KEY the seeded catalog is left in place.
 */

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import seeded from '../src/data/products.json' with { type: 'json' };

const LISTING_ID = process.env.ETSY_LISTING_ID || '1552653332';
const API = 'https://openapi.etsy.com/v3/application';
const OUT = resolve(import.meta.dirname, '../src/data/products.json');

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
  console.log('ETSY_API_KEY is not set. Keeping the wallpaper lookbook in src/data/products.json.');
  console.log(`Primary listing remains ${seeded.shop.etsyListing}`);
  process.exit(0);
}

const key = process.env.ETSY_API_KEY;
const primary = await etsy(`/listings/${LISTING_ID}?includes=images,shop`, key);
const shopId = primary.shop_id || primary.shop?.shop_id;
const price = primary.price
  ? Number(primary.price.amount ?? 0) / (Number(primary.price.divisor ?? 100) || 100)
  : seeded.shop.price;

const next = {
  ...seeded,
  shop: {
    ...seeded.shop,
    price: price || seeded.shop.price,
    shopId,
    source: 'etsy-open-api',
    updatedAt: new Date().toISOString()
  }
};

await writeFile(OUT, `${JSON.stringify(next, null, 2)}\n`);
console.log(`Updated shop metadata from listing ${LISTING_ID}. Pattern lookbook left intact.`);
