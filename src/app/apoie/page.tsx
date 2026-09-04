import Image from 'next/image';
import { Heart, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { CopyPixButton } from '@/components/CopyPixButton';
import { PageIntro } from '@/components/PageIntro';
import { publicPath, site } from '@/content/site';

export const metadata = { title: 'Apoie o projeto' };

export default function SupportPage() {
  const { support } = site;
  return (
    <>
      <PageIntro eyebrow="Apoio transparente" title="Ajude o axismind a continuar cuidadoso e independente.">
        <p>O apoio é voluntário, não oferece recursos extras no aplicativo e não condiciona atendimento. Qualquer valor ajuda a manter o projeto.</p>
      </PageIntro>
      <section className="axis-container grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <article className="soft-card p-7 sm:p-10">
          <Heart size={38} className="text-axis-clay" />
          <h2 className="mt-6 text-3xl font-bold">Dados para apoio</h2>
          {support.enabled ? (
            <div className="mt-7 grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_15rem]">
              <div>
                <dl className="grid gap-5">
                  <div><dt className="text-sm text-axis-body">Beneficiário</dt><dd className="mt-1 font-bold">{support.beneficiary}</dd></div>
                  <div><dt className="text-sm text-axis-body">Chave PIX (e-mail)</dt><dd className="mt-1 break-all font-bold">{support.pixKey}</dd></div>
                </dl>
                <CopyPixButton pixKey={support.pixKey} />
                <p className="mt-4 text-sm leading-6 text-axis-body">O QR Code não define um valor: escolha quanto deseja apoiar no aplicativo do seu banco.</p>
              </div>
              <figure className="rounded-3xl border border-axis-line bg-white p-4 text-center">
                <Image src={publicPath(support.pixQrCode)} width={720} height={720} alt={`QR Code PIX para a chave ${support.pixKey}`} className="h-auto w-full" />
                <figcaption className="mt-3 text-sm font-bold text-axis-ink">Escaneie para apoiar via PIX</figcaption>
              </figure>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-axis-muted p-5"><p className="font-bold">Informações ainda não cadastradas</p><p className="mt-2 text-sm leading-6 text-axis-body">Os dados serão publicados somente depois da confirmação do beneficiário e da finalidade.</p></div>
          )}
        </article>
        <aside className="soft-card p-7 sm:p-10">
          <ShieldCheck size={38} className="text-axis-teal" />
          <h2 className="mt-6 text-2xl font-bold">Segurança</h2>
          <p className="mt-4 leading-7 text-axis-body">O site nunca solicitará senha bancária, código de autenticação, foto de documento ou dados do cartão. Prefira uma chave PIX aleatória ou institucional em vez de CPF.</p>
          <p className="mt-4 text-sm leading-6 text-axis-body">Em caso de dúvida, confirme pelo canal oficial: <a className="font-bold underline" href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.</p>
          <div className="mt-7 rounded-2xl bg-axis-muted p-5">
            <p className="font-bold">Apoio internacional</p>
            <p className="mt-2 text-sm leading-6 text-axis-body">Uma opção para contribuições internacionais será adicionada futuramente.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
