# Roadmap

Cada tarefa cita os requisitos que atende e cabe em um PR. A skill `/plano` cria e atualiza este arquivo; `/implementar` marca as tarefas concluídas. Tarefas `sem-RF` são de processo ou de remoção de código sem efeito para o usuário.

## Fase 0 — Adoção (linha de base e defeitos)

Linha de base registrada na adoção (2026-11-18): `cd unit-test && npm install && npm test` → **1 suíte falha**, 0 testes executados (`ReferenceError: window is not defined` em `extension/src/modules.js:35`, porque o `module.exports` chama as funções na hora do `require`).

- [ ] **Verificação que roda de verdade:** exportar as funções de `extension/src/modules.js` (hoje o `module.exports` as chama) sem acesso a `window` no import, e fazer `npm test` importá-las e falhar se a conversão quebrar; trocar o `expect(1).toEqual(1)` por um teste real simples (`sem-RF`, base do RNF03)
- [ ] **Testes de caracterização** da conversão (`/spec` + testes antes de qualquer refatoração): sufixos (RF03), minuto de trabalho (RF04), unidades de tempo (RF05) e padrões (RF12). Pode revelar o que RF05 tem de inconsistente (depois de: tarefa anterior)
- [ ] **Manifesto íntegro:** remover do `content_scripts` os arquivos inexistentes `js/modules.js` e `js/modulesTest.js`; remover o `update_url` placeholder; conferir no Chrome que a extensão carrega sem erro (RNF07)
- [ ] **Unificar a lógica:** `js/content.js` passa a usar a lógica testada (um módulo só), em vez da cópia de `src/modules.js` (RF01–RF05; depois de: testes de caracterização)
- [ ] **Primeira execução sem opções:** `JSON.parse(items.options)` em `content.js` lança quando não há opções salvas; tratar e cobrir com teste (RF13)
- [ ] **Salário fora do `localStorage` dos sites:** `content.js` lê direto de `chrome.storage` e não grava nada na página; remover o `console.log(window.localStorage)` e o `console.log(items)` (RNF02; pode exigir ADR)
- [ ] **Popup e ligar/desligar:** decidir se o popup (radios) ou o clique no ícone liga e desliga, e por aba; implementar o escolhido (RF21; bloqueada: questão 3; `index.js` tem `tabs[1].id` e `tabId` indefinidos)
- [ ] **Higiene do repositório:** tirar `.idea/` do git e acrescentar ao `.gitignore`; apagar `extension/src/main.js` (vazio) (`sem-RF`)
- [ ] **jQuery:** remover a dependência do jQuery 3.2.1 (RNF06; depois de: unificar a lógica)

## Fase 1 — Publicação na Chrome Web Store (a detalhar com `/plano` depois da Fase 0)

- [ ] ADR: migração para Manifest V3 (service worker no lugar da página de fundo, `chrome.scripting` no lugar de `tabs.executeScript`) (RNF05, RF30; bloqueada: questão 1)
- [ ] Reduzir permissões ao necessário (`tabs`, `<all_urls>`) e justificá-las (RNF04, RF30)
- [ ] Política de privacidade, descrição, ícones e capturas de tela da loja (RF30; depois de: salário fora do `localStorage`)
- [ ] Levantar na fonte oficial os custos de publicar (taxa de registro de desenvolvedor, conta e verificação exigidas) e registrar o valor e a data da consulta (questão 2)

## Questões em aberto

| # | Questão | Impacto |
|---|---|---|
| 1 | Migrar já para Manifest V3 (a loja exige) ou primeiro estabilizar em V2? Recomendação: estabilizar com testes (Fase 0) e então migrar | Ordem das fases; ADR de plataforma |
| 2 | Custo de publicar na Chrome Web Store (confirmado pelo dono em 2026-11-18: "medir custos" é sobre isso). Valor e forma da taxa de registro de desenvolvedor a conferir na página oficial da loja antes de decidir; não foi verificado na adoção | Fase 1; decide se vale publicar agora |
| 3 | Como o usuário liga e desliga: pelo ícone (sem popup), pelo popup, ou os dois? Vale por aba ou global? | RF21, tarefa de popup |
| 4 | O salário padrão de R$ 1.100 é intencional ou um valor de teste? O salário mínimo muda; faz sentido ter padrão? | RF12 |
| 5 | A conta de dias e anos (RF05) usa dias de trabalho divididos por 365; é intencional? | Spec de RF05 |
| 6 | Publicar só para Chrome, ou também Firefox e Edge? | RNF05, RF30 |
| 7 | Os dois autores históricos (dono e colaborador) concordam com a licença e a publicação? Não há `LICENSE` no repositório | RF30 |

## Janela de uso

Regra em `CLAUDE.md` ("Janela de uso"). Limite do plano (informado em 2026-11-18): **1 milhão de tokens a cada 5 horas**.

Custo médio por etapa (medir nas primeiras janelas e preencher): implementador por tarefa, revisão do modelo grande, rascunho de spec. Referência de outro projeto (alerta-carioca): um implementador custou 110 a 140 mil tokens e uma revisão do modelo grande 70 a 105 mil. Com a média daqui, estime quantas tarefas cabem por janela.

| Etapa | Custo (tokens) | Data | Observação |
|---|---|---|---|
| Adoção do fluxo (`/adotar`) | a medir | 2026-11-18 | |
