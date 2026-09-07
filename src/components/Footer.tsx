import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { site } from '@/content/site';
import { useI18n } from '@/i18n/LocaleProvider';

export function Footer() {
  const { messages: m } = useI18n();
  return (
    <footer className="mt-24 border-t border-axis-line bg-axis-surface">
      <div className="axis-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandMark compact />
          <p className="max-w-md text-sm leading-6 text-axis-body">
            {m.footer.description}
          </p>
        </div>
        <div>
          <h2 className="footer-title">{m.footer.information}</h2>
          <ul className="footer-list">
            <li><Link href="/como-usar/">{m.navigation.how}</Link></li>
            <li><Link href="/seguranca/">{m.navigation.security}</Link></li>
            <li><Link href="/privacidade/">{m.navigation.privacy}</Link></li>
            <li><Link href="/termos/">{m.footer.terms}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">{m.footer.contact}</h2>
          <p className="text-sm leading-6 text-axis-body">{site.controller}<br />{site.controllerLocation}</p>
          <a className="mt-3 inline-block text-sm font-bold text-axis-teal underline-offset-4 hover:underline" href={`mailto:${site.privacyEmail}`}>
            {site.privacyEmail}
          </a>
        </div>
      </div>
      <div className="border-t border-axis-line py-5 text-center text-xs text-axis-body">
        © {new Date().getFullYear()} axismind · {m.footer.copyright}
      </div>
    </footer>
  );
}
