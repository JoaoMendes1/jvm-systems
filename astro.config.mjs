import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Endereço público do site. O Astro usa para gerar URLs absolutas: a URL
  // canônica, a imagem de compartilhamento e o sitemap.
  site: 'https://joaomendes.dev.br',
  integrations: [
    mdx(),
    // Sitemap gerado no build a partir das páginas que existem. A 404 fica
    // de fora: ela não é página para buscador listar.
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
  // Fontes baixadas no build e servidas pelo próprio site, não pelo Google:
  // a visita não envia o IP do visitante a terceiros. Cada cssVariable é o
  // nome do token no docs/DESIGN_TOKENS.md.
  fonts: [
    {
      name: 'Bricolage Grotesque',
      cssVariable: '--disp',
      provider: fontProviders.google(),
      weights: [500, 600, 700],
      styles: ['normal'],
    },
    {
      name: 'Instrument Serif',
      cssVariable: '--edit',
      provider: fontProviders.google(),
      weights: [400],
      styles: ['italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      name: 'Inter',
      cssVariable: '--body',
      provider: fontProviders.google(),
      weights: [400, 450, 500],
      styles: ['normal'],
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--mono',
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ['normal'],
      fallbacks: ['monospace'],
    },
  ],
});