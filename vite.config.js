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
        foreverCan: resolve(import.meta.dirname, 'products/the-forever-can/index.html'),
        brushedNickel: resolve(import.meta.dirname, 'products/brushed-nickel/index.html'),
        goldFinish: resolve(import.meta.dirname, 'products/gold-finish/index.html'),
        customDiy: resolve(import.meta.dirname, 'products/custom-diy/index.html'),
        artPhotos: resolve(import.meta.dirname, 'products/art-photos/index.html'),
        seasonalHoliday: resolve(import.meta.dirname, 'products/seasonal-holiday/index.html')
      }
    }
  }
});
