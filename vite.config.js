import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import catalog from './src/data/products.json';

const patternInputs = Object.fromEntries(
  catalog.patterns.map((pattern) => [
    pattern.slug.replace(/-/g, ''),
    resolve(import.meta.dirname, `products/${pattern.slug}/index.html`)
  ])
);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        shop: resolve(import.meta.dirname, 'shop/index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        howto: resolve(import.meta.dirname, 'how-it-works/index.html'),
        contact: resolve(import.meta.dirname, 'contact/index.html'),
        cart: resolve(import.meta.dirname, 'cart/index.html'),
        ...patternInputs
      }
    }
  }
});
