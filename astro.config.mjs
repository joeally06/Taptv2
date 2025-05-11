// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  devToolbar: {
    enabled: false  // Temporarily disable dev toolbar to work around fetch error
  },
  server: {
    port: 4321,
    host: true
  },
  vite: {
    build: {
      target: 'es2022'
    },
    server: {
      hmr: {
        timeout: 120000
      },
      fs: {
        strict: false,
        allow: ['.', '../']
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      }
    }
  }
});