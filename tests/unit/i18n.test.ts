import { describe, expect, it } from 'vitest';
import { isRtl, localeLabels, locales, messages } from '@/i18n/messages';

describe('catálogo de internacionalização', () => {
  it('expõe os cinco idiomas suportados', () => {
    expect(locales).toEqual(['pt-BR', 'en', 'es', 'it', 'fr', 'ru', 'de', 'zh-CN', 'ja', 'ko', 'ar', 'he']);
    expect(Object.keys(localeLabels)).toHaveLength(locales.length);
  });

  it('marca somente árabe e hebraico como RTL', () => {
    expect(locales.filter(isRtl)).toEqual(['ar', 'he']);
    expect(isRtl('en')).toBe(false);
  });

  it('mantém as chaves principais completas em todos os idiomas', () => {
    const keys = Object.keys(messages['pt-BR']);

    for (const locale of locales) {
      expect(Object.keys(messages[locale])).toEqual(keys);
      expect(messages[locale].navigation.home).not.toBe('');
      expect(messages[locale].home.title).not.toBe('');
    }
  });

  it('permite interpolar valores dinâmicos sem traduzir os dados', () => {
    expect(messages.en.privacy.body1).toContain('{email}');
    expect(messages.fr.privacy.body8).toContain('{age}');
  });
});
