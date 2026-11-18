# Modelo de dados

> Não há banco. Os dados do usuário são três preferências, guardadas no navegador. Descrição do que **é** hoje (2026-11-18).

## Preferências

| Chave | Significado | Tipo guardado | Padrão (RF12) | Validação na origem |
|---|---|---|---|---|
| `salario` | Salário mensal em reais, como o usuário digitou (`1.234,56`) | texto | 1100 | máscara de moeda ao digitar (`js/options.js`) |
| `horas-dia` | Horas de trabalho por dia | texto | 8 | `input` numérico, 1–24 |
| `horas-semana` | Horas de trabalho por semana | texto | 40 | `input` numérico, 1–184 |

Constante de cálculo no código: um mês tem 4,5 semanas.

## Onde ficam

| Lugar | O que tem | Observação |
|---|---|---|
| `localStorage` da página de opções (origem da extensão) | As três chaves, gravadas ao salvar | Fonte das opções ao reabrir a página de opções |
| `chrome.storage.sync`, chave `options` | O `localStorage` **inteiro** da página de opções, serializado em JSON | Sincroniza entre dispositivos do usuário no Chrome; vale `chrome.storage.sync.set` com limite de tamanho por item |
| `localStorage` de cada site visitado | As três chaves, copiadas por `content.js` a partir de `options` | **Defeito de privacidade:** o salário fica legível pelo JavaScript do site e persiste nele (RNF02) |

## Dados pessoais

O salário é dado pessoal sensível na prática. Hoje nada sai do navegador (RNF01), mas o item acima o expõe aos sites. A política de privacidade da publicação (RF30) depende de resolver isso.
