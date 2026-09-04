import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-axis-line bg-axis-surface">
      <div className="axis-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandMark compact />
          <p className="max-w-md text-sm leading-6 text-axis-body">
            Um diário pessoal local-first. Não oferece diagnóstico, prescrição, tratamento ou atendimento de emergência.
          </p>
        </div>
        <div>
          <h2 className="footer-title">Informações</h2>
          <ul className="footer-list">
            <li><Link href="/como-usar/">Como usar</Link></li>
            <li><Link href="/privacidade/">Privacidade</Link></li>
            <li><Link href="/termos/">Termos de uso</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Contato</h2>
          <p className="text-sm leading-6 text-axis-body">{site.controller}<br />{site.controllerLocation}</p>
          <a className="mt-3 inline-block text-sm font-bold text-axis-teal underline-offset-4 hover:underline" href={`mailto:${site.privacyEmail}`}>
            {site.privacyEmail}
          </a>
        </div>
      </div>
      <div className="border-t border-axis-line py-5 text-center text-xs text-axis-body">
        © {new Date().getFullYear()} axismind · conteúdo informativo
      </div>
    </footer>
  );
}
