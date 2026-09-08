export const locales = ['pt-BR', 'en', 'es', 'it', 'fr', 'ru', 'de', 'zh-CN', 'ja', 'ko', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export function isRtl(locale: Locale) {
  return locale === 'ar' || locale === 'he';
}

export function interpolate(value: string, variables: Record<string, string | number> = {}) {
  return value.replace(/\{(\w+)\}/g, (_, key: string) => String(variables[key] ?? `{${key}}`));
}
