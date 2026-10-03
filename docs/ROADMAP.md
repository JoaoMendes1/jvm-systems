# 🗺️ JVM Systems — Roadmap

> Site pessoal e portfólio em `joaomendes.dev.br`. Planejamento iniciado em 24/09/2026.
> Referência visual: `prototipos/vitrine-v4.html`.

## 🎯 Onde está o MVP

**Fases 1, 2 e 3** = MVP publicável: esqueleto no ar, páginas com conteúdo real e acabamento
mínimo para ser enviado a um recrutador. A Fase 4 em diante é incremento sobre um site já no ar.

O critério do corte: **o MVP é o que precisa existir para o link ir no currículo.**

## 📍 Status atual (03/10/2026)

| Fase | Status |
|---|---|
| 1 · Fundação e deploy | ✅ Concluída |
| 2 · Páginas e conteúdo | ✅ Concluída |
| 3 · Acabamento e publicação | ✅ Concluída — MVP entregue em 03/10/2026 |
| 4 · Reposicionamento e estudos de caso | 🚧 Em andamento |

---

## 🏗️ Fase 1: Fundação e deploy — início do MVP

> Produção sobe já nesta fase, como esqueleto — mesmo padrão dos outros projetos. Uma página
> em branco no ar prova o caminho inteiro (build, container, Caddy, certificado) antes de haver
> conteúdo que dependa dele.

- [x] Levantar requisitos e registrar decisões iniciais no `docs/DECISIONS.md`.
- [x] Documentação base: `README`, `AGENTS`, `ROADMAP`, `PAGES`, `DECISIONS`, `DESIGN_TOKENS`,
      `docs/CONTEUDO.md`.
- [x] Criar o repositório público `jvm-systems` no GitHub, com as branches `main` e `staging`.
- [x] Protótipo em `prototipos/vitrine-v4.html` — a v3 sem o que não existe (serviços, domínios,
      contagens e hospedagem inventados) e com textos simplificados. A v3 não entra no repositório.
- [x] **Verificar a versão atual do Astro e da integração MDX antes do scaffold** (regra 10 do
      `AGENTS.md`). Fixadas sem `^`: Astro 7.3.5, `@astrojs/mdx` 8.0.2, TypeScript 6.0.3. (#1)
- [x] Scaffold do Astro com MDX e TypeScript. (#1)
- [x] Content collections `projetos` e `pilulas`, com o schema do `docs/CONTEUDO.md`. (#4)
- [x] Tokens do `docs/DESIGN_TOKENS.md` em `src/styles/`, e layout base com as fontes.
- [x] CI no push para `staging`: `astro check` + `npm run build`. (#3)
- [x] `Dockerfile` em duas etapas: Node gera o `dist/`, e um Caddy interno serve na porta 8080. (#2)
- [x] Serviço `jvm-systems` no `docker-compose.yml` do `~/infra`, com `expose` (nunca `ports`). (#2)
- [x] Bloco `joaomendes.dev.br` no Caddyfile do `~/infra`, aplicado com `caddy reload` — sem
      derrubar os outros sites. (#2)
- [x] `.github/workflows/deploy.yml` no mesmo molde do AniDeck e do Grimoire, com os secrets
      `VPS_HOST`, `VPS_USER` e `VPS_SSH_KEY`. (#2)
- [x] `.dockerignore` desde o primeiro commit — pendência que os outros dois projetos ainda têm. (#2)
- [x] Esqueleto respondendo em `https://joaomendes.dev.br` com certificado válido. (#2)

## 📄 Fase 2: Páginas e conteúdo

- [x] **Home:** hero, quadro "rodando agora", grade de projetos e chamada de contato — quadro e
      grade gerados a partir de `src/content/projetos/`. (#5)
- [x] **Estudo de caso:** rota `/projetos/[slug]`, com sumário gerado a partir dos títulos. (#8)
- [x] Componentes MDX do estudo de caso: `Decisao` e `Terminal` (#8). `Callout` pronto na #7.
- [x] **Pílulas:** lista em `/pilulas` com filtro por tag e página individual em
      `/pilulas/[slug]`. Filtros derivados das tags em uso, nunca lista fixa. (#7)
- [x] **Sobre:** trajetória e ferramental, com a barra de navegação. (#6)
- [x] **Privacidade:** `/privacidade`. Cobre o site (sem cookies, sem analytics) e o app OAuth do
      Google usado pelo backup. (#9)
- [x] Página 404, servida pelo Caddy do container com status 404. (#9)
- [x] **Conteúdo mínimo para o MVP:** estudo de caso do AniDeck (#8) + a primeira pílula
      ("O free tier hiberna, e o seu estado em memória some junto") (#7).
- [x] **Preencher o que a v4 do protótipo deixou em aberto de propósito:**
  - [x] contagens do hero (serviços no ar, pílulas) → calculadas no build a partir das coleções;
        stat com valor zero não aparece; (#5)
  - [x] trecho de código do Kill Switch → copiado do `cmd/web/main.go` real; (#8)
  - [x] endereço de e-mail e link do LinkedIn → no componente `Contato`. (#5)

## ✨ Fase 3: Acabamento e publicação — fim do MVP

- [x] Metadados por página: `title`, `description`, URL canônica e imagem de Open Graph. (#10)
- [x] `sitemap.xml` e `robots.txt`. (#10)
- [x] Teste real no celular.
- [x] **Revisão de conteúdo:**
  - [x] primeira pílula: data e fatos alinhados ao comentário do `cmd/web/main.go`;
  - [x] estudo de caso do AniDeck: tirado o número que não tinha medição;
  - [x] política de privacidade: Grimoire coberto pela política do portfólio, com exclusão de
        dados pedida por e-mail;
  - [x] textos da home, do Sobre e da página de pílulas;
  - [x] descrição da home e imagem de compartilhamento (`public/og.png`).
- [x] Trocar a URL da política de privacidade no Google Cloud para
      `https://joaomendes.dev.br/privacidade`.
- [x] Link do site no GitHub, no LinkedIn e no currículo.

---

# 🏁 MVP entregue

---

## 🧭 Fase 4: Reposicionamento e estudos de caso — *pós-MVP*

> Iniciada em 03/10/2026. O site passa a abrir pelo que eu construo, e cada projeto mostra
> como funciona por dentro. Também reúne o que estou estudando.

- [x] **Textos novos** no hero, no Sobre e no contato, e a seção "Competências, com prova",
      com cada item apontando para o projeto onde está implementado. (#11)
- [ ] **Modelo de estudo de caso v2** no `docs/CONTEUDO.md`: problema, como funciona,
      integrações externas, IA no projeto, decisões, código, o que quebrou, conceitos e em
      andamento.
- [ ] Estudo de caso do AniDeck no modelo v2.
- [ ] Estudo de caso do Grimoire no modelo v2.
- [ ] Pílulas tiradas das issues: filtro no campo errado da AniList, Gemini com busca e JSON,
      RAG × SQL.
- [ ] Certificados no Sobre, com link para a credencial.
- [ ] Currículo e LinkedIn com os mesmos fatos e datas do site.

---

## 📋 Backlog / Ideias em Avaliação

> Nada aqui é compromisso de escopo.

- [ ] **Painel de escrita.** Adiado em 03/10/2026. O desenho continua decidido: o painel
      escreve arquivo, não serve o site. Antes de virar issue: autenticação, como grava no
      repositório e onde roda.
- [ ] **Quadro "rodando agora" com estado real.** Hoje é gerado no build a partir do
      `status` do arquivo. Uma versão viva exigiria checar os serviços, o que traz de volta um
      servidor. Só vale se houver pergunta real que a versão estática não responde.
- [ ] **Redirecionar `www.joaomendes.dev.br`** para o domínio sem `www`. Exige registro DNS novo.
- [ ] **Feed RSS das pílulas.** Barato no Astro; só vale se alguém for assinar.
- [ ] **Card do Lab de acessos**, quando o repositório existir.

### Avaliado e descartado (documentado pra não reabrir sem contexto)

- **Formulário de contato no MVP:** exige backend ou serviço de terceiro, proteção contra spam e
  uma linha a mais na política de privacidade. Links diretos cumprem o mesmo papel. Ver
  `docs/DECISIONS.md`.
- **Hospedagem em CDN (Cloudflare Pages, Netlify):** ver `docs/DECISIONS.md`.

---

## 🧭 Notas de manutenção deste arquivo

- Fases são numeradas cronologicamente. Dívida técnica ou requisito novo vira fase `.5`
  intermediária, inserida entre as duas fases que a originaram — nunca empilhada no final.
- Fase concluída não é apagada — vira registro histórico com os itens marcados.
- Item abandonado não é apagado — vai para "Avaliado e descartado" **com a justificativa**.
- Conteúdo novo (pílula, estudo de caso) **não é fase**: é fluxo contínuo depois do MVP.
- Decisão estrutural não mora aqui: vai para `docs/DECISIONS.md`.