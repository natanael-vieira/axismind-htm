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
    enabled: true,
    beneficiary: 'Natanael Sales Vieira',
    pixKey: 'natnaelsales@gmail.com',
    pixQrCode: '/brand/pix-qrcode.png',
  },
} as const;

export const publicPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

export const navigation = [
  { href: '/', label: 'Início' },
  { href: '/como-usar/', label: 'Como usar' },
  { href: '/seguranca/', label: 'Segurança' },
  { href: '/privacidade/', label: 'Privacidade' },
  { href: '/termos/', label: 'Termos' },
  { href: '/apoie/', label: 'Apoie o projeto' },
] as const;

const journeyScreenshotFiles = [
  '01-onboarding-introducao.png',
  '02-onboarding-privacidade.png',
  '03-onboarding-limites.png',
  '04-boas-vindas-diario.png',
  '05-boas-vindas-recursos.png',
  '06-boas-vindas-controle.png',
  '07-entrada-local.png',
  '08-perfil-vazio.png',
  '09-recorte-foto.png',
  '10-perfil-preenchido-sem-foto.png',
  '11-cadastro-restaurado-apos-reinicio.png',
  '12-perfil-com-foto.png',
  '13-home-thais-vieira.png',
  '14-perfil-aberto-pela-foto.png',
  '15-checkin-humor-preselecionado.png',
  '16-novo-relato-escala-1-a-5.png',
  '17-minhas-preferencias-sem-seletor-de-escala.png',
  '18-corpo-intensidade-qualitativa.png',
  '19-opcoes-de-conversa-cvv.png',
  '20-confirmacao-manual-cvv.png',
] as const;

const journeyScreenshotTitles = [
  'Introdução ao diário',
  'Privacidade no aparelho',
  'Limites e consentimento',
  'Boas-vindas ao diário',
  'Recursos de organização',
  'Controle sobre os dados',
  'Entrada no cofre local',
  'Criação do perfil',
  'Recorte da foto',
  'Dados do perfil preenchidos',
  'Cadastro restaurado após reinício',
  'Perfil com foto',
  'Home de Thais Vieira',
  'Perfil aberto pela foto da Home',
  'Humor pré-selecionado no check-in',
  'Relato com escala única de humor',
  'Preferências sem escala duplicada',
  'Intensidade corporal qualitativa',
  'Opções de conversa por país',
  'Confirmação antes de abrir o discador',
] as const;

export const screenshots = journeyScreenshotFiles.map((filename, index) => ({
  src: `/media/app-pt-BR/thais-vieira/${filename}`,
  title: journeyScreenshotTitles[index],
  alt: `${journeyScreenshotTitles[index]} — captura real do axismind em português do Brasil`,
}));
