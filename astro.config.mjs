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
    enabled: false // Temporarily disable dev toolbar to prevent module loading issues
  },
  vite: {
    build: {
      target: 'es2022'
    },
    server: {
      hmr: {
        timeout: 300000  // Increased to 5 minutes for better reliability
      },
      fs: {
        strict: false,
        allow: ['./src', './public'] // Explicit directory allowlist instead of wildcards
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