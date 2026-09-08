import { Locale } from './types';

export function isRtl(locale: Locale) {
  return locale === 'ar' || locale === 'he';
}

export function interpolate(value: string, variables: Record<string, string | number> = {}) {
  return value.replace(/\{(\w+)\}/g, (_, key: string) => String(variables[key] ?? `{${key}}`));
}
