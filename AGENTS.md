# AGENTS.md

> Instruções para qualquer IA (chat ou agente de código) que for trabalhar comigo neste
> repositório. Se você é uma ferramenta agentic (Claude Code, Cursor, Codex CLI, etc.), leia isso
> automaticamente antes de qualquer tarefa. Se for um chat que não lê arquivos de repositório
> sozinho, colei este conteúdo manualmente como primeira mensagem.

## Quem sou eu / como quero trabalhar

Considero-me **iniciante** na maior parte destas stacks — principalmente Go. Construo boa parte
do código com ajuda de IA, então:

- **Sempre explique o porquê**, não só o quê. Se uma escolha técnica não for óbvia, explique
  antes de implementar.
- Priorize soluções que eu consiga entender e defender numa entrevista técnica, não a mais
  "avançada" ou abstrata possível.
- Se eu pedir algo que pule uma etapa de entendimento, pode perguntar antes de simplesmente obedecer.

## Este repositório

**JVM Systems** é o site pessoal e portfólio servido em `joaomendes.dev.br`. É o hub que reúne os
projetos em produção.

- **Site estático:** Astro com MDX. Não há backend, banco de dados nem requisição de visitante
  chegando a servidor de aplicação.
- **Conteúdo é arquivo:** projetos em `src/content/projetos/`, pílulas em `src/content/pilulas/`.
  O formato é contrato, descrito em `docs/CONTEUDO.md`.
- **Estilo:** CSS puro com custom properties. Os tokens estão em `docs/DESIGN_TOKENS.md`.
- **Documentação em `docs/`,** como nos outros projetos. Na raiz ficam só este `AGENTS.md`, que
  as ferramentas de IA procuram ali, e o `README.md`, que é a porta de entrada do repositório.
- **Repositório público.** Nada de IP, nome de usuário do servidor, conteúdo de `.env`, regra de
  firewall ou porta aberta para a internet entra aqui — nem em documentação, nem em comentário.
  A porta interna do container (8080) pode aparecer: ela só existe dentro da rede do compose. A
  configuração do servidor vive no repositório privado `infra`.

**Regra de conteúdo, específica deste projeto:** o site não afirma nada que não exista.

- Serviço só aparece como "no ar" se estiver no ar.
- Projeto só ganha card se tiver repositório.
- Contagem exibida (projetos, pílulas, tempo de leitura) é calculada no build, nunca escrita à mão.

Este é um portfólio: cada frase dele pode virar pergunta numa entrevista.

## Fluxo de trabalho obrigatório

1. **Toda alteração nasce de uma Issue** no GitHub Projects, escrita **antes** de qualquer código,
   neste formato exato:

```markdown
Título: <tipo>: <descrição curta> #<número>

**🏷️ Labels:** `label1`, `label2`

### 🎯 Objetivo
[Descrição clara do problema/funcionalidade]

### 📋 Tarefas
- [ ] Passo técnico 1
- [ ] Passo técnico 2

### ✅ Critérios de Aceite
- [ ] Condição verificável de que está pronto
- [ ] Testes unitários criados (caminho feliz e cenários de erro) — obrigatório sempre que a
      issue envolver lógica (handlers, validação, cálculo); dispensável em issues de
      texto/estilo/documentação
```
> **Emenda (25/08/2026):** issue é obrigatória quando a alteração:
> - mexe em **schema, dado de usuário, autenticação ou regra de negócio**;
> - é **correção de bug**, qualquer que seja o tamanho — bug pequeno costuma ter
>   causa interessante, e é ela que some se não for escrita;
> - envolve **escolha estrutural no visual**: trocar biblioteca, alterar design
>   tokens, refazer navegação ou padrão de componente. Não pela quantidade de
>   código, mas porque existe um "por quê" que precisa ficar registrado.
>
> Dispensam issue: texto de interface, ajuste visual dentro dos tokens já
> existentes, documentação e refatoração sem mudança de comportamento. Nesses
> casos, commit direto na `staging` basta.
>
> **Na dúvida, o teste:** daqui a três meses, alguém (inclusive eu) vai perguntar
> "por que foi feito assim?". Se sim, abre issue.
>
> O critério é o rastro: issue existe para registrar investigação, decisão e como
> foi verificado. Onde não há decisão a registrar, ela é burocracia.
>
> **Neste repositório:** pílula e estudo de caso novos contam como documentação e dispensam
> issue. Mudar o **schema** do conteúdo (campo novo, tag nova, regra de exibição) exige issue —
> é o contrato que o painel futuro vai seguir.

2. **Toda alteração é feita primeiro na branch `staging`**, nunca direto em produção.

3. **Commits seguem este padrão:**
```
tipo(escopo): descrição curta (closes #NN)
```
Exemplo: `fix(ui): sanitiza dados de usuário e elimina XSS em termos/categorias (closes #46)`

### Fluxo de comandos Git (sequência completa)

```bash
# 1. Garantir que a staging local está atualizada
git checkout staging
git pull origin staging

# 2. Fazer as alterações no código
# (edição normal de arquivos)

# 3. Conferir o que mudou antes de commitar
git status
git diff

# 4. Adicionar e commitar no padrão do projeto
git add <arquivos alterados>
git commit -m "tipo(escopo): descrição curta (closes #NN)"

# 5. Subir para staging
git push origin staging

# 6. Validar antes de qualquer promoção (ver a nota abaixo)
npm run build
npm run preview

# 7. Quando validado, promover para produção
git checkout main
git pull origin main
git merge staging
git push origin main   # ← dispara a GitHub Action que publica na VPS
```

> **Não existe ambiente de homologação neste repositório, por decisão.** O site é estático: o
> `npm run preview` serve exatamente os arquivos que vão para produção. O que o preview não
> reproduz é a camada do Caddy (cabeçalhos, redirecionamentos). Ver `docs/DECISIONS.md`.
>
> **Verde na Action não garante código novo.** Ela reporta sucesso mesmo quando o `git pull` não
> trouxe nada. Antes de acusar o deploy, confira se o commit esperado está na `main` do GitHub
> e no `git log` do servidor.

**Tipos de commit usados:** `feat`, `fix`, `refactor`, `docs`, `chore` — seguido do escopo entre
parênteses (`ui`, `conteudo`, `deploy`, etc.) e sempre referenciando a issue com `closes #NN`
quando houver issue. Pílula e estudo de caso novos usam `docs(pilulas)` e `docs(projetos)`.

4. **Comentários de código** explicam o quê **e** por quê. Não referenciar número de issue
   (`#43`) dentro do código-fonte — isso fica só na issue e no commit, a menos que o contexto
   histórico seja realmente necessário para entender uma decisão não óbvia.

5. **Segurança não é uma fase separada.** Qualquer funcionalidade que lide com input de usuário,
   autenticação ou dados sensíveis já nasce com sanitização/validação — não se deixa para depois.

6. **Todo planejamento vive no `docs/ROADMAP.md`**, organizado por fases
   numeradas cronologicamente. Se uma fase revelar dívida técnica ou requisito novo, a correção
   vira uma fase intermediária (ex: Fase 3.5), inserida entre as duas fases que a originaram —
   nunca empilhada no final. O roadmap também deve marcar claramente **onde está o MVP**
   (o corte mínimo publicável) e diferenciar isso de melhorias posteriores.

6.1. **Um `docs/PAGES.md` complementa o roadmap**, rastreando status por página/tela em vez de por
   fase — colunas: nome da página, status (⏳ só planejada / ⏳ só preview / ✅ prototipada /
   implementada), e a fase do roadmap correspondente. Atualizar sempre que uma tela ganhar
   protótipo visual novo. Ao planejar telas, unificar as que não justificam página própria
   (ex: Configurações + Ajuda numa só) em vez de multiplicar páginas por padrão.

7. **CI automatizado no push para `staging`.** Um workflow do GitHub Actions roda `astro check`
   e `npm run build` a cada push nessa branch — e os testes unitários, quando existirem. O build
   é o teste mais importante deste projeto: é nele que o schema do conteúdo é validado, então
   frontmatter errado quebra o CI em vez de chegar ao site. Se quebrar, corrige antes de promover
   para `main`. Configura uma vez, roda sozinho depois.

8. **Decisões técnicas estruturais vão para `docs/DECISIONS.md`** (não no
   `docs/ROADMAP.md`, para não duplicar). Formato de cada entrada:
   `Data | Decisão | Por que escolhemos A em vez de B`. Só decisões que mudam arquitetura,
   framework, banco de dados ou fluxo de auth entram lá — não é log de todo commit.

9. **Code review pré-commit — recomendado, não obrigatório em tudo.** Para mudanças não-triviais
   (nova feature, lógica de autenticação, algo que mexe em dado sensível), colar a saída de
   `git diff` no chat antes de commitar, pra eu revisar como um code reviewer (lógica idiomática,
   segurança, legibilidade) antes do commit. Para ajustes pequenos (texto, estilo, correção
   simples), não é necessário parar o fluxo pra isso — o objetivo é ganhar prática de revisão
   real sem travar o ritmo do dia a dia.

10. **Verificação Cronológica de Dependências (Anti-Legacy):**
    Antes de propor a importação de qualquer SDK, pacote externo ou API, você deve **obrigatoriamente cruzar a sua resposta com a linha do tempo atual do projeto**.
    Não confie em dados de treinamento defasados. É terminantemente proibido introduzir pacotes obsoletos (deprecated), legados ou em End-of-Life (EOL). Se o ecossistema da ferramenta sofreu unificações ou mudanças estruturais recentes, exija e utilize a versão moderna e oficial. Se não tiver certeza absoluta do pacote atual, avise ou faça uma pesquisa antes de gerar o código.

11. **Armadilhas conhecidas.** Este repositório ainda **não tem** `docs/PITFALLS.md`: ele nasce
    no primeiro bug silencioso que chegar a produção (o que não quebra, só entrega errado), no
    mesmo formato do AniDeck — sintoma real, causa e pergunta obrigatória. Até lá, as armadilhas
    já conhecidas de conteúdo estão em `docs/CONTEUDO.md`, na seção de armadilhas. Se a tarefa
    toca a área de uma delas, responda a pergunta dela explicitamente na resposta, com o arquivo
    real na mão — não de memória.

12. **Suspeita não é achado.** Não aponte problema sem o arquivo na mão. Levantar cinco
    hipóteses de uma vez transfere para mim o trabalho de verificar todas. Peça o arquivo, ou o
    `grep` que localiza os pontos de uso, e só então conclua.

13. **Edição por trecho (Ctrl+F).** Ao pedir alteração num arquivo que já existe:
    - informar o arquivo e se o passo é no **editor** ou no **terminal**;
    - mostrar o **trecho atual completo**, copiado do arquivo, para eu localizar com Ctrl+F —
      nunca número de linha, e nunca um fragmento que apareça mais de uma vez no arquivo;
    - em seguida, mostrar o **trecho novo completo**, que substitui o anterior;
    - se for inserção, dizer se o trecho novo entra **antes** ou **depois** do trecho localizado.

    Se o Ctrl+F não encontrar o trecho, **pare**: o arquivo não está no estado que a instrução
    supõe. Número de linha muda a cada edição anterior; o trecho completo, além de localizar,
    prova que quem escreveu a instrução estava olhando o arquivo atual e não a memória dele.

## Tom da conversa

Prefiro uma conversa natural com a IA, não uma troca robotizada de comandos. Pode explicar,
sugerir, discordar ou perguntar — o fluxo abaixo é sobre *processo* (como o código chega no
repositório), não sobre como a conversa deve soar.

## Convenções de nomenclatura do meu portfólio

Meus projetos vivem sob o hub **"JVM Systems — Portfolio Dev"**, que reúne todos os meus
projetos em produção como "módulos". **Este repositório é o próprio hub.** Ao criar um projeto
novo destinado a ele, use nome provisório claro (ex: "NomeDoProjeto (nome provisório)") até eu
confirmar o nome definitivo — e o projeto só entra no site pelo arquivo em
`src/content/projetos/`, seguindo as regras de exibição do `docs/CONTEUDO.md`.
