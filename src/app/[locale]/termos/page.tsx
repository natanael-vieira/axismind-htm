import { LegalArticle } from '@/components/LegalArticle';
import { PageIntro } from '@/components/PageIntro';
import { site } from '@/content/site';
import { messages } from '@/i18n/messages';
import { Locale } from '@/i18n/types';
import { interpolate } from '@/i18n/utils';

export default function TermsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const m = messages[locale];
  const variables = { controller: site.controller, location: site.controllerLocation, email: site.privacyEmail, age: site.minimumAge };
  const versionLabel: Record<Locale, string> = { 'pt-BR': 'Versão', en: 'Version', es: 'Versión', it: 'Versione', fr: 'Version', ru: 'Версия', de: 'Version', 'zh-CN': '版本', ja: 'バージョン', ko: '버전', ar: 'الإصدار', he: 'גרסה' };
  return (
    <>
      <PageIntro eyebrow={`${versionLabel[locale]} ${site.legalVersion}`} title={m.terms.title}>
        <p>{m.terms.intro}</p>
      </PageIntro>
      <LegalArticle>
        <section><h2>{m.terms.s1}</h2><p>{interpolate(m.terms.body1, variables)}</p></section>
        <section><h2>{m.terms.s2}</h2><p>{interpolate(m.terms.body2, variables)}</p></section>
        <section><h2>{m.terms.s3}</h2><p>{m.terms.body3}</p></section>
        <section><h2>{m.terms.s4}</h2><p>{m.terms.body4}</p></section>
        <section><h2>{m.terms.s5}</h2><p>{m.terms.body5}</p></section>
        <section><h2>{m.terms.s6}</h2><p>{m.terms.body6}</p></section>
        <section><h2>{m.terms.s7}</h2><p>{m.terms.body7}</p></section>
        <section><h2>{m.terms.s8}</h2><p>{m.terms.body8}</p></section>
      </LegalArticle>
    </>
  );
}
