// robots.txt gerado no build, a partir do `site` do astro.config.mjs: o
// endereço do sitemap nunca fica escrito à mão em dois lugares.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`);
};