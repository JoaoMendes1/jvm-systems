// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Endereço público do site. O Astro usa para gerar URLs absolutas
  // (sitemap e link canônico, na Fase 3).
  site: 'https://joaomendes.dev.br',
  integrations: [mdx()],
});