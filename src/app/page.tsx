import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, DeviceMobile, FilePdf, LockKey, Waveform } from '@phosphor-icons/react/dist/ssr';
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
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/como-usar/" className="button-primary gap-2">Entenda como funciona <ArrowRight size={20} weight="bold" /></Link>
            <Link href="/privacidade/" className="button-secondary">Como protegemos seus dados</Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-axis-body">Para maiores de 18 anos. O axismind não diagnostica, prescreve ou substitui profissionais e serviços de emergência.</p>
        </div>
        <div className="soft-card relative overflow-hidden p-3 sm:p-5">
          <div className="wave-rule mb-4" />
          <Image src={publicPath('/screenshots/jornada-principal.png')} width={1536} height={1024} alt={screenshots[0].alt} priority className="h-auto w-full rounded-[1.25rem]" />
        </div>
      </section>

      <section className="axis-container py-16" aria-labelledby="principios">
        <p className="eyebrow">Princípios do produto</p>
        <h2 id="principios" className="mt-4 max-w-3xl text-balance text-3xl font-normal sm:text-5xl">Uma ferramenta de organização pessoal, não uma avaliação clínica.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <article key={title} className="soft-card p-6">
              <span className="inline-flex rounded-2xl bg-axis-muted p-3 text-axis-teal"><Icon size={28} /></span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-axis-body">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="axis-container py-16" aria-labelledby="telas">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Prévia do aplicativo</p>
            <h2 id="telas" className="mt-4 text-3xl font-normal sm:text-5xl">Conheça a experiência</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-axis-body">Estas imagens apresentam a direção visual. As capturas definitivas da Play Store serão feitas diretamente no candidato homologado.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {screenshots.map((shot) => (
            <figure key={shot.src} className="soft-card overflow-hidden p-3">
              <Image src={publicPath(shot.src)} width={1536} height={1024} alt={shot.alt} className="h-auto w-full rounded-[1.25rem]" />
              <figcaption className="px-4 py-4 font-bold">{shot.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="axis-container py-16">
        <div className="overflow-hidden rounded-[2.5rem] bg-axis-ink px-7 py-12 text-axis-surface sm:px-12 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-axis-peach">Transparência desde o início</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-normal sm:text-5xl">Saiba o que fica no aparelho e o que só sai por sua escolha.</h2>
          </div>
          <Link href="/privacidade/" className="mt-8 inline-flex min-h-14 items-center rounded-full bg-axis-surface px-7 font-bold text-axis-ink lg:mt-0">Ler Política de Privacidade</Link>
        </div>
      </section>
    </>
  );
}
