# axismind-htm

Site institucional estático do axismind, publicado no GitHub Pages com Next.js, React e Tailwind CSS: **https://natanael-vieira.github.io/axismind-htm/**

## Desenvolvimento

```bash
yarn install --frozen-lockfile
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

Essa configuração é feita apenas uma vez. Depois dela, o workflow `.github/workflows/deploy-pages.yml` publica automaticamente a cada `push` na branch `main`. Também é possível executar uma publicação manual em **Actions → Publicar site no GitHub Pages → Run workflow**.

## Segurança

O repositório usa permissões mínimas nos workflows, Actions fixadas por commit,
CodeQL, revisão de dependências e atualizações semanais pelo Dependabot. Consulte
[`SECURITY.md`](SECURITY.md) para relatar uma vulnerabilidade de forma privada.

Antes de enviar alterações, execute `yarn typecheck`, `yarn build` e, quando
houver acesso ao registro de pacotes, `yarn audit --groups dependencies`.

## Conteúdo pendente

- revisão jurídica independente de Política e Termos.

Não publique CPF, endereço residencial, senhas, tokens, dados de cartão ou chaves privadas neste repositório.
