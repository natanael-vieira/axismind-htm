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
});
