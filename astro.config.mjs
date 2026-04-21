// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { CONFIG } from './src/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap({
      filter: (page) => page !== `${CONFIG.siteUrl}/obrigado`,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  site: CONFIG.siteUrl,
  devToolbar: {
    enabled: false,
  },
  build: {
    format: 'file',
    assets: 'assets',
  },
  compressHTML: true,
  outDir: './public_html',
});
