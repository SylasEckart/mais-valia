---
name: adr
description: Registra uma decisão técnica em docs/adr/ a partir do modelo - decide se é ADR, acha o próximo número livre, confere decisões anteriores e atualiza os docs que apontam para ela. Use quando o usuário pedir um ADR, quando surgir uma decisão técnica que alguém poderia questionar, ou quando /implementar pedir.
---

# /adr <decisão>

Registra **uma** decisão por ADR. As regras valem como estão no `CLAUDE.md` (regra 4 e "Branches e commits"); esta skill diz **como decidir, numerar, escrever e amarrar**, sem repeti-las. O ADR 0001 em `docs/adr/` mostra o nível de detalhe esperado, inclusive decisão herdada com "Por quê: não registrado".

## 1. É ADR?

Aplique a regra 4 do `CLAUDE.md`: decisão técnica que alguém poderia questionar. Mudança de stack, de biblioteca central, de modelo de dados ou de segurança **sempre** conta, e, neste projeto, mudança de manifesto (versão, permissões) e de onde os dados do usuário ficam.

Não é ADR: escolha trivial ou reversível em minutos (nome de variável, formatação), dúvida de produto (vai para "Questões em aberto" do `roadmap.md` ou vira pergunta ao usuário) e mudança de escopo ou prioridade (vai para "decisões" do `roadmap.md`). Se não for ADR, diga isso em uma frase com o motivo e **pare**: não crie arquivo.

## 2. Descobrir o próximo número

O número livre é o maior já usado mais um, olhando a branch atual **e** as outras branches locais (uma tarefa em andamento pode já ter criado um ADR):

```bash
{ ls docs/adr/
  git for-each-ref --format='%(refname)' refs/heads \
    | while read -r r; do git ls-tree --name-only "$r:docs/adr" 2>/dev/null; done
} | sed 's|.*/||' | grep -E '^[0-9]{4}-' | sort -u | tail -5
```

Use o maior número da lista + 1, com quatro dígitos. Se outra branch já ocupa o número, avise o usuário e diga qual escolheu; não renumere ADR alheio.

## 3. Conferir o que já foi decidido

```bash
grep -rni -e "<termo da decisão>" -e "<alternativa>" docs/adr/ docs/arquitetura.md docs/modelo-de-dados.md
```

Três casos:

- **Já decidido e vale:** diga qual ADR e pare. Não duplique.
- **A nova decisão substitui uma anterior:** o ADR antigo muda o status para `substituído por ADR nnnn` (e o novo cita o que substitui no contexto). O antigo **nunca é apagado**: o histórico é o ponto.
- **Complementa sem substituir:** cite o ADR anterior no contexto.

## 4. Escrever

Crie `docs/adr/nnnn-slug.md` (slug em minúsculas, sem acento, hifenizado) a partir de `docs/adr/_modelo.md`:

- **Status:** `aceito` quando o usuário já decidiu; `proposto` quando depende da aprovação dele. Nunca marque `aceito` uma decisão que o usuário não tomou.
- **Data:** absoluta, `AAAA-MM-DD`.
- **Requisitos:** os RF/RNF afetados; "nenhum" com o motivo, se for ferramenta de processo.
- **Contexto:** a força que exige a decisão agora (o problema, os limites, o que já existe), não a solução.
- **Decisão:** frases afirmativas e verificáveis (o que é, como é configurado, onde fica).
- **Alternativas consideradas:** uma linha por alternativa real, com o **porquê do descarte**. "Não escolhida" não é motivo.
- **Consequências:** `(+)` e `(−)`. Inclua as ruins e o custo de desfazer; ADR só com vantagens não foi pensado.

Fato que você não sabe (preço, limite, versão) não se inventa: confira na fonte ou pergunte. Dúvida de produto não se resolve sozinho: pergunte ao usuário (AskUserQuestion, com opção recomendada) ou registre em "Questões em aberto" no `roadmap.md` e deixe o ADR `proposto`.

## 5. Amarrar

- `docs/arquitetura.md` e `docs/modelo-de-dados.md`, se a decisão muda o que está descrito neles; cite o ADR (`ADR nnnn`).
- `docs/requisitos.md`, se há RF afetado.
- Índice: hoje não há índice de ADRs (a listagem é a pasta `docs/adr/`). Se existir um em `docs/adr/` ou em `docs/arquitetura.md`, acrescente a linha.
- ADR substituído: atualize o status dele (etapa 3).

## 6. Commit

Siga "Branches e commits" do `CLAUDE.md`: o ADR vai em **commit próprio**, separado do código (docs de planejamento e implementação não se misturam). Ex.: `docs(RF12): ADR 0004 escolhe X`, com corpo (o que foi decidido e por quê, alternativas descartadas, docs atualizados). Os docs que apontam para a decisão (etapa 5) podem ir no mesmo commit se forem poucos.

Só commite se o usuário pedir ou se a skill estiver rodando dentro de um fluxo que já commita (como `/implementar`). Caso contrário, deixe o arquivo pronto e diga o que falta.

Termine informando: o número escolhido e como foi achado, o status do ADR e por quê, e o que ficou em aberto.
