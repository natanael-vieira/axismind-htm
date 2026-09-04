# axismind-htm

Site institucional estático do axismind, preparado para GitHub Pages com Next.js, React e Tailwind CSS.

## Desenvolvimento

```bash
yarn install
yarn dev
```

## Verificação

```bash
yarn typecheck
yarn build
```

O build estático é gerado em `out/`. O workflow usa o nome do repositório como `basePath`. Ao adotar domínio próprio ou repositório de usuário (`usuario.github.io`), defina `NEXT_PUBLIC_BASE_PATH` como vazio no workflow.

## GitHub Pages

Antes da primeira publicação, abra **Settings → Pages** no repositório e, em **Build and deployment**, selecione **GitHub Actions** como fonte. Sem essa ativação inicial, a etapa `actions/configure-pages` retorna `Not Found`.

## Conteúdo pendente

- URL definitiva do GitHub Pages/domínio;
- revisão jurídica independente de Política e Termos;
- dados bancários/PIX, se a área de apoio for ativada;
- capturas reais finais do mesmo AAB homologado para substituir as prévias visuais.

Não publique CPF, endereço residencial, senhas, tokens, dados de cartão ou chaves privadas neste repositório.
