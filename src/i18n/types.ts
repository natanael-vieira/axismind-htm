import { ptBR } from './messages/pt-BR';

type Widen<T> = { -readonly [K in keyof T]: T[K] extends string ? string : T[K] extends object ? Widen<T[K]> : T[K] };
export type Messages = Widen<typeof ptBR>;

export const locales = ['pt-BR', 'en', 'es', 'it', 'fr', 'ru', 'de', 'zh-CN', 'ja', 'ko', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  'pt-BR': 'Português (Brasil)',
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  fr: 'Français',
  ru: 'Русский',
  de: 'Deutsch',
  'zh-CN': '简体中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  he: 'עברית',
};
