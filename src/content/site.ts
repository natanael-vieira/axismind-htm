export const site = {
  name: 'axismind',
  title: 'Um espaço privado para organizar o que você sente',
  description:
    'Diário local de bem-estar emocional, com relatos, check-ins, lembretes e preparação para conversas de cuidado.',
  controller: 'Natanael Sales Vieira',
  controllerLocation: 'Palhoça, Santa Catarina, Brasil',
  privacyEmail: 'natnaelsales@gmail.com',
  minimumAge: 18,
  legalVersion: '2026-09-04.1',
  support: {
    enabled: false,
    beneficiary: null as string | null,
    institution: null as string | null,
    pixKey: null as string | null,
  },
} as const;

export const publicPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

export const navigation = [
  { href: '/', label: 'Início' },
  { href: '/como-usar/', label: 'Como usar' },
  { href: '/privacidade/', label: 'Privacidade' },
  { href: '/termos/', label: 'Termos' },
  { href: '/apoie/', label: 'Apoie o projeto' },
] as const;

export const screenshots = [
  {
    src: '/screenshots/jornada-principal.png',
    alt: 'Conjunto de telas do axismind com início, relato, gravação, reflexão, diário e privacidade',
    title: 'Jornada principal',
  },
  {
    src: '/screenshots/cuidado-e-consulta.png',
    alt: 'Telas de plano de cuidado e preparação para consulta',
    title: 'Cuidado e consulta',
  },
  {
    src: '/screenshots/entendimento.png',
    alt: 'Telas de entendimento e detalhes de observações',
    title: 'Entendimento sem diagnóstico',
  },
  {
    src: '/screenshots/exportacao.png',
    alt: 'Telas de exportação e recuperação do cofre local',
    title: 'Exportação sob controle da pessoa',
  },
] as const;
