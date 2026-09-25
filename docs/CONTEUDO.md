# 📝 CONTEUDO.md — contrato dos arquivos de conteúdo

> Todo conteúdo do site é arquivo `.mdx` em `src/content/`. Este documento descreve o formato.
>
> **O schema em código é a fonte de verdade.** Ele fica no arquivo de configuração das content
> collections do Astro e é validado a cada build. Este documento explica o schema e o porquê de
> cada regra. Se os dois divergirem, o código vale e este documento é corrigido.
>
> **Por que isto é um contrato e não só um guia:** na Fase 4, um painel vai escrever estes
> arquivos sozinho. Ele só pode gravar o que passa neste schema.

---

## Tom e posicionamento

> Vale para todo texto do site: home, sobre, estudos de caso e pílulas. Registrado em 24/09/2026,
> depois que os textos do primeiro protótipo saíram exagerados.

### Quem escreve, em fatos

- Cinco anos em **suporte e gestão de acesso** (Active Directory, perfis, VPN, MFA).
- Programa há anos, **mas sem constância**. Agora está se dedicando de verdade.
- Procura vaga de **desenvolvedor júnior**.
- Constrói **com ajuda de IA** e registra o porquê das decisões em cada repositório.
- Mantém os próprios projetos no ar, numa VPS configurada por ele.

O texto parte daqui. Não aumenta nada disso, e também não precisa diminuir.

### Regras

- **Verbo concreto no lugar de adjetivo.** "Configurei o deploy automático", não "infraestrutura
  robusta".
- **Nenhum número que não se possa conferir.** Se alguém perguntar "como você mediu isso?", a
  resposta tem que existir.
- **O uso de IA é dito abertamente.** Esconder vira problema na primeira pergunta técnica de
  detalhe; dizer, junto com "e sei explicar cada escolha", é uma posição forte.
- **Frase simples.** Sem aforismo e sem frase de efeito. Se a frase soa bem mas não diz nada
  verificável, sai.
- **Escrever como se fala numa entrevista.** Se você não diria aquilo em voz alta para quem está
  te avaliando, não escreva.

### O que não repetir

Trechos da v3 do protótipo, reescritos na v4:

| Trecho | Problema |
|---|---|
| "5 anos operando sistemas críticos" | Foram 5 anos gerenciando **acesso** a sistemas críticos, não operando os sistemas |
| "me ensinaram como sistemas quebram em produção" | Suporte mostra como o usuário sente a quebra, não por que ela acontece |
| "antes de escrever software" | Inverte a história: a programação veio antes, só que sem constância |
| "continuo de plantão depois que sobem" | "Plantão" sugere on-call de verdade |
| "escrita e operada por mim, de ponta a ponta" | Verdade, mas omite a IA — e a pergunta vem |

> **Pergunta obrigatória:** eu defenderia esta frase numa entrevista, com um exemplo concreto do
> que fiz? Se não, ela sai ou fica mais simples.

---

## Regras que valem para os dois tipos

### O nome do arquivo é a URL, e não muda depois de publicado

`src/content/pilulas/free-tier-hiberna.mdx` vira `/pilulas/free-tier-hiberna`.

- Minúsculas, sem acento, palavras separadas por hífen.
- **Depois de publicado, não se renomeia.** O link já pode ter sido compartilhado, e renomear o
  quebra sem aviso.
- Se for inevitável, o nome antigo ganha um redirecionamento na configuração do Astro no mesmo
  commit.

### `rascunho: true` tira o arquivo do site

O arquivo continua no repositório e não aparece em lugar nenhum: nem página, nem lista, nem
contagem. Serve para começar um texto ou um projeto antes de ele estar pronto.

> **Repositório público:** rascunho não é segredo. Qualquer pessoa lê o arquivo no GitHub. Ele
> só não aparece no site.

### Número exibido é calculado, nunca escrito

Contagem de projetos no ar, total de pílulas e tempo de leitura saem dos arquivos no build. Não
existe campo no frontmatter para nenhum deles.

---

## Projetos — `src/content/projetos/<slug>.mdx`

```yaml
---
nome: Nome do Projeto
resumo: Uma ou duas frases sobre o problema real, não sobre a stack.
status: no-ar                 # no-ar | em-construcao
url: https://projeto.joaomendes.dev.br
repo: https://github.com/JoaoMendes1/projeto
stack: [Go, chi, PostgreSQL]  # o primeiro item é o principal e ganha destaque
papel: autor solo
desde: 2026-07-01             # data em que entrou no ar — ver armadilha de data
visual: laranja               # laranja | verde | violeta | neutro
ordem: 1                      # menor aparece primeiro
rascunho: false
---
```

| Campo | Obrigatório | Regra |
|---|---|---|
| `nome` | sim | — |
| `resumo` | sim | até 220 caracteres |
| `status` | sim | `no-ar` ou `em-construcao` |
| `url` | não | `https://`; sem ele, o projeto não entra no quadro |
| `repo` | não | `https://`; sem ele, o projeto não ganha card |
| `stack` | sim | ao menos um item |
| `papel` | não | — |
| `desde` | não | data no formato `AAAA-MM-DD` |
| `visual` | não | padrão `neutro` |
| `ordem` | sim | inteiro |
| `rascunho` | não | padrão `false` |

### Onde o projeto aparece

| Lugar | Condição |
|---|---|
| Card na grade de projetos | não é rascunho **e** tem `repo` |
| Quadro "rodando agora" | tem card **e** `status: no-ar` **e** `url` |
| Página de estudo de caso | tem card **e** o corpo do arquivo não está vazio |
| Contador de serviços no ar | contagem do quadro, calculada |

**Por que o `repo` é a porta de entrada:** "em construção" é honesto quando há código para
mostrar. Sem repositório, o card seria uma promessa — e a regra de conteúdo do `AGENTS.md` é que
o site não afirma nada que não exista.

**Projeto futuro:** pode nascer como arquivo com `rascunho: true` e ir amadurecendo ali. Ele
aparece no site sozinho no dia em que ganhar `repo` e deixar de ser rascunho — nenhum componente
precisa mudar.

### Corpo do estudo de caso

Sugestão de estrutura, a do protótipo:

1. **Contexto** — o problema, em termos de quem usa.
2. **Arquitetura** — decisões, cada uma com o componente `Decisao`.
3. **Código** — um trecho que valha ler, com o componente `Terminal`, **copiado do arquivo real**.
4. **Produção** — o que quebrou, em tabela sintoma × causa e correção.
5. **Retrospectiva** — o que faria diferente.

O sumário lateral é gerado a partir dos títulos `##`. Não se escreve à mão.

### Componentes disponíveis no MDX

*Planejados para a Fase 2. O nome das props é definitivo; o visual está no `docs/DESIGN_TOKENS.md`.*

~~~mdx
<Decisao
  titulo="Validar JWT por JWKS, não por segredo compartilhado"
  contexto="..."
  escolhi="..."
  descartei="..."
  custo="..."
/>

<Terminal arquivo="cmd/web/main.go">
```go
// trecho copiado do arquivo real
```
</Terminal>

<Callout>A lição geral, em uma ou duas frases.</Callout>
~~~

---

## Pílulas — `src/content/pilulas/<slug>.mdx`

```yaml
---
titulo: O free tier hiberna, e o seu estado em memória some junto
resumo: Uma flag que só existia em memória voltava ao padrão a cada hibernação.
data: 2026-09-18              # dia em que foi escrita
tags: [infra]                 # a primeira é a principal
projeto: anideck              # opcional: slug de um arquivo em projetos/
atualizado: 2026-10-02        # opcional: só quando houve correção
rascunho: false
---
```

| Campo | Obrigatório | Regra |
|---|---|---|
| `titulo` | sim | — |
| `resumo` | sim | até 180 caracteres |
| `data` | sim | `AAAA-MM-DD` |
| `tags` | sim | ao menos uma, do vocabulário abaixo |
| `projeto` | não | precisa existir em `src/content/projetos/` — o build recusa slug inexistente |
| `atualizado` | não | `AAAA-MM-DD`, posterior a `data` |
| `rascunho` | não | padrão `false` |

### Vocabulário de tags

`infra` · `go` · `banco` · `deploy` · `frontend` · `seguranca`

- **É uma lista fechada, definida no schema.** Tag digitada errado quebra o build em vez de criar
  uma categoria nova com uma pílula só.
- **Os filtros da página de pílulas são derivados das tags em uso.** Tag do vocabulário sem
  nenhuma pílula publicada não vira botão.
- **Tag nova** é uma linha no schema e uma linha aqui, no mesmo commit — e, como muda o
  contrato, pede issue.

### "Escrito no dia em que resolvi"

É a promessa da página de pílulas, e ela tem uma consequência prática:

- `data` é o dia em que a pílula foi escrita e **não muda**.
- Correção posterior preenche `atualizado` e deixa uma nota no próprio texto dizendo o que mudou.
  Reescrever em silêncio para parecer que eu já sabia é exatamente o que a página diz que não faz.

---

## ⚠️ Armadilhas conhecidas

### Data sem hora aparece um dia antes no Brasil

O YAML lê `data: 2026-09-18` como meia-noite **em UTC**. Formatar essa data no fuso de
São Paulo (UTC−3) devolve **17 de setembro**.

O que torna isso traiçoeiro: o build roda em dois lugares com fusos diferentes.

- No notebook, em UTC−3, o `npm run preview` mostra **17 set**.
- Na VPS, onde o container roda em UTC, produção mostra **18 set**.

O site local e o publicado discordam, e nenhum dos dois dá erro. É o mesmo tipo de falha do item 3
do `PITFALLS.md` do AniDeck.

**Regra:** toda data de conteúdo é formatada por **uma única função**, que passa
`timeZone: 'UTC'` explicitamente. Nunca chamar `toLocaleDateString` direto num componente.

> **Pergunta obrigatória:** esta data vem do frontmatter? Ela está sendo formatada pela função
> única, com `timeZone: 'UTC'`?

### Trecho de código publicado que não é o código real

O estudo de caso mostra código para ser lido por quem avalia o autor. Trecho simplificado para
caber na página pode passar a fazer outra coisa — e quem lê não tem como saber que foi
simplificado.

**Regra:** o trecho do componente `Terminal` é copiado do arquivo real, no commit em que a
página é escrita. Se precisar encurtar, corte linhas inteiras e marque o corte com um comentário
(`// ...`). Nunca reescreva a lógica.

> **Pergunta obrigatória:** este trecho foi copiado do arquivo do repositório do projeto, ou
> escrito de memória?

---

## Imagens

- Ficam em `src/assets/`, para o Astro otimizar no build.
- `alt` é obrigatório e descreve o que a imagem mostra, não o que ela é ("gráfico de quadrantes
  do Meu Gosto", não "imagem").
- Não usar imagem hospedada em outro domínio: se ela sumir, some do site sem aviso.
