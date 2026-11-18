---
name: spec
description: Escreve ou refina a especificação de um requisito (docs/specs/RFxx-*.md) com comportamento, critérios de aceite testáveis e casos de borda. Use quando o usuário pedir para especificar ou detalhar um RF, ou quando /implementar encontrar um RF sem spec.
---

# /spec <RFxx | ideia nova>

## 1. Localizar

- Se recebeu um RF, leia a linha dele em `docs/requisitos.md` e a spec existente em `docs/specs/`, se houver.
- Se recebeu uma ideia sem RF, proponha o requisito (ID na faixa da área, prioridade) e confirme com o usuário antes de criar.
- **RF legado** (Spec `— (legado)`): leia o código que o implementa (a evidência está na descrição do requisito) e descreva o comportamento **atual**, incluindo o que parecer defeito. Anote cada ponto duvidoso e pergunte se é intencional; não conserte na spec.
- Leia o que a spec toca: specs relacionadas, `docs/modelo-de-dados.md`, `docs/arquitetura.md`.

## 2. Tirar as ambiguidades

Liste o que o requisito não diz e que muda o comportamento: limites numéricos, arredondamento, o que acontece com entrada inválida, o que o usuário vê. Pergunte com AskUserQuestion (no máximo 4 por rodada), sempre com uma opção recomendada. O que o usuário não souber responder vai para "Questões em aberto" no roadmap, e a spec fica `rascunho`.

## 3. Escrever

Crie ou atualize `docs/specs/RFxx-slug.md` a partir de `docs/specs/_modelo.md`:

- **Status** na linha `- **Status:** rascunho | aprovado | implementado`, no cabeçalho, com um só valor.
- **Critérios de aceite** no formato Dado/Quando/Então, numerados (CA1, CA2...). Cada um deve ser verificável por um teste automatizado no Jest (lógica pura, sem navegador). Comportamento que só se vê no Chrome (DOM, `chrome.*`) vira CA com **roteiro de verificação manual**, escrito na própria spec; se possível, extraia a lógica para um módulo puro e teste-a.
- **Casos de borda** com o resultado exato (texto produzido, unidade, valor padrão).
- **Impacto técnico:** arquivos de `extension/`, manifesto, permissões, dados do usuário (salário e horas são pessoais).
- Limites que podem mudar viram configuração, com valor inicial.
- Em RF legado, uma seção "Comportamento atual que difere da intenção" lista o que foi achado, com a decisão do dono.

## 4. Amarrar

- Em `docs/requisitos.md`, mude o status para `especificado` e coloque o link na coluna Spec (em RF legado, troque `— (legado)` pelo link).
- Se a spec exige uma decisão técnica relevante (manifesto, permissões, onde guardar dados), crie o ADR com `/adr`.
- Se mudou ou criou outros requisitos, atualize-os também.

Termine mostrando os critérios de aceite e perguntando se a spec pode ir para `aprovado`.
