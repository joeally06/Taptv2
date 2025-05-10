// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  devToolbar: {
    enabled: false
  },
  vite: {
    build: {
      sourcemap: true,
      target: 'es2022'
    },
    server: {
      hmr: {
        timeout: 120000
      },
      fs: {
        allow: ['.']
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      }
    }
  }
});