import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, DeviceMobile, FilePdf, LockKey, Waveform } from '@phosphor-icons/react/dist/ssr';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { publicPath, screenshots, site } from '@/content/site';

const features = [
  { icon: LockKey, title: 'Privado por padrão', body: 'Seus relatos ficam no cofre criptografado do aparelho. Não existe sincronização automática do diário.' },
  { icon: Waveform, title: 'Texto ou voz', body: 'Registre no seu ritmo e revise a transcrição antes de guardar qualquer conteúdo.' },
  { icon: DeviceMobile, title: 'Feito para o cotidiano', body: 'Check-ins, humor rápido, consciência corporal e lembretes opcionais em uma jornada acolhedora.' },
  { icon: FilePdf, title: 'Você escolhe quando compartilhar', body: 'Exporte períodos em PDF ou faça uma cópia criptografada para guardar onde preferir.' },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="axis-container grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
        <div>
          <p className="eyebrow">Cuidado pessoal, no seu ritmo</p>
          <h1 className="mt-5 max-w-2xl text-balance text-5xl font-normal leading-[1.04] tracking-[-.04em] sm:text-7xl">{site.title}</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-axis-body">{site.description}</p>
          <div className="mt-9 flex w-full flex-wrap gap-3 sm:w-auto">
            <Link href="/como-usar/" className={buttonVariants({ className: 'min-w-0 flex-1 gap-2 px-4 text-sm leading-tight sm:flex-none sm:px-7 sm:text-base' })}>Entenda como funciona <ArrowRight size={20} weight="bold" /></Link>
            <Link href="/seguranca/" className={buttonVariants({ variant: 'outline', className: 'min-w-0 flex-1 px-4 text-sm sm:flex-none sm:px-5' })}>Como protegemos seus dados</Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-axis-body">Para maiores de 18 anos. O axismind não diagnostica, prescreve ou substitui profissionais e serviços de emergência.</p>
        </div>
        <Card className="relative overflow-hidden p-3 sm:p-5">
          <div className="wave-rule mb-4" />
          <Image src={publicPath('/screenshots/jornada-principal.png')} width={1536} height={1100} alt={screenshots[0].alt} priority className="mx-auto h-auto w-full object-contain" />
        </Card>
      </section>

      <section className="axis-container py-16" aria-labelledby="principios">
        <p className="eyebrow">Princípios do produto</p>
        <h2 id="principios" className="mt-4 max-w-3xl text-balance text-3xl font-normal sm:text-5xl">Uma ferramenta de organização pessoal, não uma avaliação clínica.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-6">
              <span className="inline-flex rounded-2xl bg-axis-muted p-3 text-axis-teal"><Icon size={28} /></span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-axis-body">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="axis-container py-16" aria-labelledby="telas">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Prévia do aplicativo</p>
            <h2 id="telas" className="mt-4 text-3xl font-normal sm:text-5xl">Conheça a experiência</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-axis-body">Capturas reais do candidato Android 1.5.10, build 19, executado no perfil de demonstração Thais Vieira.</p>
        </div>
        <ScreenshotGallery screenshots={screenshots.map((shot) => ({ ...shot, src: publicPath(shot.src) }))} />
      </section>

      <section className="axis-container py-16">
        <Card className="overflow-hidden rounded-[2.5rem] border-0 bg-axis-ink px-7 py-12 text-axis-surface shadow-none sm:px-12 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-axis-peach">Transparência desde o início</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-normal sm:text-5xl">Saiba o que fica no aparelho e o que só sai por sua escolha.</h2>
          </div>
          <Link href="/seguranca/" className={buttonVariants({ variant: 'secondary', className: 'mt-8 lg:mt-0' })}>Conhecer os controles</Link>
        </Card>
      </section>
    </>
  );
}
