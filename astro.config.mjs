// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  server: {
    port: 4321,
    host: true
  },
  devToolbar: {
    enabled: false
  },
  vite: {
    build: {
      target: 'es2022'
    },
    server: {
      hmr: {
        timeout: 300000
      },
      fs: {
        strict: false,
        // Ensure node_modules is explicitly allowed and at the root of the allow list
        allow: ['node_modules', '.', './src', './public']
      },
      watch: {
        usePolling: true,
        interval: 1000
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      }
    }
  }
});