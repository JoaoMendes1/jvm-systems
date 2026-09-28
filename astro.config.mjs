import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Endereço público do site. O Astro usa para gerar URLs absolutas
  // (sitemap e link canônico, na Fase 3).
  site: 'https://joaomendes.dev.br',
  integrations: [mdx()],
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