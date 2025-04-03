// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { CONFIG } from './src/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => page !== `${CONFIG.siteUrl}/obrigado`
    }),
  ],
  site: CONFIG.siteUrl,
  // Remover a barra do Astro no rodapé
  devToolbar: {
    enabled: false,
  },

  build: {
    format: 'file',
    assets: 'assets'
  },

  compressHTML: true,

  outDir: './public_html'
});