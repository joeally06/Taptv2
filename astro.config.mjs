import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  vite: {
    optimizeDeps: {
      exclude: ['@supabase/supabase-js']
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        external: ['@supabase/supabase-js']
      }
    },
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**']
      }
    }
  }
});