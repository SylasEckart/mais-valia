# CLAUDE.md

Mais-valia: extensão do Chrome que troca preços em reais, nas páginas, por quanto tempo de trabalho eles custam. Projeto existente (2020), adotado ao fluxo de spec-driven development em 2026-11-18 ([ADR 0001](docs/adr/0001-adocao-do-fluxo-e-decisoes-herdadas.md)). Os docs descrevem o que **é**: leia `docs/proposta.md`, `docs/requisitos.md` e `docs/arquitetura.md` antes de mexer.

## Fluxo de trabalho

```
/plano  →  /spec RFxx  →  /implementar <tarefa>  →  /revisar
tarefas    critérios      testes + código           antes do PR/merge
```

Regras:

1. **Sem código sem requisito.** Toda mudança de comportamento aponta para um RF/RNF em `docs/requisitos.md`. Se não existe, proponha o requisito antes.
2. **Sem implementação sem critérios de aceite.** Antes de implementar um RF, ele precisa de spec em `docs/specs/` com critérios (CA1, CA2...). **RF legado** (coluna Spec `— (legado)`): ao tocá-lo, `/spec` primeiro e, antes de mudar o código, **testes de caracterização** que fixam o comportamento atual (veja "Legado").
3. **Cada critério de aceite vira teste.** O nome do teste cita o RF e o CA (`RF01 CA2: converte "R$ 1,5 mil" em minutos`).
4. **Decisão técnica que alguém poderia questionar vira ADR** em `docs/adr/` (modelo em `_modelo.md`, skill `/adr`). Mudança de manifesto (MV2 para MV3), de permissões, de biblioteca central ou de onde os dados do usuário ficam sempre conta.
5. **Docs andam com o código.** Ao terminar uma tarefa, atualize o status no `requisitos.md`, marque o `roadmap.md` e ajuste `arquitetura.md`/`modelo-de-dados.md` se mudaram.
6. **Dúvida de produto não se resolve sozinho:** pergunte, ou registre em "Questões em aberto" no roadmap.

## Mapa do repositório

| Caminho | Conteúdo |
|---|---|
| `docs/` | Proposta, requisitos, specs, arquitetura, modelo de dados, ADRs, roadmap |
| `extension/` | A extensão (o que se carrega no Chrome): `manifest.json`, `background.js`, `js/` (scripts de página, popup e opções), `src/modules.js` (lógica de conversão, hoje sem uso pela extensão), `css/`, `img/` |
| `unit-test/` | Testes (Jest, `npm test`), com `package.json` próprio |
| `.claude/skills/` | `/plano`, `/spec`, `/implementar`, `/revisar`, `/adr`, `/passagem-de-sessao` |

## Comandos

```bash
cd unit-test && npm install && npm test   # verificação (hoje VERMELHA: o require de extension/src/modules.js quebra; é a tarefa 1 do roadmap)
```

- **Rodar a extensão:** `chrome://extensions` → modo desenvolvedor → *Load unpacked* → pasta `extension/`. Depois de editar, recarregue a extensão e a página de teste.
- Não existe build, lint, formatador, CI nem hooks. Não invente comandos: se o passo de verificação pede algo que não existe aqui, diga "não se aplica".
- Antes de dizer que algo está pronto, rode o teste e **carregue a extensão no Chrome** para ver o comportamento (teste verde não prova que o manifesto carrega os arquivos certos). Informe o resultado real.

## Convenções

- JavaScript puro, sem bundler e sem TypeScript. Código novo em inglês (nomes, comentários); docs e mensagens ao usuário em português.
- Lógica pura (conversão de valores, sufixos, unidades de tempo) fica em módulo sem acesso a `window`, `document` nem `chrome`, recebendo os dados (salário, horas) como parâmetro, para ser testada no Jest sem navegador. A API `chrome.*` e o DOM ficam só nos pontos de entrada (`background.js`, `js/options.js`, `js/content.js`).
- Não acrescente dependências. O jQuery 3.2.1 slim é legado: não o use em código novo.
- Dados do usuário (salário, horas) são pessoais: não saem do navegador, não vão para log (`console.log` de `localStorage` é defeito conhecido) nem para exemplo; use valores fictícios nos testes.
- Permissões do manifesto são o mínimo necessário; permissão nova exige requisito e ADR.
- Artefatos gerados (`unit-test/node_modules`) ficam fora do git.
- Commits só quando pedido. Mensagens citam os RFs: `feat(RF01): converte valores com sufixo`; sem requisito, `fix(sem-RF): ...`.

## Branches e commits

- `master` é a linha principal (a adoção foi feita na branch `docs/adocao-fluxo-ia`). **Uma branch por tarefa do roadmap**, a partir da `master`: `feature/<RF ou área>-<slug>`, `fix/<slug>` ou `docs/<slug>`.
- **Todo commit tem corpo:** o que mudou e por quê; quais CAs ganharam teste; como foi verificado (comandos e resultado real, inclusive o teste manual no Chrome); o que ficou de fora; quais docs mudaram.
- **Commits pequenos, um assunto cada** (como referência, até 5 arquivos). Docs de planejamento (spec, plano, ADR) e implementação vão em commits separados. Stage por caminho, nunca `git add -A` às cegas.
- O merge na `master` é do usuário.

## Legado

O código de 2020 não é padrão a copiar. Antes de tocar numa área, leia os achados do `docs/roadmap.md` (Fase 0) e do ADR 0001. Em especial:

- `extension/src/modules.js` ainda não é usado pela extensão; `js/content.js` repete a lógica dele. Não aumente a duplicação: a tarefa de unificação do roadmap decide qual fica.
- `extension/manifest.json` aponta para arquivos que não existem (`js/modules.js`, `js/modulesTest.js`).
- `js/index.js` e `background.js` têm fluxos que não fecham (popup com `default_popup` e `onClicked`).
- Mudar comportamento legado: `/spec`, testes de caracterização, só então o código.

## Modelo por tarefa do agente

- **Modelo intermediário (Sonnet)** para busca, leitura, edição seguindo padrão existente, testes de CA claro e docs. **Modelo grande (Opus)** para decisão de arquitetura (MV3, permissões, onde guardar dados) e depuração difícil.
- **A sessão que orquestra roda no modelo intermediário, com contexto curto.** O modelo grande entra como subagente revisor que recebe só o diff e a spec.
- **Haiku** só depois de comparar a saída dele com a do Sonnet na mesma tarefa.
- O resumo da tarefa registra quem implementou, quem revisou e o que a revisão corrigiu.

## Janela de uso

Plano do usuário: **1 milhão de tokens a cada 5 horas**. O agente não tem medidor: planeja pela média de custo das tarefas (a medir nas primeiras janelas, seção "Janela de uso" do `docs/roadmap.md`) e pergunta quanto da janela já foi quando precisar decidir. Economize sem cortar a revisão: dê a cada subagente o mínimo de contexto, rode a verificação uma vez por tarefa, agrupe tarefas pequenas e relacionadas.

## Passagem de sessão

Perto de **60% do contexto** usado (ou de um limite de uso): pare num ponto estável, atualize a memória do projeto com o estado e diga ao usuário como retomar. A skill `/passagem-de-sessao` executa os passos. Na dúvida, faça a passagem cedo.

## Origem

Fluxo trazido do boilerplate-ia pela skill `/adotar`. Práticas novas que valem para outros projetos voltam para o boilerplate.
