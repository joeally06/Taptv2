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
        timeout: 180000 // Increased timeout for larger projects
      },
      fs: {
        // Expanded allowed directories for more thorough dependency scanning
        allow: ['.', '../', '../../', '../../../']
      },
      watch: {
        usePolling: true,
        interval: 500, // Decreased interval for more frequent scanning
        awaitWriteFinish: {
          stabilityThreshold: 2000,
          pollInterval: 100
        }
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      },
      force: true,
      entries: [
        './src/components/**/*.astro',
        './src/layouts/**/*.astro',
        './src/pages/**/*.astro'
      ]
    }
  }
});