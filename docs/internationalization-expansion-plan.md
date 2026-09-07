# Plano de expansão de idiomas

## Escopo

Adicionar ao catálogo i18n existente:

| Idioma | Locale | Direção |
| --- | --- | --- |
| Russo | `ru` | LTR |
| Alemão | `de` | LTR |
| Chinês simplificado | `zh-CN` | LTR |
| Japonês | `ja` | LTR |
| Coreano | `ko` | LTR |
| Árabe | `ar` | RTL |
| Hebraico | `he` | RTL |

O português do Brasil continuará sendo o idioma-fonte. Os cinco idiomas já existentes (`pt-BR`, `en`, `es`, `it` e `fr`) não devem mudar de comportamento durante a expansão.

## Decisões técnicas

- Manter os dicionários tipados em `src/i18n/messages.ts`.
- Estender `locales` e `localeLabels` com os sete códigos acima.
- Usar `Intl.NumberFormat` e `Intl.DateTimeFormat` com o locale ativo para números e datas futuras.
- Atualizar `document.documentElement.lang` e também `dir`: `rtl` para `ar` e `he`, `ltr` para os demais.
- Evitar textos concatenados; toda frase com valores dinâmicos deve usar placeholders e `interpolate`.
- Não introduzir tradução automática em tempo de execução: o site é estático e deve funcionar sem API externa.

## Fases

### 1. Contrato e infraestrutura

- Adicionar os sete locales ao tipo `Locale`.
- Garantir que cada catálogo tenha exatamente as mesmas chaves do português.
- Criar utilitários `isRtl(locale)` e `localeDirection(locale)`.
- Persistir a escolha no navegador sem impedir a renderização inicial em português.

### 2. Tradução da interface

Traduzir, nesta ordem:

1. navegação, seletor de idioma e rodapé;
2. tela Início e CTAs;
3. Como usar e mensagens de acessibilidade;
4. Segurança e Apoie o projeto;
5. Privacidade e Termos;
6. estados de cópia PIX, zoom da galeria e mensagens de erro.

Cada idioma deve receber revisão nativa, principalmente para o tom acolhedor do produto e para termos de privacidade.

### 3. Suporte a RTL

- Aplicar `dir="rtl"` no elemento `<html>` para árabe e hebraico.
- Revisar espaçamentos, alinhamentos, breadcrumbs, ícones direcionais e ordem visual dos CTAs.
- Usar propriedades lógicas de CSS (`margin-inline`, `padding-inline`, `inset-inline`) quando houver assimetria.
- Manter números, e-mail, chave PIX e nomes próprios legíveis sem inversão.
- Testar menu móvel, cards, galeria, modal de zoom e botão de copiar em RTL.

### 4. Tipografia e conteúdo visual

- Verificar que a fonte atual tenha cobertura de cirílico, CJK, árabe e hebraico.
- Se necessário, adicionar fontes de fallback por script, sem bloquear a primeira pintura.
- Testar quebra de títulos longos em alemão e russo e linhas verticais mais densas em CJK.
- Não inserir texto traduzido dentro das imagens dos mosaicos; manter as capturas originais como documentação do aplicativo.

### 5. SEO e metadados

- Traduzir título, descrição e textos alternativos das imagens.
- Atualizar o atributo `lang` e a direção antes da primeira interação.
- Quando houver URLs por idioma, gerar `hreflang` e canonical correspondentes.
- Manter o `basePath` e o `trailingSlash` compatíveis com o GitHub Pages.

### 6. Testes

- Teste unitário para completude das chaves e direção de cada locale.
- Teste para garantir que a troca persiste após recarregar a página.
- E2E para cada idioma verificando título, navegação, CTA e seletor.
- E2E dedicado para árabe e hebraico verificando `dir="rtl"`, ausência de overflow horizontal e foco acessível.
- Testar a galeria e a cópia PIX em pelo menos um locale LTR e um RTL.
- Executar typecheck, testes unitários, E2E e build estático antes do Pull Request.

## Ordem de entrega recomendada

1. `de`, `ru` e `zh-CN`;
2. `ja` e `ko`;
3. `ar` e `he` junto com a camada RTL;
4. revisão visual comparativa em desktop e mobile;
5. revisão jurídica e publicação gradual.

## Critérios de aceite

- Os sete idiomas aparecem no seletor e podem ser escolhidos sem navegação externa.
- Nenhum locale exibe chave técnica, texto vazio ou fallback silencioso inesperado.
- Árabe e hebraico renderizam em RTL sem cortar o cabeçalho, CTAs ou cards.
- Textos jurídicos só são publicados após revisão humana competente.
- Todas as Actions existentes continuam verdes e o GitHub Pages mantém a publicação.
