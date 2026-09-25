import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        shop: resolve(import.meta.dirname, 'shop/index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        contact: resolve(import.meta.dirname, 'contact/index.html'),
        cart: resolve(import.meta.dirname, 'cart/index.html'),
        foreverCan: resolve(import.meta.dirname, 'products/your-forever-can/index.html'),
        roseGarden: resolve(import.meta.dirname, 'products/rose-garden/index.html'),
        chinoiserie: resolve(import.meta.dirname, 'products/chinoiserie-grove/index.html'),
        lattice: resolve(import.meta.dirname, 'products/lattice-geometry/index.html'),
        blushDamask: resolve(import.meta.dirname, 'products/blush-damask/index.html'),
        inkToile: resolve(import.meta.dirname, 'products/ink-toile/index.html')
      }
    }
  }
});
