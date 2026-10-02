// Regras de exibição do docs/CONTEUDO.md ("Onde o projeto aparece").
// Ficam num lugar só para nenhuma página decidir do seu jeito se algo
// aparece. Regra errada não quebra o build, só entrega errado: mudou algo
// aqui, confira no `npm run preview` contra a tabela do docs/CONTEUDO.md.

// Só os campos que as regras usam. A entrada do Astro (CollectionEntry) tem
// esses e mais outros, e o TypeScript aceita passá-la aqui: ele compara o
// formato do objeto, não o nome do tipo.
export interface ProjetoEntrada {
  body?: string;
  data: {
    status: 'no-ar' | 'em-construcao';
    url?: string;
    repo?: string;
    ordem: number;
    rascunho: boolean;
  };
}

export interface PilulaEntrada {
  data: { rascunho: boolean };
}

// Rascunho fica fora do site: nem página, nem lista, nem contagem.
export function visivel(p: { data: { rascunho: boolean } }): boolean {
  return !p.data.rascunho;
}

// Card na grade: visível e com repositório. Sem repo, o card seria uma promessa.
export function temCard(p: ProjetoEntrada): boolean {
  return visivel(p) && Boolean(p.data.repo);
}

// Quadro "rodando agora": tem card, está no ar e tem endereço.
export function estaNoAr(p: ProjetoEntrada): boolean {
  return temCard(p) && p.data.status === 'no-ar' && Boolean(p.data.url);
}

// Página de estudo de caso: tem card e o corpo tem texto de verdade.
// O trim() faz um corpo só com quebras de linha contar como vazio.
export function temEstudoDeCaso(p: ProjetoEntrada): boolean {
  return temCard(p) && (p.body ?? '').trim() !== '';
}

// Menor `ordem` primeiro. Uso: projetos.filter(temCard).sort(porOrdem)
export function porOrdem(a: ProjetoEntrada, b: ProjetoEntrada): number {
  return a.data.ordem - b.data.ordem;
}

export function pilulaPublicada(p: PilulaEntrada): boolean {
  return visivel(p);
}

// Minutos de leitura a 200 palavras por minuto, arredondado para cima e
// nunca menos que 1. Conta o MDX cru, então marcação e componentes entram
// na conta: erra um pouco para mais, o que serve para um "1 min".
export function tempoDeLeitura(corpo = ''): number {
  const palavras = corpo.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(palavras / 200));
}