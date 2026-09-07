'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, DeviceMobile, FilePdf, LockKey, Waveform } from '@phosphor-icons/react/dist/ssr';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { publicPath, screenshots } from '@/content/site';
import { useI18n } from '@/i18n/LocaleProvider';

const features = [
  { icon: LockKey, title: 'feature1Title', body: 'feature1Body' },
  { icon: Waveform, title: 'feature2Title', body: 'feature2Body' },
  { icon: DeviceMobile, title: 'feature3Title', body: 'feature3Body' },
  { icon: FilePdf, title: 'feature4Title', body: 'feature4Body' },
] as const;

export default function HomePage() {
  const { messages: m } = useI18n();
  return (
    <>
      <section className="axis-container grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
        <div>
          <p className="eyebrow">{m.home.eyebrow}</p>
          <h1 className="mt-5 max-w-2xl text-balance text-5xl font-normal leading-[1.04] tracking-[-.04em] sm:text-7xl">{m.home.title}</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-axis-body">{m.home.description}</p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/como-usar/" className={buttonVariants({ className: 'w-full gap-2 px-4 text-sm leading-tight sm:w-auto sm:px-7 sm:text-base' })}>{m.home.primaryCta} <ArrowRight size={20} weight="bold" /></Link>
            <Link href="/seguranca/" className={buttonVariants({ variant: 'outline', className: 'w-full px-4 text-sm sm:w-auto sm:px-5' })}>{m.home.secondaryCta}</Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-axis-body">{m.home.disclaimer}</p>
        </div>
        <Card className="relative overflow-hidden p-3 sm:p-5">
          <div className="wave-rule mb-4" />
          <Image src={publicPath('/screenshots/jornada-principal.png')} width={1536} height={1100} alt={m.gallery.item1Alt} priority className="mx-auto h-auto w-full object-contain" />
        </Card>
      </section>

      <section className="axis-container py-16" aria-labelledby="principios">
        <p className="eyebrow">{m.home.principlesEyebrow}</p>
        <h2 id="principios" className="mt-4 max-w-3xl text-balance text-3xl font-normal sm:text-5xl">{m.home.principlesTitle}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-6">
              <span className="inline-flex rounded-2xl bg-axis-muted p-3 text-axis-teal"><Icon size={28} /></span>
              <h3 className="mt-5 text-xl font-bold">{m.home[title]}</h3>
              <p className="mt-3 text-sm leading-6 text-axis-body">{m.home[body]}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="axis-container py-16" aria-labelledby="telas">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{m.home.screenshotsEyebrow}</p>
            <h2 id="telas" className="mt-4 text-3xl font-normal sm:text-5xl">{m.home.screenshotsTitle}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-axis-body">{m.home.screenshotsDescription}</p>
        </div>
        <ScreenshotGallery screenshots={screenshots.map((shot) => ({ src: publicPath(shot.src) }))} />
      </section>

      <section className="axis-container py-16">
        <Card className="overflow-hidden rounded-[2.5rem] border-0 bg-axis-ink px-7 py-12 text-axis-surface shadow-none sm:px-12 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-axis-peach">{m.home.transparencyEyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-normal sm:text-5xl">{m.home.transparencyTitle}</h2>
          </div>
          <Link href="/seguranca/" className={buttonVariants({ variant: 'secondary', className: 'mt-8 lg:mt-0' })}>{m.home.transparencyCta}</Link>
        </Card>
      </section>
    </>
  );
}
