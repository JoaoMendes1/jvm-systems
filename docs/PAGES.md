| # | Página | Rota | Arquivo | Status | Fase do Roadmap |
|---|---|---|---|---|---|
| 1 | Home | `/` | `src/pages/index.astro` | ✅ Implementada | Fase 2 |
| 2 | Estudo de caso | `/projetos/[slug]` | `src/pages/projetos/[slug].astro` | ✅ Implementada (AniDeck e Grimoire) | Fase 2 |
| 3 | Pílulas (lista) | `/pilulas` | `src/pages/pilulas/index.astro` | ✅ Implementada | Fase 2 |
| 4 | Pílula | `/pilulas/[slug]` | `src/pages/pilulas/[slug].astro` | ✅ Implementada | Fase 2 |
| 5 | Sobre | `/sobre` | `src/pages/sobre.astro` | ✅ Implementada | Fase 2 |
| 6 | Privacidade | `/privacidade` | `src/pages/privacidade.astro` | ✅ Implementada | Fase 2 |
| 7 | Página não encontrada | 404 | `src/pages/404.astro` | ✅ Implementada | Fase 2 |
| 8 | Painel de escrita | fora do site | — | ✅ Prototipada · pós-MVP | Fase 4 |

**Total: 7 páginas implementadas.**

> Protótipo de referência: `prototipos/vitrine-v4.html`. As telas 1 a 5 e 8 estão nele. Após a
> implementação da Fase 2, o protótipo sai do repositório.
>
> **Os textos do protótipo são provisórios.** Foram simplificados para seguir o tom do
> `docs/CONTEUDO.md`, mas o conteúdo final é escrito no porte.

> **Contato não é página.** É uma seção no fim da Home e do Sobre — com links diretos, não há o
> que justifique uma rota própria.

> **O Painel não é página do site.** Ele escreve arquivos no repositório e dispara o deploy; o
> site não sabe que ele existe. Está nesta tabela porque tem protótipo, não porque vai ter rota.

> A coluna `Arquivo` fica vazia até a página existir. Quando for implementada, recebe o caminho
> em `src/pages/` — é o que torna este documento verificável sem ler o repositório inteiro.
