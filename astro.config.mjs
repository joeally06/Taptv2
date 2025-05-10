// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind()],
  devToolbar: {
    enabled: false
  },
  vite: {
    build: {
      target: 'es2022',
      sourcemap: false
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