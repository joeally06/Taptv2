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
  vite: {
    build: {
      target: 'es2022'
    },
    server: {
      hmr: {
        timeout: 300000  // 5 minutes timeout
      },
      fs: {
        strict: false,
        allow: [
          '.',                   // Allow current directory
          '..',                  // Allow parent directory
          '../..',               // Allow grandparent directory
          './src/**',           // Allow all files under src
          './public/**',        // Allow all files under public
          './node_modules/**'   // Allow all files under node_modules
        ]
      },
      watch: {
        usePolling: true,  // Enable polling for more reliable file watching
        interval: 1000     // Check for changes every second
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      },
      force: true     // Force dependency optimization
    }
  }
});