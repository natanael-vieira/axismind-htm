'use client';

import Image from 'next/image';
import { Heart, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { CopyPixButton } from '@/components/CopyPixButton';
import { PageIntro } from '@/components/PageIntro';
import { publicPath, site } from '@/content/site';
import { Card } from '@/components/ui/card';
import { useI18n } from '@/i18n/LocaleProvider';

export default function SupportPage() {
  const { messages: m, translate } = useI18n();
  const { support } = site;
  return (
    <>
      <PageIntro eyebrow={m.support.eyebrow} title={m.support.title}>
        <p>{m.support.intro}</p>
      </PageIntro>
      <section className="axis-container grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <Card className="p-7 sm:p-10">
          <Heart size={38} className="text-axis-clay" />
          <h2 className="mt-6 text-3xl font-bold">{m.support.dataTitle}</h2>
          {support.enabled ? (
            <div className="mt-7 grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_15rem]">
              <div>
                <dl className="grid gap-5">
                  <div><dt className="text-sm text-axis-body">{m.support.beneficiary}</dt><dd className="mt-1 font-bold">{support.beneficiary}</dd></div>
                  <div><dt className="text-sm text-axis-body">{translate(m.support.pixKeyLabel, { email: support.pixKey })}</dt><dd className="mt-1 break-all font-bold">{support.pixKey}</dd></div>
                </dl>
                <CopyPixButton pixKey={support.pixKey} />
                <p className="mt-4 text-sm leading-6 text-axis-body">{m.support.qrHint}</p>
              </div>
              <figure className="rounded-3xl border border-axis-line bg-white p-4 text-center">
                <Image src={publicPath(support.pixQrCode)} width={720} height={720} alt={`QR Code PIX para a chave ${support.pixKey}`} className="h-auto w-full" />
                <figcaption className="mt-3 text-sm font-bold text-axis-ink">{m.support.qrCaption}</figcaption>
              </figure>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-axis-muted p-5"><p className="font-bold">{m.support.unavailableTitle}</p><p className="mt-2 text-sm leading-6 text-axis-body">{m.support.unavailableBody}</p></div>
          )}
        </Card>
        <Card className="p-7 sm:p-10">
          <ShieldCheck size={38} className="text-axis-teal" />
          <h2 className="mt-6 text-2xl font-bold">{m.support.securityTitle}</h2>
          <p className="mt-4 leading-7 text-axis-body">{m.support.securityBody}</p>
          <p className="mt-4 text-sm leading-6 text-axis-body">{m.support.doubt} <a className="font-bold underline" href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.</p>
          <div className="mt-7 rounded-2xl bg-axis-muted p-5">
            <p className="font-bold">{m.support.internationalTitle}</p>
            <p className="mt-2 text-sm leading-6 text-axis-body">{m.support.internationalBody}</p>
          </div>
        </Card>
      </section>
    </>
  );
}
