| # | Página | Rota | Arquivo | Status | Fase do Roadmap |
|---|---|---|---|---|---|
| 1 | Home | `/` | `src/pages/index.astro` | ✅ Implementada | Fase 2 |
| 2 | Estudo de caso | `/projetos/[slug]` | `src/pages/projetos/[slug].astro` | ✅ Implementada (HelpDesk Corporativo, AniDeck, Grimoire e JVM Console) | Fase 2 |
| 3 | Pílulas (lista) | `/pilulas` | `src/pages/pilulas/index.astro` | ✅ Implementada | Fase 2 |
| 4 | Pílula | `/pilulas/[slug]` | `src/pages/pilulas/[slug].astro` | ✅ Implementada | Fase 2 |
| 5 | Sobre | `/sobre` | `src/pages/sobre.astro` | ✅ Implementada | Fase 2 |
| 6 | Privacidade | `/privacidade` | `src/pages/privacidade.astro` | ✅ Implementada | Fase 2 |
| 7 | Página não encontrada | 404 | `src/pages/404.astro` | ✅ Implementada | Fase 2 |
| 8 | Painel de escrita | fora do site | — | Virou o projeto JVM Console | Fase 5 |

**Total: 7 páginas implementadas.**

> Protótipo de referência: `prototipos/vitrine-v4.html`. As telas 1 a 5 e 8 estão nele, e ele
> continua no repositório como referência visual.
>
> **Os textos do protótipo são provisórios.** Foram simplificados para seguir o tom do
> `docs/CONTEUDO.md`, mas o conteúdo final é escrito no porte.

> **Contato não é página.** É uma seção no fim da Home e do Sobre — com links diretos, não há o
> que justifique uma rota própria.

> **O painel de escrita não é página do site.** Virou o JVM Console, projeto próprio: as
> pílulas passam a vir dele no build (Fase 5 do `docs/ROADMAP.md`). Fica nesta tabela porque
> tinha protótipo aqui, não porque vai ter rota.

> A coluna `Arquivo` fica vazia até a página existir. Quando for implementada, recebe o caminho
> em `src/pages/` — é o que torna este documento verificável sem ler o repositório inteiro.
