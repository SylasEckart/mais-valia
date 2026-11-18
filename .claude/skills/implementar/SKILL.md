---
name: implementar
description: Implementa uma tarefa do roadmap ou um RF especificado, testes primeiro (um por critério de aceite), rodando a verificação e atualizando requisitos e roadmap. Use quando o usuário pedir para implementar, codar ou fazer uma tarefa/RF.
---

# /implementar <tarefa do roadmap | RFxx>

## 1. Preparar

- Encontre a tarefa em `docs/roadmap.md` e os RFs que ela cita.
- Todo RF envolvido precisa de spec em `docs/specs/` com status `aprovado`. Se não tiver, pare e proponha `/spec RFxx`. Exceção: tarefa `sem-RF` (verificação, higiene), que pode seguir sem spec.
- Se a tarefa está bloqueada por uma questão em aberto, pare e pergunte.
- Leia o código da área e os achados de "Legado" no `CLAUDE.md`. Não copie o padrão do código legado.
- Crie a branch da tarefa a partir da `master` (`git switch master && git switch -c feature/<RF>-<slug>`).

## Modelo por etapa

Segue "Modelo por tarefa do agente" no `CLAUDE.md`. Delegue a subagente de modelo intermediário o que é mecânico (localizar código, escrever o teste de um CA claro, seguir um padrão, docs), passando só o recorte necessário. Mantenha no modelo grande decisão de arquitetura (manifesto, permissões, onde guardar dados) e depuração difícil. Antes de fechar, peça a revisão do diff a um subagente de modelo grande, com o diff e a spec, não a conversa.

## Princípios de desenho

- **Menor mudança que resolve**; código que ficou sem uso na mudança é removido.
- **Lógica pura fora do DOM e do `chrome.*`**, recebendo salário e horas como parâmetro: é o que o Jest consegue testar.
- **Refatorar:** fixe o comportamento com teste (caracterização), mude a estrutura, prove que o comportamento não mudou.
- **Duas correções falharam no mesmo ponto:** antes da terceira, escreva em uma frase a premissa que as duas compartilham e questione-a.

## 2. Testes primeiro

- Um teste por critério de aceite, com RF e CA no nome: `it('RF03 CA1: "R$ 3 mil" vale 3000', ...)`.
- Rode e confirme que os testes novos **falham** pelo motivo certo. Se um teste falhar de jeito inesperado, decida se o erro está no teste ou na regra; nunca afrouxe a spec para o teste passar.
- RF legado: antes de mudar, escreva os testes que descrevem o comportamento **atual** e confira que passam; só então altere.

## 3. Implementar

- O mínimo para os testes passarem, sem extrapolar a tarefa.
- Mudança no manifesto, em permissão ou em onde os dados ficam: pare e registre com `/adr`.
- Dado do usuário (salário, horas) nunca em log, nem em exemplo real.

## 4. Verificar

```bash
cd unit-test && npm test
```

Depois **carregue a extensão no Chrome** (`chrome://extensions`, *Load unpacked* em `extension/`, ou *Reload*), abra uma página com preços (por exemplo, uma página local de teste com `R$ 1.250,00` e `3 mil reais`) e confira o comportamento, olhando também o console da extensão. Teste passando não prova que o manifesto carrega os arquivos certos. Registre o que fez e o resultado.

Se a execução real revelar um erro que o teste não pegou, feche também a lacuna (um teste que faltava), não só o erro. Falha que não é da tarefa: reporte, não mascare. Se `npm test` ainda está vermelho por causa da linha de base, diga isso e não declare a tarefa "verde".

## 5. Fechar

- `docs/requisitos.md`: status `implementado` (ou `testado`, se todos os CAs têm teste passando); `docs/roadmap.md`: marque a tarefa; ajuste `arquitetura.md` e `modelo-de-dados.md` se mudaram.
- Resuma: o que mudou, quais CAs estão cobertos por quais testes, o que ficou de fora.
- Sugira a mensagem de commit completa, com corpo, seguindo "Branches e commits" do `CLAUDE.md`. Commite só se o usuário pedir.
- Rode `/revisar` e corrija o que ele apontar. O merge na `master` é do usuário.
