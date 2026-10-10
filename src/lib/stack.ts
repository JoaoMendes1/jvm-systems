// Logo de cada tecnologia da stack, para os cards de projeto. Os desenhos vêm do
// pacote simple-icons (licença CC0); aqui só escolhemos quais usar e com que cor.
// Tecnologia sem logo no pacote (como o chi) aparece só com o nome.
import {
  siGo,
  siReact,
  siTypescript,
  siJavascript,
  siPostgresql,
  siGooglegemini,
  siPwa,
  siNodedotjs,
  siFastify,
  type SimpleIcon,
} from 'simple-icons';

// O nome é o mesmo do campo `stack` do frontmatter, sem número de versão:
// "React 19" procura "React".
const LOGOS: Record<string, SimpleIcon> = {
  Go: siGo,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  PostgreSQL: siPostgresql,
  Gemini: siGooglegemini,
  PWA: siPwa,
  'Node.js': siNodedotjs,
  Fastify: siFastify,
};

// Luminância relativa (fórmula do WCAG), para saber se a cor aparece no fundo escuro.
function luminancia(hex: string): number {
  const canal = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(0) + 0.7152 * canal(2) + 0.0722 * canal(4);
}

// Fundo do card (--card, #101016). Logo com contraste menor que 3:1 contra ele
// (o preto do Fastify, o roxo escuro do PWA) some; nesses casos a logo fica clara.
const FUNDO = luminancia('101016');

export interface Logo {
  path: string;
  cor: string;
}

export function logoDa(nome: string): Logo | undefined {
  const icone = LOGOS[nome.replace(/\s+\d+(\.\d+)*$/, '')];
  if (!icone) return undefined;
  const contraste = (luminancia(icone.hex) + 0.05) / (FUNDO + 0.05);
  return { path: icone.path, cor: contraste >= 3 ? `#${icone.hex}` : 'var(--fg)' };
}