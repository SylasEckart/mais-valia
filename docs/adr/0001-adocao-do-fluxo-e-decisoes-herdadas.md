# ADR 0001 — Adoção do fluxo de IA e decisões herdadas

- **Status:** aceito
- **Data:** 2026-11-18
- **Requisitos:** nenhum (processo); registra decisões que sustentam RF01–RF21

## Contexto

O mais-valia existe desde 2020 (6 commits, dois autores) sem requisitos, specs, ADRs, CI nem verificação automática. O único teste (`expect(1).toEqual(1)`) não alcança o código, e a extensão carregada do repositório tem defeitos que nenhuma verificação pega (manifesto apontando para arquivos inexistentes). Daqui em diante o trabalho passa a ser feito com ajuda de agentes de IA, que implementam o que está escrito e inventam o que não está. O dono quer corrigir, evoluir e publicar na Chrome Web Store.

As decisões técnicas abaixo foram **herdadas**, não tomadas na adoção. Elas são registradas como fatos; o motivo original não está em nenhum documento nem no histórico (os commits são "commit to save" e similares), e **não foi inventado**.

## Decisão

1. **Adotar o fluxo spec-driven do boilerplate-ia** na versão enxuta: `CLAUDE.md` com as seis regras do Fluxo, `docs/` (proposta, requisitos, arquitetura, modelo de dados, specs, ADRs, roadmap), skills `/plano`, `/spec`, `/implementar`, `/revisar`, `/adr` e `/passagem-de-sessao`, e `npm test` como verificação.
2. **Fora do escopo da adoção, por ora:** git-flow com `develop`, CI, hooks, pre-commit e as ferramentas em Node do boilerplate (`rastreabilidade`, `verificar-commits`). O projeto é pequeno e de duas pessoas; o `/revisar` faz essas conferências à mão. Reavaliar quando houver CI útil (ex.: na publicação).
3. **A adoção não muda código de produção.** Defeitos achados viram tarefas da Fase 0 do roadmap, cada uma com requisito e PR.
4. **Requisitos retroativos** entram como `implementado` com Spec `— (legado)`, sem critérios de aceite em massa. Ao tocar um RF legado, `/spec` e testes de caracterização vêm antes da mudança.
5. **Decisões herdadas** (a mudar só por ADR novo):

| Tema | Herdado | Por quê |
|---|---|---|
| Plataforma | Extensão do Chrome, Manifest V2 | não registrado |
| Linguagem | JavaScript puro, sem bundler nem TypeScript | não registrado |
| DOM | jQuery 3.2.1 slim versionado em `extension/js/` | não registrado |
| Conversão | Texto da página varrido por regex/`split` em `R$` e `reais`; `MutationObserver` para conteúdo dinâmico | não registrado |
| Persistência | `localStorage` + `chrome.storage.sync` (chave `options`) | não registrado |
| Testes | Jest 29 em `unit-test/`, com `package.json` próprio | não registrado |
| Mês de trabalho | 4,5 semanas | não registrado |

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| Não adotar fluxo (seguir como está) | A publicação na loja e a evolução com agentes exigem requisitos e testes; hoje nada verifica o comportamento |
| Adotar o boilerplate completo (git-flow, CI, lefthook, pnpm, Vitest, Prettier) | Projeto de 560 linhas; o custo de manter a ferramenta supera o ganho agora, e a stack do boilerplate (Nest, Supabase) não se aplica |
| Escrever specs com critérios de aceite para todo o comportamento existente | Trabalho grande sem dono; o valor está em especificar o que vai mudar |
| Corrigir os defeitos já na adoção | Muda código sem requisito (regra 1) e mistura linha de base com mudança |

## Consequências

- (+) Cada mudança passa a ter requisito, teste e registro; o próximo agente começa pelo `CLAUDE.md` e não pelo código.
- (+) A linha de base vermelha (`npm test` falha) fica registrada e é a tarefa 1.
- (−) Até a tarefa 1, a verificação é manual (carregar a extensão no Chrome).
- (−) Sem CI, nada barra um commit que quebra o teste; a disciplina é do fluxo (`/revisar`).
- (−) Os requisitos retroativos foram deduzidos do código por um agente, não confirmados pelo dono item a item; os marcados `proposto` ou com ressalva estão em [Questões em aberto](../roadmap.md#questões-em-aberto).
