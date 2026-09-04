import { Heart, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { PageIntro } from '@/components/PageIntro';
import { site } from '@/content/site';

export const metadata = { title: 'Apoie o projeto' };

export default function SupportPage() {
  const { support } = site;
  return (
    <>
      <PageIntro eyebrow="Apoio transparente" title="Ajude o axismind a continuar cuidadoso e independente.">
        <p>Esta área foi preparada para uma futura forma voluntária de apoio. Ela não oferece recursos extras no aplicativo e não condiciona atendimento.</p>
      </PageIntro>
      <section className="axis-container grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <article className="soft-card p-7 sm:p-10">
          <Heart size={38} className="text-axis-clay" />
          <h2 className="mt-6 text-3xl font-bold">Dados para apoio</h2>
          {support.enabled ? (
            <dl className="mt-6 grid gap-4"><div><dt className="text-sm text-axis-body">Beneficiário</dt><dd className="font-bold">{support.beneficiary}</dd></div><div><dt className="text-sm text-axis-body">Instituição</dt><dd className="font-bold">{support.institution}</dd></div><div><dt className="text-sm text-axis-body">Chave PIX</dt><dd className="font-bold">{support.pixKey}</dd></div></dl>
          ) : (
            <div className="mt-6 rounded-2xl bg-axis-muted p-5"><p className="font-bold">Informações ainda não cadastradas</p><p className="mt-2 text-sm leading-6 text-axis-body">Os dados serão publicados somente depois da confirmação do beneficiário e da finalidade.</p></div>
          )}
        </article>
        <aside className="soft-card p-7 sm:p-10">
          <ShieldCheck size={38} className="text-axis-teal" />
          <h2 className="mt-6 text-2xl font-bold">Segurança</h2>
          <p className="mt-4 leading-7 text-axis-body">O site nunca solicitará senha bancária, código de autenticação, foto de documento ou dados do cartão. Prefira uma chave PIX aleatória ou institucional em vez de CPF.</p>
          <p className="mt-4 text-sm leading-6 text-axis-body">Em caso de dúvida, confirme pelo canal oficial: <a className="font-bold underline" href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.</p>
        </aside>
      </section>
    </>
  );
}
