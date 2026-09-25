# 🗺️ JVM Systems — Roadmap

> Site pessoal e portfólio em `joaomendes.dev.br`. Planejamento iniciado em 24/09/2026.
> Referência visual: `prototipos/vitrine-v4.html`.

## 🎯 Onde está o MVP

**Fases 1, 2 e 3** = MVP publicável: esqueleto no ar, páginas com conteúdo real e acabamento
mínimo para ser enviado a um recrutador. A Fase 4 em diante é incremento sobre um site já no ar.

O critério do corte: **o MVP é o que precisa existir para o link ir no currículo.** O painel de
escrita não precisa — publicar por commit funciona.

## 📍 Status atual (24/09/2026)

| Fase | Status |
|---|---|
| 1 · Fundação e deploy | 🔄 Em andamento — documentação escrita |
| 2 · Páginas e conteúdo | ⏳ Planejada |
| 3 · Acabamento e publicação | ⏳ Planejada |
| 4 · Painel de escrita | 💭 Pós-MVP |

---

## 🏗️ Fase 1: Fundação e deploy — início do MVP

> Produção sobe já nesta fase, como esqueleto — mesmo padrão dos outros projetos. Uma página
> em branco no ar prova o caminho inteiro (build, container, Caddy, certificado) antes de haver
> conteúdo que dependa dele.

- [x] Levantar requisitos e registrar decisões iniciais no `docs/DECISIONS.md`.
- [x] Documentação base: `README`, `AGENTS`, `ROADMAP`, `PAGES`, `DECISIONS`, `DESIGN_TOKENS`,
      `docs/CONTEUDO.md`.
- [ ] Criar o repositório público `jvm-systems` no GitHub, com as branches `main` e `staging`.
- [x] Protótipo em `prototipos/vitrine-v4.html` — a v3 sem o que não existe (serviços, domínios,
      contagens e hospedagem inventados) e com textos simplificados. A v3 não entra no repositório.
- [ ] **Verificar a versão atual do Astro e da integração MDX antes do scaffold** (regra 10 do
      `AGENTS.md`). Fixar versões no `package.json`.
- [ ] Scaffold do Astro com MDX e TypeScript.
- [ ] Content collections `projetos` e `pilulas`, com o schema do `docs/CONTEUDO.md`.
- [ ] Tokens do `docs/DESIGN_TOKENS.md` em `src/styles/`, e layout base com as fontes.
- [ ] CI no push para `staging`: `astro check` + `npm run build`.
- [ ] `Dockerfile` em duas etapas: Node gera o `dist/`, e um Caddy interno serve na porta 8080.
- [ ] Serviço `jvm-systems` no `docker-compose.yml` do `~/infra`, com `expose` (nunca `ports`).
- [ ] Bloco `joaomendes.dev.br` no Caddyfile do `~/infra` + `docker compose restart caddy`.
- [ ] `.github/workflows/deploy.yml` no mesmo molde do AniDeck e do Grimoire, com os secrets
      `VPS_HOST`, `VPS_USER` e `VPS_SSH_KEY`.
- [ ] `.dockerignore` desde o primeiro commit — pendência que os outros dois projetos ainda têm.
- [ ] Esqueleto respondendo em `https://joaomendes.dev.br` com certificado válido.

## 📄 Fase 2: Páginas e conteúdo

- [ ] **Home:** hero, quadro "rodando agora", grade de projetos e chamada de contato — quadro e
      grade gerados a partir de `src/content/projetos/`.
- [ ] **Estudo de caso:** rota `/projetos/[slug]`, com sumário gerado a partir dos títulos.
- [ ] Componentes MDX do estudo de caso: `Decisao`, `Terminal` e `Callout`.
- [ ] **Pílulas:** lista em `/pilulas` com filtro por tag e página individual em
      `/pilulas/[slug]`. Filtros derivados das tags em uso, nunca lista fixa.
- [ ] **Sobre:** trajetória e ferramental.
- [ ] **Privacidade:** `/privacidade`. Cobre o site (sem cookies, sem analytics) e o app OAuth do
      Google usado pelo backup, que hoje aponta a política para o Grimoire.
- [ ] Página 404.
- [ ] **Conteúdo mínimo para o MVP:** estudo de caso do AniDeck + a primeira pílula
      ("O free tier hiberna, e o seu estado em memória some junto", já escrita no protótipo).
- [ ] **Preencher o que a v4 do protótipo deixou em aberto de propósito.** Conferir antes de dar
      a fase por encerrada:
  - [ ] contagens do hero (serviços no ar, pílulas) → calculadas no build a partir das coleções;
  - [ ] data de entrada em produção do AniDeck → campo `desde` do arquivo do projeto;
  - [ ] trecho de código do Kill Switch → copiado do `cmd/web/main.go` real;
  - [ ] endereço de e-mail e link do LinkedIn → hoje marcadores (`EMAIL_DE_CONTATO`, `#LINKEDIN`);
  - [ ] texto do estudo de caso → cada afirmação técnica conferida contra o repositório do
        AniDeck;
  - [ ] todo texto do site revisado pela seção "Tom e posicionamento" do `docs/CONTEUDO.md`.

## ✨ Fase 3: Acabamento e publicação — fim do MVP

- [ ] Metadados por página: `title`, `description`, URL canônica e imagem de Open Graph.
- [ ] `sitemap.xml` e `robots.txt`.
- [ ] Teste real no celular, no mesmo espírito da Fase 3 do AniDeck.
- [ ] Acessibilidade: navegação por teclado, contraste, `prefers-reduced-motion` respeitado em
      toda animação.
- [ ] Trocar a URL da política de privacidade no Google Cloud para
      `https://joaomendes.dev.br/privacidade`.
- [ ] Link do site no GitHub, no LinkedIn e no currículo.

---

# 🏁 MVP entregue

---

## ✍️ Fase 4: Painel de escrita — *pós-MVP*

> Protótipo na aba "Painel" do `prototipos/vitrine-v4.html`.

O desenho já está decidido: **o painel escreve arquivo, não serve o site.** Ele grava o `.mdx`
no repositório e o deploy normal faz o resto. Se o painel cair, o site continua no ar.

O que falta decidir antes de virar issue:

- [ ] Autenticação do painel — é o único ponto do projeto com login.
- [ ] Como o painel grava no repositório: API do GitHub com token restrito a este repositório,
      ou commit a partir da própria VPS.
- [ ] Onde o painel roda e se ele é um projeto separado.

---

## 📋 Backlog / Ideias em Avaliação

> Nada aqui é compromisso de escopo.

- [ ] **Quadro "rodando agora" com estado real.** Hoje é gerado no build a partir do
      `status` do arquivo. Uma versão viva exigiria checar os serviços, o que traz de volta um
      servidor. Só vale se houver pergunta real que a versão estática não responde.
- [ ] **Redirecionar `www.joaomendes.dev.br`** para o domínio sem `www`. Exige registro DNS novo.
- [ ] **Feed RSS das pílulas.** Barato no Astro; só vale se alguém for assinar.
- [ ] **Estudo de caso do Grimoire.**
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
