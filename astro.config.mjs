import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'hybrid',
  adapter: netlify({
    edgeMiddleware: true
  }),
  integrations: [tailwind()],
  vite: {
    build: {
      target: 'es2022',
      rollupOptions: {
        output: {
          manualChunks: {
            'supabase': ['@supabase/supabase-js'],
            'auth': ['@supabase/auth-ui-react', '@supabase/auth-ui-shared']
          }
        }
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      }
    },
    server: {
      watch: {
        usePolling: true
      },
      fs: {
        strict: false,
        allow: ['.']
      },
      proxy: {
        '/.netlify/functions': {
          target: 'http://localhost:9999',
          changeOrigin: true
        }
      }
    },
    ssr: {
      noExternal: ['@supabase/supabase-js']
    }
  }
});