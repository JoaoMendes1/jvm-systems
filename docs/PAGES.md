| # | Página | Rota | Arquivo | Status | Fase do Roadmap |
|---|---|---|---|---|---|
| 1 | Home | `/` | — | ✅ Prototipada | Fase 2 |
| 2 | Estudo de caso | `/projetos/[slug]` | — | ✅ Prototipada (só AniDeck) | Fase 2 |
| 3 | Pílulas (lista) | `/pilulas` | — | ✅ Prototipada | Fase 2 |
| 4 | Pílula | `/pilulas/[slug]` | — | ✅ Prototipada | Fase 2 |
| 5 | Sobre | `/sobre` | — | ✅ Prototipada | Fase 2 |
| 6 | Privacidade | `/privacidade` | — | ⏳ Só planejada | Fase 2 |
| 7 | Página não encontrada | 404 | — | ⏳ Só planejada | Fase 2 |
| 8 | Painel de escrita | fora do site | — | ✅ Prototipada · pós-MVP | Fase 4 |

**Total: 0 páginas implementadas.**

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
