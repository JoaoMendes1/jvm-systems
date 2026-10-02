// Função única de formatação das datas do conteúdo. Ver a armadilha "Data sem
// hora aparece um dia antes no Brasil" no docs/CONTEUDO.md: o YAML lê
// `2026-09-18` como meia-noite em UTC, e formatar no fuso de São Paulo
// mostraria 17/09. Com timeZone fixo em UTC, notebook (UTC−3) e VPS (UTC)
// mostram o mesmo dia. Nunca chamar toLocaleDateString direto num componente.
const FORMATO = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

// "18 set 2026", o formato do protótipo. Monta pelas partes (dia, mês, ano)
// em vez de recortar o texto "18 de set. de 2026", que muda entre versões.
export function formatarData(data: Date): string {
  const partes = FORMATO.formatToParts(data);
  const parte = (tipo: Intl.DateTimeFormatPartTypes) => partes.find((p) => p.type === tipo)?.value ?? '';
  return `${parte('day')} ${parte('month').replace('.', '')} ${parte('year')}`;
}

// Valor do atributo datetime da tag <time>: "2026-09-18". toISOString já é UTC.
export function dataISO(data: Date): string {
  return data.toISOString().slice(0, 10);
}