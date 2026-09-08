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

  it('mantém cada idioma isolado dos demais', () => {
    expect(messages.en.how.eyebrow).toBe('Usage guide');
    expect(messages.es.how.eyebrow).toBe('Guía de uso');
    expect(messages.fr.how.eyebrow).toBe('Guide d’utilisation');
    expect(messages.en.how.eyebrow).not.toBe(messages.fr.how.eyebrow);
  });

  it('mantém as chaves principais completas em todos os idiomas', () => {
    const keys = Object.keys(messages['pt-BR']);

    for (const locale of locales) {
      expect(Object.keys(messages[locale])).toEqual(keys);
      expect(messages[locale].navigation.home).not.toBe('');
      expect(messages[locale].home.title).not.toBe('');
    }
  });

  it('mantém textos visíveis da galeria e acessibilidade no idioma selecionado', () => {
    expect(messages['pt-BR'].gallery.item1Title).toBe('Jornada principal');
    expect(messages.en.gallery.item1Title).toBe('Main journey');
    expect(messages.es.gallery.item1Title).toBe('Jornada principal');
    expect(messages.en.accessibility.skip).toBe('Skip to content');
    expect(messages.es.accessibility.skip).toBe('Saltar al contenido');
    expect(messages.fr.accessibility.mainNav).toBe('Navigation principale');
  });

  it('permite interpolar valores dinâmicos sem traduzir os dados', () => {
    expect(messages.en.privacy.body1).toContain('{email}');
    expect(messages.fr.privacy.body8).toContain('{age}');
  });

  it('não herda textos em inglês nos catálogos dos demais idiomas', () => {
    const flatten = (value: object, prefix = ''): Record<string, string> =>
      Object.entries(value).reduce<Record<string, string>>((result, [key, child]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        return typeof child === 'object'
          ? { ...result, ...flatten(child, path) }
          : { ...result, [path]: child };
      }, {});
    const english = flatten(messages.en);
    const allowedSameValues: Partial<Record<(typeof locales)[number], string[]>> = {
      es: ['meta.siteTitle', 'meta.homeTitle', 'meta.howTitle', 'meta.securityTitle', 'meta.privacyTitle', 'meta.termsTitle', 'meta.supportTitle'],
      it: ['meta.siteTitle', 'navigation.privacy'],
      fr: ['meta.siteTitle', 'footer.contact'],
    };

    for (const locale of locales.filter((item) => item !== 'pt-BR' && item !== 'en')) {
      const catalog = flatten(messages[locale]);
      const inherited = Object.keys(english).filter(
        (path) => catalog[path] === english[path]
          && !path.startsWith('meta.siteTitle')
          && !(allowedSameValues[locale] ?? []).includes(path),
      );
      expect(inherited, `${locale} contém textos herdados do inglês`).toEqual([]);
    }
  });

  it('preserva variáveis dinâmicas em todos os idiomas', () => {
    const placeholders = (value: string) => [...value.matchAll(/\{\w+\}/g)].map(([match]) => match).sort();

    for (const locale of locales) {
      expect(placeholders(messages[locale].privacy.body1)).toEqual(['{controller}', '{email}', '{location}']);
      expect(placeholders(messages[locale].privacy.body8)).toEqual(['{age}']);
      expect(placeholders(messages[locale].terms.body1)).toEqual(['{controller}', '{email}', '{location}']);
      expect(placeholders(messages[locale].terms.body2)).toEqual(['{age}']);
    }
  });
});
