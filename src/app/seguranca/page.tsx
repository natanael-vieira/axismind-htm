import {
  CheckCircle,
  Database,
  EyeSlash,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import { PageIntro } from '@/components/PageIntro';

export const metadata = { title: 'Segurança' };

const controls = [
  {
    icon: Database,
    title: 'Cofre local criptografado',
    body: 'O conteúdo pessoal fica no banco SQLCipher do aparelho. A chave do cofre é protegida pelo armazenamento seguro do sistema.',
  },
  {
    icon: EyeSlash,
    title: 'Sem sincronização automática',
    body: 'O diário não é enviado para uma nuvem do axismind. Backup e PDF só saem do aparelho quando a própria pessoa escolhe exportar.',
  },
  {
    icon: ShieldCheck,
    title: 'Backup do sistema bloqueado',
    body: 'As regras do Android impedem que o conteúdo privado do aplicativo entre no backup automático ou na extração comum de dados.',
  },
  {
    icon: CheckCircle,
    title: 'Build Android analisado',
    body: 'O APK 1.5.16 de homologação passou por análise estática local com MobSF 4.5.2 e por auditoria do inventário JavaScript em 7 de setembro de 2026.',
  },
] as const;

export default function SecurityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Privacidade por arquitetura"
        title="Segurança local, explicada com transparência."
      >
        <p>
          O axismind foi desenhado para reduzir a exposição dos relatos: o dado
          pessoal permanece no aparelho e cada saída depende de uma ação
          explícita da pessoa.
        </p>
      </PageIntro>

      <section className="axis-container py-14" aria-labelledby="controles">
        <h2 id="controles" className="text-3xl font-normal sm:text-5xl">
          Controles presentes no aplicativo
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {controls.map(({ icon: Icon, title, body }) => (
            <article key={title} className="soft-card p-6 sm:p-8">
              <span className="inline-flex rounded-2xl bg-axis-muted p-3 text-axis-teal">
                <Icon size={30} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-axis-body">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="axis-container py-14" aria-labelledby="resultado">
        <div className="soft-card overflow-hidden p-7 sm:p-10">
          <div className="wave-rule mb-8" />
          <p className="eyebrow">Avaliação automatizada independente</p>
          <h2 id="resultado" className="mt-4 text-3xl font-normal sm:text-5xl">
            O que a análise estática encontrou
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-axis-muted p-5">
              <strong className="block text-3xl text-axis-teal">0</strong>
              <span className="mt-2 block text-sm leading-6 text-axis-body">
                trackers de privacidade detectados no APK analisado
              </span>
            </div>
            <div className="rounded-[1.5rem] bg-axis-muted p-5">
              <strong className="block text-3xl text-axis-teal">0</strong>
              <span className="mt-2 block text-sm leading-6 text-axis-body">
                achados de configuração de segurança de rede
              </span>
            </div>
            <div className="rounded-[1.5rem] bg-axis-muted p-5">
              <strong className="block text-3xl text-axis-teal">1.142</strong>
              <span className="mt-2 block text-sm leading-6 text-axis-body">
                combinações de pacote e versão consultadas sem advisory npm conhecido na data
              </span>
            </div>
          </div>
          <p className="mt-8 max-w-4xl text-sm leading-6 text-axis-body">
            Esta é uma fotografia automatizada do build de homologação, não uma
            certificação nem garantia de ausência de vulnerabilidades. Alertas
            foram revisados no contexto do aplicativo e a análise será repetida
            no artefato assinado para publicação. Testes manuais e atualização
            contínua das dependências continuam fazendo parte do processo.
          </p>
          <p className="mt-4 text-sm leading-6 text-axis-body">
            Ferramenta utilizada:{' '}
            <a
              className="font-bold text-axis-teal underline underline-offset-4"
              href="https://mobsf.github.io/docs/"
              rel="noreferrer"
              target="_blank"
            >
              Mobile Security Framework (MobSF)
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
