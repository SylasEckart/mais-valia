# Proposta — Mais-valia

> Escrita na adoção do fluxo (2026-11-18), a partir do código existente e da entrevista com o dono. É o "porquê" do projeto; os detalhes vão para [requisitos](requisitos.md). O que foi **inferido** do código está marcado.

## Problema

Preço em reais diz pouco sobre o que ele custa de verdade: o que pesa é quanto do seu tempo de trabalho ele consome. A extensão traduz cada valor visto na web em minutos, horas, dias ou anos de trabalho, a partir do salário de quem usa. (Inferido do `manifest.json`: "Converte preços mostrados em quantas horas do seu tempo".)

## Público

Pessoa com salário em reais que navega em sites brasileiros (lojas, notícias) e quer enxergar o custo em tempo. Hoje o público é o próprio dono (uso pessoal); a meta é publicar na Chrome Web Store, onde passa a ser qualquer usuário do Chrome.

## Objetivos

- **Agora:** a extensão carregada do repositório funciona do jeito que o código promete (manifesto íntegro, conversão testada) e tem uma verificação automática que falha quando a conversão quebra.
- **Em seguida:** publicar na Chrome Web Store, o que exige Manifest V3, permissões mínimas e política de privacidade.
- **Sempre:** o salário e as horas do usuário não saem do navegador.
- Medir o custo de trabalhar no projeto com o fluxo de IA (tokens por tarefa, seção "Janela de uso" do roadmap) para planejar quantas tarefas cabem por janela.

## Como funciona

1. O usuário abre a página de opções e informa salário mensal, horas por dia e horas por semana.
2. Ao carregar uma página, a extensão procura valores como `R$ 1.250,00`, `R$ 3 mil` ou `2 milhões de reais` no texto.
3. Cada valor achado é trocado pelo tempo de trabalho equivalente (por exemplo, "3 dias"); passar o mouse mostra o valor original.
4. Conteúdo que aparece depois (carregamento dinâmico) também é convertido.

## Fora do escopo

- Outras moedas e valores sem "R$" nem "reais" (inferido: o código só trata esses dois formatos).
- Servidor, conta de usuário ou sincronização própria; a sincronia entre dispositivos é a do `chrome.storage.sync` do Chrome.
- Outros navegadores (a decidir; o código usa a API do Chrome).

## Restrições e riscos

- **Manifest V2** está sendo descontinuado no Chrome; a publicação exige V3 (ver [Questões em aberto](roadmap.md#questões-em-aberto)).
- A permissão `<all_urls>` junto com `tabs` e a injeção em todas as páginas serão examinadas na revisão da Web Store; precisam ser justificadas ou reduzidas.
- Dado pessoal (salário) tratado localmente; a política de privacidade da publicação precisa dizer isso. O código atual grava as opções também no `localStorage` de cada site visitado (ver [modelo de dados](modelo-de-dados.md)).
- O jQuery 3.2.1 versionado tem vulnerabilidades conhecidas em versões anteriores à 3.5.0; é legado a remover (roadmap).
- Sem testes que funcionem hoje: qualquer refatoração antes dos testes de caracterização corre risco de regressão silenciosa.
