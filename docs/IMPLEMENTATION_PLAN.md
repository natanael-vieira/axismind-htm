# Plano único — site público do axismind

Data: 04/09/2026. Estado: site funcional publicado em **https://natanael-vieira.github.io/axismind-htm/**; pendências externas e de conteúdo listadas abaixo.

## Objetivo

Publicar, em um único repositório separado, um site acessível e responsivo que apresente o axismind, ensine a jornada básica, hospede Política de Privacidade e Termos em URL HTTPS estável e reserve uma área transparente de apoio ao projeto.

## Decisão técnica

- Next.js App Router + React + Tailwind CSS;
- `output: 'export'`, produzindo somente HTML/CSS/JavaScript estático em `out/`;
- GitHub Actions para build, verificação e publicação no GitHub Pages;
- nenhum banco de dados, formulário, cookie próprio, analytics ou conteúdo do app;
- Axios não foi incluído porque não existe API. Se surgir backend real, sua inclusão deve acompanhar contrato de dados, segurança, retenção e Política atualizada;
- textos e dados institucionais centralizados em `src/content/site.ts`;
- dados bancários desativados até confirmação; preferir chave PIX aleatória/institucional, nunca CPF;
- CPF e endereço residencial do controlador não integram este repositório público.

## Rotas entregues

1. `/`: apresentação, limites, diferenciais e prévias visuais;
2. `/como-usar/`: guia da criação do cofre à exportação;
3. `/privacidade/`: política pública em linguagem direta;
4. `/termos/`: termos públicos;
5. `/apoie/`: área futura de apoio, sem coleta nem pagamento embutido;
6. `404`: retorno seguro para a página inicial.

## Fechado em 04/09/2026

- repositório e `basePath` definidos;
- build e deploy pelo GitHub Actions;
- site e rotas públicas acessíveis em HTTPS;
- canal `natnaelsales@gmail.com` publicado;
- Política pública disponível em `/privacidade/` e URL registrada na configuração local do aplicativo.

## Critérios restantes antes da publicação comercial do aplicativo

Obter revisão jurídica; concluir a revisão de acessibilidade, metadados e contraste; confirmar se a página de apoio é compatível com os termos da hospedagem; manter `yarn typecheck`, `yarn build` e auditoria de dependências como gates; cadastrar a URL pública da política na Play Console.

## Limites e riscos

O GitHub informa que Pages é público e não deve ser usado como hospedagem gratuita para um site cuja finalidade principal seja comércio ou SaaS. Este protótipo é informativo/legal e não processa transações. Se a monetização ou doação se tornar finalidade relevante, migrar para hospedagem comercial apropriada antes de ativar a área bancária.

As imagens em `public/screenshots/` são prévias de direção visual. A listagem da Play deve usar capturas reais do binário homologado, nos tamanhos e requisitos vigentes no dia da submissão.

## Mockups previstos

- desktop: cabeçalho fixo, hero em duas colunas, quadro da jornada e cards de princípios;
- mobile: navegação horizontal, hero empilhado, botões com altura confortável e galeria em uma coluna;
- páginas legais: leitura em coluna estreita, seções separadas e contato sempre localizável;
- apoio: dados desabilitados com explicação até a confirmação bancária.
