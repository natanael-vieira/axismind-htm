import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { NavigationLinks, SupportLink } from './NavigationLinks';
import { localeLabels, locales } from '@/i18n/messages';
import { useI18n } from '@/i18n/LocaleProvider';

function LanguageSwitcher() {
  const { locale, messages: m, setLocale } = useI18n();

  return (
    <label className="inline-flex items-center gap-2 text-xs font-bold text-axis-body">
      <span className="sr-only">{m.language.label}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        aria-label={m.language.label}
        className="rounded-full border border-axis-line bg-axis-surface px-3 py-2 text-xs font-bold text-axis-ink outline-none focus:ring-2 focus:ring-axis-teal"
      >
        {locales.map((option) => <option key={option} value={option}>{localeLabels[option]}</option>)}
      </select>
    </label>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-axis-line/70 bg-axis-canvas/90 backdrop-blur-xl">
      <div className="axis-container flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="rounded-full focus-ring">
          <BrandMark />
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          <NavigationLinks variant="desktop" />
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <SupportLink />
        </div>
      </div>
      <nav aria-label="Navegação móvel" className="axis-scrollbar flex gap-2 overflow-x-auto px-4 pb-4 pt-1 pr-8 lg:hidden">
        <NavigationLinks variant="mobile" />
      </nav>
      <div className="border-t border-axis-line/50 px-4 py-2 lg:hidden">
        <SupportLink variant="mobile" />
      </div>
    </header>
  );
}
