# AGENTS.md

> Regras para quem trabalha neste repositório, pessoa ou IA. Ferramentas de IA (Claude Code,
> Cursor, Codex CLI etc.) leem este arquivo antes de qualquer tarefa.

## Este repositório

**JVM Systems** é o site pessoal e portfólio servido em `joaomendes.dev.br`: reúne os
projetos publicados, cada um com estudo de caso, e as pílulas.

- **Endereço:** `https://joaomendes.dev.br`
- **Stack:** Astro 7 com MDX e TypeScript · CSS puro com custom properties · arquivos
  estáticos servidos por um Caddy interno, em container. Sem backend e sem banco.
- **Documentação em `docs/`.** Na raiz ficam só este `AGENTS.md`, que as ferramentas de IA
  procuram ali, e o `README.md`, a porta de entrada do repositório.
- **Repositório público.** Nada de IP, nome de usuário do servidor, conteúdo de `.env`, regra
  de firewall ou porta aberta para a internet entra aqui, nem em documentação, nem em
  comentário. A porta interna do container (8080) pode aparecer: só existe na rede do compose.
- **A infraestrutura do servidor é mantida no repositório privado `infra`:** compose de
  produção e proxy. DNS e backup também ficam fora daqui. Quando uma mudança exigir algo no
  servidor, indique o que precisa mudar lá.

## Regras deste projeto

Valem só aqui. Cada uma com o motivo, para não ser quebrada sem saber o custo.

- **O site não afirma nada que não exista.** Serviço só aparece como "no ar" se estiver no
  ar; projeto só ganha card se tiver repositório; contagem exibida é calculada no build, nunca
  escrita à mão. Num portfólio, cada frase pode virar pergunta de entrevista.
- **Estudo de caso acompanha o repositório do projeto.** Antes de escrever ou mudar um,
  confira o código e os documentos daquele repositório.
- **Conteúdo é arquivo, e o formato é contrato.** Projetos e pílulas são `.mdx` em
  `src/content/`, validados pelo schema de `src/content.config.ts` e explicados no
  `docs/CONTEUDO.md`. Se o código e o documento divergirem, vale o código.
- **Sem ambiente de homologação:** `npm run build` e `npm run preview` servem os mesmos
  arquivos de produção. O preview não reproduz o Caddy (cabeçalhos, redirecionamentos):
  mudança no `docker/Caddyfile` é validada direto em produção.
- **O build é o teste principal.** O CI roda `astro check` e `npm run build` a cada push na
  `staging`: é ali que o frontmatter de cada arquivo é validado.
- **As armadilhas ficam no `docs/CONTEUDO.md`,** porque todas as que existem são de conteúdo.
  O `docs/PITFALLS.md` nasce na primeira falha silenciosa de código.
- **Sem `@types/node`:** nenhum `node:fs` nem outra API do Node em arquivo checado pelo
  `astro check`.
- **O build precisa de internet:** as fontes vêm pela Fonts API do Astro e são baixadas no
  build.
- **Texto com `: ` no frontmatter vai entre aspas:** o YAML lê o resto como campo novo e o
  build quebra.
- **O aviso `MODULE_LEVEL_DIRECTIVE` no build é esperado:** vem do Rolldown, sobre uma
  marcação interna do Astro nos `.mdx`, e não indica erro.
- **Protótipos publicados ficam em `public/prototipos/<projeto>/`,** com `noindex`, aviso de
  dados fictícios e sem fonte externa.
- **O site não manda cabeçalho de CSP** (conferido em 10/10/2026).
- **Projeto novo no portfólio** usa nome provisório claro ("Nome (nome provisório)") até o
  nome definitivo, e entra no site só pelo arquivo em `src/content/projetos/`.

## Lições de outros projetos que valem aqui

- **No servidor, nenhum container publica porta com `ports`.** O proxy alcança o container
  pela rede interna (`expose`); porta publicada fica aberta mesmo sem regra no firewall.
- **Fim de linha LF em todos os arquivos**, pelo `.gitattributes`. `Dockerfile` ou
  `Caddyfile` com CRLF quebra no container Linux com um erro que não aponta a causa.
- **Texto de fora nunca vira HTML sem sanitização.** HTML permitido só por lista fechada, com
  biblioteca de sanitização, nunca com regex própria. Vale para as pílulas que virão do
  JVM Console.
- **Segredo fica fora do build público.** O token que o build usar para falar com o
  JVM Console é secret do repositório, nunca variável embutida no site.

## Fluxo de trabalho obrigatório

1. **Toda alteração com decisão nasce de uma issue**, escrita antes do código, por um dos
   modelos em `.github/ISSUE_TEMPLATE/`: **Funcionalidade** ou **Bug**. A issue é
   obrigatória quando a alteração:
   - muda o schema de um jeito que pode quebrar ou mudar conteúdo já escrito: campo
     obrigatório novo, campo ou tag renomeados ou removidos, regra de exibição;
   - corrige bug, de qualquer tamanho: a causa é o que mais ensina, e some se não for escrita;
   - envolve escolha estrutural: biblioteca nova, design tokens, navegação, padrão de
     componente;
   - muda como o site é construído ou publicado: `Dockerfile`, `docker/Caddyfile`, CI, deploy.

   Dispensam issue: pílula, estudo de caso, tag nova (é aditiva e não quebra nenhum arquivo),
   texto de interface, ajuste visual dentro dos tokens, documentação, configuração do
   repositório, refatoração sem mudança de comportamento e atualização de dependência sem
   mudança de código (`chore(deps)`). Na dúvida: daqui a três meses, alguém vai perguntar
   "por que foi feito assim?"? Se sim, abre issue.

2. **Toda alteração entra primeiro na branch `staging`**, nunca direto na `main`. A `main` é
   a versão publicada: o push nela dispara o deploy. Só se promove com o CI verde.

3. **Commits:** `tipo(escopo): descrição curta (closes #NN)`. Tipos: `feat`, `fix`,
   `refactor`, `docs`, `chore`. Escopos usados aqui: `ui`, `pilulas`, `projetos`, `infra` e
   `deps`. Pílula e estudo de caso novos usam `docs(pilulas)` e `docs(projetos)`. O
   `closes #NN` só fecha a issue quando o commit chega à `main`.

**Labels:** catálogo do `modelo-projeto`, nome em inglês e descrição em português. Toda issue
recebe um tipo e uma ou mais áreas. Os modelos de issue aplicam `feature` e `bug` pelo nome
exato: renomear uma delas faz o modelo deixar de aplicá-la, sem erro.

| Grupo | Labels |
|---|---|
| Tipo | `feature`, `enhancement`, `bug`, `security`, `refactor`, `documentation`, `chore`, `decision` |
| Área | `backend`, `frontend`, `database`, `auth`, `infra`, `integration`, `ai`, `mobile`, `ui/ux` |

**Quadro** (GitHub Projects): **Todo → In Progress → Staging Done → Done**.

- A issue nova entra sozinha em Todo, pelo auto-add; a fechada vai sozinha para Done.
- A passagem para Staging Done é manual: o `closes` só age na `main`.
- Nunca arraste um cartão para Done à mão: isso fecha a issue antes de o código chegar à
  `main`.

```bash
# 1. Staging local atualizada
git checkout staging
git pull origin staging

# 2. Conferir o site como vai para produção
npm run build && npm run preview

# 3. Preparar e conferir, numa passada só, o que vai entrar no commit
git add -A && git status && git --no-pager diff --cached -M

# 4. Commitar e subir para a staging (dispara o CI)
git commit -m "tipo(escopo): descrição curta (closes #NN)"
git push origin staging

# 5. Com o CI verde: promover (dispara o deploy) e voltar à staging
git checkout main
git pull origin main
git merge staging --no-edit
git push origin main
git checkout staging
```

- `--no-edit` evita que o merge abra o Vim.
- **Revert sempre pelo código do commit** (`git revert a1b2c3d`), nunca por `HEAD`.
- **Action verde não garante código novo.** Antes de acusar o deploy, confira o commit na
  `main` do GitHub e no `git log --oneline -3` do servidor.
- **Em mais de uma máquina:** push antes de sair de uma, pull antes de começar na outra.

## Regras de código

Prefira a solução simples e defensável à mais abstrata: todo código daqui precisa poder ser
explicado, linha por linha, por quem o mantém.

4. **Comentários explicam o quê e o porquê**, em tom formal e impessoal, numa linha sempre
   que possível, e só onde o porquê não é óbvio. Número de issue não entra no código.

5. **Segurança não é uma fase separada.** Texto vindo de fora e dado sensível já nascem com
   sanitização e validação.

6. **Verificação de dependências.** Antes de propor pacote, integração do Astro ou versão de
   Action, confira se é a versão atual e mantida. Pacote obsoleto ou em fim de vida não
   entra. Sem certeza, pesquise antes de gerar o código.

7. **Suspeita não é achado.** Não aponte problema sem o arquivo na mão. Peça o arquivo, ou o
   `grep` que localiza os pontos de uso, e só então conclua.

8. **Revisão antes do commit** em mudança não trivial (feature nova, schema, regra de
   exibição): a saída de `git diff --cached` é lida antes do commit.

## Regras de documentação

9. **Um fato, um lugar.** Nada é copiado de um documento para outro; um aponta para o outro.

   | Arquivo | O que mora nele |
   |---|---|
   | `docs/ROADMAP.md` | Escopo: fases, MVP, backlog. A cada entrega, no mesmo push: itens marcados com `[x]` e a issue, e a tabela de status |
   | `docs/DECISIONS.md` | Decisões estruturais, com o porquê e o custo aceito. Não é log de commit |
   | `docs/CONTEUDO.md` | Contrato do conteúdo, tom dos textos e armadilhas conhecidas |
   | `docs/DESIGN_TOKENS.md` | Cores, tipografia e padrões de componente |
   | `docs/PAGES.md` | Estado de cada página. Página implementada recebe o caminho em `src/pages/` |

10. **Fase nova não vai para o fim da fila.** Dívida ou requisito descoberto no caminho vira
    fase intermediária (ex.: 3.5), entre as duas que a originaram. Conteúdo novo (pílula,
    estudo de caso) não é fase: é fluxo contínuo.

11. **Armadilha conhecida tem pergunta obrigatória.** Tarefa que toca a área de uma armadilha
    do `docs/CONTEUDO.md` responde a pergunta dela, com o arquivo real na mão.
