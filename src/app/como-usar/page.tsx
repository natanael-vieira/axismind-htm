import { CheckCircle, DownloadSimple, Microphone, Notebook, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { PageIntro } from '@/components/PageIntro';

const steps = [
  { icon: ShieldCheck, title: 'Crie seu cofre', body: 'Leia os documentos, confirme que tem 18 anos ou mais e defina uma senha forte. Ela protege o cofre local e não é enviada para nós.' },
  { icon: Notebook, title: 'Registre o momento', body: 'Use texto, humor rápido, check-in ou consciência corporal. Você escolhe quais informações deseja guardar.' },
  { icon: Microphone, title: 'Se preferir, fale', body: 'Baixe o modelo local de transcrição, grave e revise o texto. Só confirme quando ele representar o que você quis dizer.' },
  { icon: CheckCircle, title: 'Revise sem rótulos', body: 'As perguntas de reflexão são abertas e conservadoras. Elas não definem diagnóstico, emoção ou tratamento.' },
  { icon: DownloadSimple, title: 'Leve seu histórico', body: 'Escolha um período para gerar PDF ou exporte o cofre criptografado. Guarde os arquivos com cuidado.' },
] as const;

export default function HowToPage() {
  return (
    <>
      <PageIntro eyebrow="Guia de uso" title="Comece com calma e mantenha você no controle.">
        <p>O axismind organiza registros pessoais no próprio aparelho. Nenhuma etapa exige que você conclua o que sente ou compartilhe um relato.</p>
      </PageIntro>
      <section className="axis-container grid gap-5 lg:grid-cols-2">
        {steps.map(({ icon: Icon, title, body }, index) => (
          <article key={title} className="soft-card flex gap-5 p-6 sm:p-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-axis-muted text-axis-teal"><Icon size={27} /></div>
            <div><p className="text-xs font-bold uppercase tracking-widest text-axis-clay">Passo {index + 1}</p><h2 className="mt-2 text-2xl font-bold">{title}</h2><p className="mt-3 leading-7 text-axis-body">{body}</p></div>
          </article>
        ))}
      </section>
      <section className="axis-container py-16">
        <div className="soft-card border-l-4 border-l-axis-clay p-7 sm:p-9">
          <h2 className="text-2xl font-bold">Se você precisar de ajuda imediata</h2>
          <p className="mt-3 max-w-3xl leading-7 text-axis-body">O aplicativo oferece atalhos acionados por você, mas não monitora crises nem chama socorro automaticamente. No Brasil, o CVV atende pelo 188. Em emergência médica, procure o serviço de emergência local.</p>
        </div>
      </section>
    </>
  );
}
