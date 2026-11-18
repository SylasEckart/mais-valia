---
name: revisar
description: Revisa a branch atual antes do merge - roda a verificação do projeto e confere o diff contra as regras do CLAUDE.md (RFs citados, CA com teste, docs e ADR atualizados). Só reporta; não corrige nem faz push. Use quando o usuário pedir para revisar, ou antes de mesclar.
---

# /revisar [base]

Checklist pré-merge sobre a branch atual. As regras valem como estão no `CLAUDE.md`; esta skill diz **onde olhar** e **como reportar**. **Não corrige, não commita e não faz push**: só reporta.

## 1. Situar o diff

Base: `master` (ou a que o usuário passou).

```bash
git branch --show-current
git log --oneline master..HEAD
git diff --stat master...HEAD
git status --short   # o que não foi commitado não entra no merge
```

## 2. Rodar a verificação

Informe o resultado **real** (saída, não suposição). Comando que não existe no projeto é "não se aplica", com o motivo.

```bash
cd unit-test && npm test    # único comando automático do projeto
```

Compare com a linha de base do roadmap: **nada novo pode falhar**. Se o diff toca `extension/`, peça ou confira o teste manual no Chrome (carregar a extensão, abrir página com preços, olhar o console) registrado na mensagem do commit.

Commits: confira à mão (não há script) que todo commit tem corpo e que `feat`/`fix` citam RF/RNF (ou `sem-RF`) no título.

## 3. Conferir o diff à mão

Leia `git diff master...HEAD` e confira. Os números das regras são os de "Fluxo de trabalho" no `CLAUDE.md`.

| Item | O que olhar |
|---|---|
| Requisito (regra 1) | Toda mudança de comportamento aponta para RF/RNF em `docs/requisitos.md` |
| Spec (regra 2) | Todo RF tocado tem spec com CAs; RF legado tocado tem testes de caracterização |
| Teste por CA (regra 3) | Todo CA tocado tem teste com RF e CA no nome; teste não afrouxa a spec |
| ADR (regra 4) | Mudança de manifesto, permissão, biblioteca central ou de onde ficam os dados tem ADR |
| Docs (regra 5) | `requisitos.md` (status), `roadmap.md` (tarefa marcada), `arquitetura.md` e `modelo-de-dados.md` se mudaram |
| Desenho | Mudança mínima, sem código morto; sem duplicar a lógica de conversão; correção na causa, não guarda que esconde o erro |
| Manifesto | Só arquivos que existem; permissões não aumentaram sem requisito e ADR |
| Dados do usuário | Salário e horas fora de log e de exemplo; nada novo em `localStorage` de página; sem requisição de rede (RNF01, RNF02) |
| Dependências | Nenhuma nova; jQuery não usado em código novo |
| Segredos | Nada de chave, token ou dado real no diff |
| Commits | Pequenos, um assunto cada, com corpo completo |
| Branch | Nome `feature/`, `fix/` ou `docs/`; base `master` |

Marque "não se aplica" quando o diff não toca a área, com uma linha de motivo.

## 4. Revisão por subagente (se o contexto permitir)

Delegue a leitura crítica do diff a um subagente de modelo grande, com só o diff e a spec dos RFs tocados. Peça bugs, regras da spec violadas e riscos (privacidade, permissões). Inclua os achados no relatório, marcando a origem; se não rodou, diga.

## 5. Relatório

```
Branch: <branch> -> base master | N commits, M arquivos

| Item | Resultado | Evidência |
|---|---|---|
| npm test | ok / falha / igual à linha de base | saída |
| teste manual no Chrome | feito / não feito | o que foi visto |
| ... | ... | arquivo:linha |

Falhas, da mais grave à menos:
1. <falha> - corrigir: <o que fazer>
```

Ordem de gravidade: dado do usuário exposto, comportamento sem requisito ou sem teste, verificação quebrada, ADR e docs faltando, registro (commits) fora do formato. Termine dizendo se está pronto para mesclar. Dúvida de produto vai como pergunta ao usuário.
