import { CheckCircle, DownloadSimple, Microphone, Notebook, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { PageIntro } from '@/components/PageIntro';
import { Card } from '@/components/ui/card';
import { publicPath } from '@/content/site';
import { messages } from '@/i18n/messages';
import { Locale } from '@/i18n/types';

const steps = [
  { icon: ShieldCheck, title: 'step1Title', body: 'step1Body' },
  { icon: Notebook, title: 'step2Title', body: 'step2Body' },
  { icon: Microphone, title: 'step3Title', body: 'step3Body' },
  { icon: CheckCircle, title: 'step4Title', body: 'step4Body' },
  { icon: DownloadSimple, title: 'step5Title', body: 'step5Body' },
] as const;

export default function HowToPage({ params }: { params: { locale: Locale } }) {
  const m = messages[params.locale];
  return (
    <>
      <PageIntro eyebrow={m.how.eyebrow} title={m.how.title}>
        <p>{m.how.intro}</p>
      </PageIntro>
      <section className="axis-container grid gap-5 lg:grid-cols-2">
        {steps.map(({ icon: Icon, title, body }, index) => (
          <Card key={title} className="flex gap-5 p-6 sm:p-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-axis-muted text-axis-teal"><Icon size={27} /></div>
            <div><p className="text-xs font-bold uppercase tracking-widest text-axis-clay">{m.how.stepLabel} {index + 1}</p><h2 className="mt-2 text-2xl font-bold">{m.how[title as keyof typeof m.how]}</h2><p className="mt-3 leading-7 text-axis-body">{m.how[body as keyof typeof m.how]}</p></div>
          </Card>
        ))}
      </section>
      <section className="axis-container pt-12">
        <Card className="grid items-center gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,430px)] lg:p-12">
          <div>
            <p className="eyebrow">{m.how.demoEyebrow}</p>
            <h2 className="mt-4 text-3xl font-normal sm:text-4xl">{m.how.demoTitle}</h2>
            <p className="mt-4 max-w-xl leading-7 text-axis-body">
              {m.how.demoBody}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[360px] rounded-[3rem] border-[10px] border-axis-ink bg-axis-ink p-1 shadow-[0_28px_70px_rgba(35,54,57,0.24)]">
            <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-axis-ink" />
            <span aria-hidden="true" className="absolute -right-[14px] top-36 h-20 w-1 rounded-r-full bg-axis-ink" />
            <Image
              src={publicPath('/media/axismind-como-usar.gif')}
              width={320}
              height={712}
              unoptimized
              alt={m.how.demoAlt}
              className="h-auto w-full rounded-[2.25rem] bg-axis-surface object-contain"
            />
          </div>
        </Card>
      </section>
      <section className="axis-container py-16">
        <Card className="border-l-4 border-l-axis-clay p-7 sm:p-9">
          <h2 className="text-2xl font-bold">{m.how.helpTitle}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-axis-body">{m.how.helpBody}</p>
        </Card>
      </section>
    </>
  );
}
