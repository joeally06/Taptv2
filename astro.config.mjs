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
    enabled: true // Dev toolbar remains enabled
  },
  vite: {
    build: {
      target: 'es2022'
    },
    server: {
      hmr: {
        timeout: 300000  // 5 minutes for better reliability
      },
      fs: {
        strict: false,
        allow: ['./src', './public', './node_modules'] // Added node_modules to allow list
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