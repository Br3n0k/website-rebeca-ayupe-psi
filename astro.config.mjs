// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { CONFIG } from './src/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap({
      filter: (page) =>
        page !== `${CONFIG.siteUrl}/obrigado` &&
        page !== `${CONFIG.siteUrl}/links`,
      priority: 0.7,
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url === CONFIG.siteUrl) return { ...item, priority: 1.0 };
        if (url.endsWith('/atendimento-online') || url.endsWith('/psicologa-goiania')) {
          return { ...item, priority: 0.9 };
        }
        if (url.includes('/servicos/')) return { ...item, priority: 0.8 };
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  site: CONFIG.siteUrl,
  trailingSlash: 'never',
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
