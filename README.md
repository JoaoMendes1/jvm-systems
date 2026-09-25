# JVM Systems

Portfólio com os projetos que construí e mantenho no ar — com as decisões que tomei, o que deu
errado e o que aprendi.

**Endereço:** `https://joaomendes.dev.br` *(ainda não publicado — ver Fase 1 do [`docs/ROADMAP.md`](docs/ROADMAP.md))*

---

## O que é

Site pessoal e portfólio de João Victor Mendes. Reúne três coisas:

- **Projetos** — cada um com estudo de caso: contexto, decisões, o custo de cada decisão, o que
  quebrou em produção e o que eu faria diferente.
- **Pílulas de conhecimento** — o que eu aprendi resolvendo algo, escrito no dia em que resolvi.
- **Sobre** — trajetória e ferramental.

Os projetos rodam na mesma VPS que serve este site. O quadro "rodando agora" da home lista apenas
o que está de fato no ar.

## Como funciona

```
src/content/*.mdx  →  build do Astro  →  HTML estático  →  container  →  Caddy  →  visitante
```

- **O conteúdo é arquivo.** Cada projeto e cada pílula é um `.mdx` versionado neste repositório.
  Não há banco de dados.
- **O site é estático.** O build gera HTML pronto, e nenhuma visita chega a um servidor de
  aplicação.
- **Número exibido é número calculado.** Projetos no ar, pílulas publicadas e tempo de leitura são
  derivados dos arquivos no build — nunca escritos à mão.

## Stack

| Camada | Tecnologia |
|---|---|
| Gerador | Astro com MDX *(versões fixadas no scaffold — Fase 1)* |
| Estilo | CSS puro com custom properties — ver [`docs/DESIGN_TOKENS.md`](docs/DESIGN_TOKENS.md) |
| Conteúdo | Content collections com schema validado no build |
| Hospedagem | VPS própria: container servindo arquivos estáticos atrás do Caddy |
| Deploy | `git push` na `main` → GitHub Actions → build na VPS |

## Estrutura

```
src/
├── content/
│   ├── projetos/     ← um .mdx por projeto
│   └── pilulas/      ← um .mdx por pílula
├── components/
├── layouts/
├── pages/
└── styles/
docs/                 ← toda a documentação, exceto este README e o AGENTS.md
prototipos/           ← protótipo visual de referência
AGENTS.md             ← como trabalhar neste repositório
README.md
```

*Estrutura prevista. Confirmada no scaffold da Fase 1.*

## Rodar localmente

> Válido depois do scaffold (Fase 1).

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # gera o site em dist/
npm run preview    # serve o dist/ exatamente como em produção
```

## Adicionar conteúdo

- **Projeto novo:** um arquivo em `src/content/projetos/`.
- **Pílula nova:** um arquivo em `src/content/pilulas/`.

Campos obrigatórios, regras de exibição e armadilhas estão em [`docs/CONTEUDO.md`](docs/CONTEUDO.md).

## Documentação

| Arquivo | Para quê |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Como trabalhar neste repositório — para pessoas e para IA |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Fases, corte do MVP e backlog |
| [`docs/PAGES.md`](docs/PAGES.md) | Status por página |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Decisões estruturais e o porquê de cada uma |
| [`docs/DESIGN_TOKENS.md`](docs/DESIGN_TOKENS.md) | Cores, tipografia e padrões de componente |
| [`docs/CONTEUDO.md`](docs/CONTEUDO.md) | Contrato do conteúdo e tom dos textos |

## Licença

A definir.
