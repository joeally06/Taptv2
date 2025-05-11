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
      target: 'es2022',
      // Add additional build optimizations
      cssCodeSplit: false,
      minify: false,
      // Increase chunk size limit
      chunkSizeWarningLimit: 1000
    },
    server: {
      hmr: {
        timeout: 600000  // Increase to 10 minutes timeout
      },
      fs: {
        strict: false,
        allow: [
          '/home/project/src/components',
          '/home/project/src/layouts',
          '/home/project/src/pages',
          '/home/project/src',
          '/'
        ]
      },
      watch: {
        usePolling: true,
        interval: 1000,
        // Add additional watch options
        followSymlinks: false,
        ignored: ['**/node_modules/**', '**/.git/**']
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      },
      force: true,
      // Add additional optimization options
      entries: [
        './src/pages/**/*.astro',
        './src/components/**/*.astro',
        './src/layouts/**/*.astro'
      ],
      exclude: ['node_modules']
    },
    // Add caching options
    cacheDir: '.vite',
    clearScreen: false
  }
});