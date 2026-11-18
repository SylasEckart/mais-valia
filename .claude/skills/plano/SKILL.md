---
name: plano
description: Quebra requisitos em fases e tarefas do tamanho de um PR no docs/roadmap.md, cada uma citando os RFs que atende. Use quando o usuário pedir para planejar, priorizar ou organizar o próximo trabalho.
---

# /plano [fase ou RFs]

## 1. Ler o estado

- `docs/requisitos.md` (prioridade e status), `docs/specs/`, `docs/roadmap.md` e as questões em aberto.
- O código existente, para não planejar o que já foi feito. Lembre que muito do que existe é legado sem teste (veja "Legado" no `CLAUDE.md`).

## 2. Planejar

- Agrupe por fases que entregam algo utilizável. Comece pelos RFs **M** e pelo que destrava a verificação.
- Cada tarefa:
  - cabe em uma branch e um PR revisáveis (se passar de um dia de trabalho, quebre);
  - cita os RFs/CAs que atende: `- [ ] Converter "R$ 1,5 mil" em minutos de trabalho (RF03 CA1–CA2)`; sem requisito de usuário, `sem-RF`;
  - tem dependências explícitas quando houver (`depois de: ...`).
- Tarefa que muda um RF legado é precedida de `/spec RFxx` e de testes de caracterização.
- Questão em aberto que bloqueia uma tarefa fica marcada nela: `(bloqueada: questão 3)`.
- Estime quantas tarefas cabem por janela de uso (seção "Janela de uso" do roadmap) quando houver média medida.

## 3. Gravar

Atualize `docs/roadmap.md` preservando as tarefas já marcadas como feitas. Mostre ao usuário a próxima fase, a primeira tarefa sugerida e o que está bloqueado.
