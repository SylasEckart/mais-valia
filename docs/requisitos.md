# Requisitos

Derivados da [proposta](proposta.md). Os identificadores (RF/RNF) são citados em specs, tarefas, commits e testes.

- **Prioridade:** M = obrigatório · D = desejável · F = futuro
- **Status:** proposto → especificado (tem spec em `specs/`) → implementado → testado
- **Spec `— (legado)`:** requisito retroativo, deduzido do código na adoção do fluxo (2026-11-18). A evidência está na descrição. Antes de mudá-lo: `/spec` e testes de caracterização (regra 2 do `CLAUDE.md`). Requisito `proposto` que vem do código é **intenção não confirmada**: está em [Questões em aberto](roadmap.md#questões-em-aberto).

## Atores

| Ator | Descrição |
|---|---|
| Usuário | Quem navega com a extensão instalada e configura salário e horas |
| Dono | Quem mantém a extensão e a publica |

## Requisitos funcionais

### Conversão (RF01–09)

| ID | Requisito | Prior. | Status | Spec |
|---|---|---|---|---|
| RF01 | Troca no texto da página valores no formato `R$ 1.234,56` (com ou sem espaço depois do `R$`) pelo tempo de trabalho equivalente. Evidência: `substituiValores` em `js/content.js` | M | implementado | — (legado) |
| RF02 | Também troca valores por extenso do tipo `10 reais`, `3 mil reais` e `2 milhões de reais`. Evidência: ramo `reais_extenso` de `substituiValores` | M | implementado | — (legado) |
| RF03 | Entende os sufixos `mil`, `mi`/`milhão`/`milhões`, `bi`/`bilhão`/`bilhões` e `tri`/`trilhão`/`trilhões` como multiplicadores. Evidência: `detectaSufixo` (`js/content.js`), `getSufixOfCurrency` (`src/modules.js`) | M | implementado | — (legado) |
| RF04 | O minuto de trabalho vale `salário / (horas por semana × 4,5) / 60`; o tempo de um valor é `valor / minuto de trabalho`. Evidência: `minutoSalario`, `salaryPerMinute` | M | implementado | — (legado) |
| RF05 | Mostra o tempo na unidade que couber: milissegundos e segundos (abaixo de 1 min), minutos, horas (a partir de 60 min), dias (a partir de `horas por dia`), anos (a partir de 365 dias), no singular quando for 1. Evidência: `tempoSalario`, `getSalarySufix`. A conta de dias e anos tem inconsistência a esclarecer na spec | M | implementado | — (legado) |
| RF06 | Passar o mouse sobre o tempo mostra o valor original em reais (`title` do elemento). Evidência: `<bdi class="tempoSalario" title=...>`; descrição do `manifest.json` | M | implementado | — (legado) |
| RF07 | Conteúdo inserido depois do carregamento que contenha `R$` também é convertido. Evidência: `observeDOM` (`MutationObserver`) | D | implementado | — (legado) |
| RF08 | Não converte texto dentro de `script`, `style`, `iframe`, `canvas`, `input` e `textarea`. Evidência: filtros de `substituiValores` | M | implementado | — (legado) |

### Configuração (RF10–19)

| ID | Requisito | Prior. | Status | Spec |
|---|---|---|---|---|
| RF10 | Página de opções (clique direito no ícone → Opções) com salário mensal, horas por dia (1–24) e horas por semana (1–184); o salário é formatado como moeda enquanto se digita. Evidência: `mais-valia.html`, `js/options.js` | M | implementado | — (legado) |
| RF11 | Salvar grava as opções no `localStorage` e no `chrome.storage.sync`; campo vazio mostra aviso de erro e sucesso pede para recarregar a página sem cache. Evidência: `js/options.js` | M | implementado | — (legado) |
| RF12 | Sem configuração, usa salário R$ 1.100, 8 horas por dia e 40 por semana. Evidência: `js/content.js`, `src/modules.js` | M | implementado | — (legado) |
| RF13 | Ao carregar uma página, as opções salvas no `chrome.storage.sync` passam a valer na conversão. Evidência: início de `js/content.js` (hoje a leitura quebra na primeira execução sem opções; ver roadmap) | M | proposto | |

### Ativação (RF20–29)

| ID | Requisito | Prior. | Status | Spec |
|---|---|---|---|---|
| RF20 | A extensão roda em toda página aberta ou atualizada, sem ação do usuário (`tabs.onUpdated`). Evidência: `background.js` | M | implementado | — (legado) |
| RF21 | O usuário liga e desliga a conversão na aba; desligar recarrega a aba. Evidência: `background.js` (`onClicked`, `toggle`) e `index.html` (radios Ligado/Desligado). **Intenção não confirmada:** com `default_popup` no manifesto o `onClicked` não dispara e os radios não têm código; o estado `toggle` é global, não por aba | D | proposto | |

### Publicação (RF30–39)

| ID | Requisito | Prior. | Status | Spec |
|---|---|---|---|---|
| RF30 | A extensão é publicada na Chrome Web Store (manifesto V3, descrição, ícones e capturas de tela, política de privacidade) | M | proposto | |

## Requisitos não funcionais

| ID | Requisito | Status |
|---|---|---|
| RNF01 | Nenhum dado do usuário sai do navegador: a extensão não faz requisição de rede (conferido na adoção: sem `fetch`, `XMLHttpRequest` nem `ajax` fora do jQuery) | implementado |
| RNF02 | Salário e horas não vão para log, nem para o `localStorage` das páginas visitadas | proposto (hoje violado: `content.js` e `options.js` usam `localStorage` e `console.log`) |
| RNF03 | A lógica de conversão é testável sem navegador e tem testes que falham quando ela quebra | proposto (hoje violado: ver roadmap) |
| RNF04 | Permissões do manifesto mínimas e justificadas (hoje `activeTab`, `tabs`, `storage` e `<all_urls>`) | proposto |
| RNF05 | Manifest V3 | proposto |
| RNF06 | Sem dependência de biblioteca desatualizada (jQuery 3.2.1) | proposto |
| RNF07 | O manifesto referencia só arquivos que existem; `update_url` é removido ou real | proposto (hoje violado) |
