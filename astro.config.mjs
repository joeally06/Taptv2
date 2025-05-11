import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  devToolbar: {
    enabled: true
  },
  vite: {
    build: {
      target: 'es2022'
    }
  }
});