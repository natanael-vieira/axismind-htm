import { LegalArticle } from '@/components/LegalArticle';
import { PageIntro } from '@/components/PageIntro';
import { site } from '@/content/site';
import { messages } from '@/i18n/messages';
import { Locale } from '@/i18n/types';
import { interpolate } from '@/i18n/utils';

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const m = messages[locale];
  const variables = { controller: site.controller, location: site.controllerLocation, email: site.privacyEmail, age: site.minimumAge };
  const versionLabel: Record<Locale, string> = { 'pt-BR': 'Versão', en: 'Version', es: 'Versión', it: 'Versione', fr: 'Version', ru: 'Версия', de: 'Version', 'zh-CN': '版本', ja: 'バージョン', ko: '버전', ar: 'الإصدار', he: 'גרסה' };
  return (
    <>
      <PageIntro eyebrow={`${versionLabel[locale]} ${site.legalVersion}`} title={m.privacy.title}>
        <p>{m.privacy.intro}</p>
      </PageIntro>
      <LegalArticle>
        <section><h2>{m.privacy.s1}</h2><p>{interpolate(m.privacy.body1, variables)}</p></section>
        <section><h2>{m.privacy.s2}</h2><p>{m.privacy.body2}</p></section>
        <section><h2>{m.privacy.s3}</h2><p>{m.privacy.body3}</p></section>
        <section><h2>{m.privacy.s4}</h2><p>{m.privacy.body4}</p></section>
        <section><h2>{m.privacy.s5}</h2><p>{m.privacy.body5}</p></section>
        <section><h2>{m.privacy.s6}</h2><p>{m.privacy.body6}</p></section>
        <section><h2>{m.privacy.s7}</h2><p>{m.privacy.body7}</p></section>
        <section><h2>{m.privacy.s8}</h2><p>{interpolate(m.privacy.body8, variables)}</p></section>
      </LegalArticle>
    </>
  );
}
