// Competências exibidas na home. Cada uma aponta para onde está provada, e a
// prova é o projeto, não uma frase: competência sem projeto que a mostre não
// aparece no site (regra de conteúdo do AGENTS.md).
//
// Para acrescentar: uma linha em `itens`, com o texto e a lista de provas.
// Prova de projeto usa o slug do arquivo em src/content/projetos/. O link
// sai sozinho: estudo de caso quando existe, repositório quando não.

export type Prova = { projeto: string } | { rotulo: string; href: string };

export interface Competencia {
  area: string;
  itens: { texto: string; provas: Prova[] }[];
}

const ANIDECK: Prova = { projeto: 'anideck' };
const GRIMOIRE: Prova = { projeto: 'grimoire' };
const ESTE_SITE: Prova = { rotulo: 'este site', href: 'https://github.com/JoaoMendes1/jvm-systems' };

export const COMPETENCIAS: Competencia[] = [
  {
    area: 'Back-end',
    itens: [
      { texto: 'API REST em Go com chi', provas: [ANIDECK, GRIMOIRE] },
      { texto: 'Login com Supabase Auth e JWT validado por JWKS', provas: [ANIDECK, GRIMOIRE] },
      { texto: 'PostgreSQL com isolamento por usuário (RLS), views e functions', provas: [ANIDECK] },
      { texto: 'Consumo de API GraphQL com rate limit, retentativa e kill switch', provas: [ANIDECK] },
      { texto: 'Rate limiting nas rotas que chamam serviços externos', provas: [GRIMOIRE] },
    ],
  },
  {
    area: 'IA aplicada',
    itens: [
      { texto: 'Integração com LLM (Gemini): reescrita de texto com prompt editável e fallback de modelo', provas: [ANIDECK] },
    ],
  },
  {
    area: 'Front-end',
    itens: [
      { texto: 'React 19, TypeScript e Tailwind', provas: [ANIDECK] },
      { texto: 'JavaScript sem framework e PWA instalável', provas: [GRIMOIRE] },
      { texto: 'Astro com MDX e conteúdo validado por schema', provas: [ESTE_SITE] },
    ],
  },
  {
    area: 'Infra e processo',
    itens: [
      { texto: 'VPS Linux, Docker e Caddy com HTTPS automático', provas: [ANIDECK, GRIMOIRE, ESTE_SITE] },
      { texto: 'CI/CD com GitHub Actions: deploy a cada push', provas: [ANIDECK, GRIMOIRE, ESTE_SITE] },
      { texto: 'Git com staging e main, issues e decisões documentadas', provas: [ANIDECK, GRIMOIRE, ESTE_SITE] },
    ],
  },
];