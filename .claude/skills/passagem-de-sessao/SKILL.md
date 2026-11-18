---
name: passagem-de-sessao
description: Prepara a continuação do trabalho em outra conversa: estabiliza o repositório, atualiza a memória do projeto e diz como retomar. Use perto de 60% do contexto ou de um limite de uso.
disable-model-invocation: true
---

# /passagem-de-sessao

Siga "Passagem de sessão" do `CLAUDE.md`.

1. **Ponto estável**: `git status` e `git branch --show-current`. Commit (com corpo) do que estiver pronto, só se o usuário pedir; o que não foi validado fica na branch da tarefa, com uma nota dizendo o que falta (no `docs/roadmap.md` ou na memória).
2. **Memória do projeto**: atualize o arquivo de estado com a branch em andamento, o que falta, comandos para retomar e cuidados conhecidos. Mantenha o índice da memória com uma linha por arquivo.
3. **Roadmap**: mudanças de escopo ou questões em aberto vão para `docs/roadmap.md`, não só para a memória.
4. **Diga ao usuário** a frase para retomar (por exemplo: "Retome a tarefa X na branch feature/RF05-...: falta Y") e o que a próxima sessão fará primeiro.
