# 🎨 DESIGN_TOKENS.md — JVM Systems

> Fonte única de verdade para cores, tipografia e padrões de componente. Extraído do
> `prototipos/vitrine-v4.html` em 24/09/2026. Os nomes dos tokens são os mesmos do protótipo,
> para o porte ser cópia e não tradução.

## Paleta

Tema único, escuro. Tema claro está fora do escopo.

```css
/* superfícies */
--bg:#07070A;       /* fundo da página */
--bg2:#0C0C11;      /* fundo de blocos: stats, inputs, quadro de serviços */
--card:#101016;     /* cards */
--card2:#15151C;    /* card em hover */

/* bordas — branco com transparência, ver exceção abaixo */
--line:rgba(255,255,255,.065);   /* borda padrão */
--line2:rgba(255,255,255,.13);   /* borda de destaque, hover, botão secundário */

/* texto */
--fg:#F6F6F8;       /* texto principal */
--fg2:#A3A3AE;      /* texto secundário, parágrafos */
--fg3:#6A6A76;      /* texto terciário: rótulos, datas, metadados */

/* acento */
--acc:#FF9D48;      /* laranja — acento primário: botão, link, rótulo */
--acc2:#FFD2A6;     /* laranja claro — hover do botão, início do gradiente */
--vio:#B487FF;      /* violeta — fim do gradiente de marca */
--acc-dim:color-mix(in srgb, var(--acc) 11%, transparent);   /* fundo de chip e callout */

/* semântica */
--live:#4ADE80;     /* verde — status "no ar" */
```

**Gradiente de marca** (título em itálico do hero, barra de progresso de leitura):
`linear-gradient(98deg, var(--acc2) 0%, var(--acc) 42%, var(--vio) 100%)`

### Regras de cor

- **Nunca repita um hex fora do bloco onde ele é definido.** Para cor com opacidade, use
  `color-mix(in srgb, var(--token) N%, transparent)`, não `rgba()` com os canais escritos à mão.
  Senão o valor passa a existir em dois lugares e diverge.
- **O protótipo não segue essa regra.** Ele tem dezenas de `rgba(255,157,72,.xx)` e similares.
  No porte, cada um vira `color-mix` sobre `--acc`, `--vio` ou `--live`.
- **Exceção deliberada:** branco e preto puros com transparência (bordas, sombras, brilhos) ficam
  literais — mesmo critério do AniDeck.
- **`--live` é semântico.** Significa "no ar" e não deve ser usado como decoração, senão perde o
  significado.

### Cores decorativas

Não fazem parte do vocabulário da interface. Existem só dentro do bloco que as usa.

| Uso | Valores | Onde |
|---|---|---|
| Capa de card, variante `laranja` | `#301C10` → `#41230F` → `#120F0D` | card de projeto |
| Capa de card, variante `verde` | `#0F211B` → `#12332A` → `#0C1211` | card de projeto |
| Capa de card, variante `violeta` | `#191627` → `#26213E` → `#101017` | card de projeto |
| Capa de card, variante `neutro` | `#1B1B21` → `#27272F` → `#0F0F13` | card de pílulas |
| Aurora de fundo | `--acc` 14%, `--vio` 11%, `--live` 5,5% | fundo fixo da página |
| Fundo do terminal | `#08080C` | bloco de código |

A variante da capa é escolhida pelo campo `visual` do arquivo do projeto — ver `docs/CONTEUDO.md`.

## Tipografia

| Uso | Fonte | Pesos |
|---|---|---|
| Títulos (`h1`, `h2`, `h3`, números dos stats) | `'Bricolage Grotesque'` | 500, 600, 700 |
| Destaque editorial em itálico no título | `'Instrument Serif'` | 400 itálico |
| Corpo de texto | `'Inter'` | 400, 450, 500 |
| Rótulos, datas, tags, código | `'JetBrains Mono'` | 400, 500 |

Import usado no protótipo:
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;450;500&family=JetBrains+Mono:wght@400;500&display=swap
```

**Títulos têm `letter-spacing` negativo** (de `-.02em` a `-.04em`, maior quanto maior o título).
Rótulos em mono têm `letter-spacing` positivo (`.06em` a `.08em`). É a combinação que dá o tom.

## Padrões de componente

- **Navegação:** pílula fixa no topo, fundo translúcido com `backdrop-filter: blur`, item ativo em
  `--acc` com texto escuro.
- **Botão primário:** fundo `--acc`, texto escuro, `border-radius: 999px`, brilho diagonal no hover.
- **Botão secundário:** fundo quase transparente, borda `--line2`.
- **Card de projeto:** fundo `--card`, borda `--line`, `border-radius: 20px`, capa com grade e
  gradiente, sobe `4px` no hover com brilho que segue o cursor.
- **Chip de stack:** mono, `border-radius: 7px`, borda `--line2`. O primeiro item da stack usa
  `--acc-dim` com texto `--acc`.
- **Tag de status:** pílula com fundo do tom em opacidade baixa e texto no tom cheio. "No ar" usa
  `--live`, com ponto pulsante; "em construção" usa `--acc`, sem pulso.
- **Bloco de decisão** (estudo de caso): card com filete vertical em gradiente à esquerda e linhas
  rotuladas `contexto` / `escolhi` / `descartei` / `custo`.
- **Terminal:** barra com três pontos e nome do arquivo, fundo mais escuro que a página.
- **Callout:** fundo `--acc-dim`, borda `--line2`, para a lição geral de uma pílula.

### Border-radius

| Elemento | Valor |
|---|---|
| Botões, navegação, tags de status, filtros | `999px` (pílula) |
| Cards de projeto | `20px` |
| Cards de pílula, blocos de decisão, quadro de serviços | `16px` a `18px` |
| Inputs | `11px` |
| Chips | `7px` |

## Movimento

- **Toda animação vive dentro de `@media (prefers-reduced-motion: no-preference)`.** Quem pediu
  menos movimento vê o site parado, e nada deixa de ser legível por isso.
- Curva padrão: `cubic-bezier(.2,.7,.3,1)` — entra rápido e assenta devagar.
- Animação é enfeite. **Nenhum conteúdo pode depender dela para aparecer:** elemento que entra com
  fade precisa estar visível se o JavaScript não rodar.
