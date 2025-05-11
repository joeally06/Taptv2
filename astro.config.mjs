// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  devToolbar: {
    enabled: true  // Re-enable dev toolbar
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
        // Expand allowed directories to ensure all dependencies can be scanned
        allow: ['.', '../', '../../']
      },
      watch: {
        // Increase the watch timeout to prevent scanning issues
        usePolling: true,
        interval: 1000
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      },
      // Force include problematic dependencies
      force: true
    }
  }
});