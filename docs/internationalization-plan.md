# Plano de internacionalização do axismind

## Objetivo

Preparar o site para português do Brasil, inglês e espanhol sem duplicar componentes, mantendo o build estático do Next.js compatível com o GitHub Pages.

## Decisões propostas

- Usar `pt-BR` como idioma-fonte e idioma padrão.
- Organizar textos em dicionários tipados por chave, em vez de strings espalhadas nos componentes.
- Usar rotas estáticas por idioma (`/pt-br/`, `/en/` e `/es/`) para que cada tradução tenha URL própria, SEO previsível e funcionamento no GitHub Pages.
- Manter dados que não são texto de interface (Pix, e-mail, versão legal e imagens) em `src/content/site.ts`.
- Não traduzir automaticamente textos jurídicos: cada idioma deverá passar por revisão antes de publicação.

## Estrutura sugerida

```text
src/i18n/
  config.ts              # locales suportados e locale padrão
  types.ts               # contrato das chaves
  messages/
    pt-BR.ts             # fonte canônica
    en.ts
    es.ts
  get-message.ts         # acesso seguro às mensagens
```

Exemplos de chaves:

```ts
home.hero.eyebrow
home.hero.title
home.hero.primaryCta
navigation.home
navigation.support
legal.privacy.title
```

## Fases de implementação

1. **Inventário e contrato**
   - Catalogar textos de navegação, início, como usar, segurança, apoio, privacidade, termos, rodapé, acessibilidade e mensagens de interação.
   - Criar o tipo de mensagens e garantir que todos os idiomas tenham as mesmas chaves.

2. **Extração do português**
   - Mover as strings atuais para `messages/pt-BR.ts`.
   - Alterar componentes para receber ou consultar mensagens por chave.
   - Adicionar testes que detectem chaves ausentes e mantenham o e-mail Pix fora do catálogo traduzível.

3. **Rotas por idioma**
   - Criar a lista estática de locales e gerar as páginas para cada idioma.
   - Preservar `NEXT_PUBLIC_BASE_PATH` e `trailingSlash` para o GitHub Pages.
   - Atualizar links internos, metadados, `lang` do HTML, sitemap e canonical/alternate links.

4. **Seletor de idioma**
   - Adicionar um seletor acessível no cabeçalho/rodapé.
   - Ao trocar o idioma, manter a mesma rota equivalente quando existir.
   - Usar o idioma do navegador apenas como sugestão; a URL deve continuar sendo a fonte de verdade.

5. **Traduções e conteúdo legal**
   - Traduzir primeiro `en` e depois `es`.
   - Revisar textos legais e avisos de segurança com validação humana antes de ativar cada idioma.
   - Não traduzir nomes próprios, chave Pix, endereço de e-mail ou identificadores técnicos.

6. **Qualidade e publicação**
   - Testar todas as rotas e locales em desktop e mobile.
   - Verificar ausência de overflow em navegação e CTAs longos.
   - Executar typecheck, testes unitários, E2E e build estático.
   - Publicar primeiro um idioma adicional em uma branch/PR; só depois ativá-lo em produção.

## Critérios de aceite

- Toda string visível vem de uma chave, exceto conteúdo técnico explicitamente documentado.
- Nenhuma chave fica ausente ou cai silenciosamente para outro idioma.
- Cada idioma possui URL estática, título, descrição e atributo `lang` corretos.
- O GitHub Pages continua publicando com o mesmo `basePath`.
- Os testes cobrem troca de idioma, links equivalentes, fallback controlado e conteúdo legal.
