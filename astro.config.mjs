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
          '.',            // Allow current directory
          '..',           // Allow parent directory
          '../..',        // Allow grandparent directory
          './src',        // Explicitly allow src directory
          './public',     // Explicitly allow public directory
          './components', // Explicitly allow components directory
          './layouts',    // Explicitly allow layouts directory
          './lib'         // Explicitly allow lib directory
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
      force: true,     // Force dependency optimization
      entries: [       // Explicitly specify entry points
        './src/**/*.astro',
        './src/**/*.ts',
        './src/components/**/*.astro',
        './src/layouts/**/*.astro',
        './src/pages/**/*.astro',
        './src/lib/**/*.ts'
      ]
    }
  }
});