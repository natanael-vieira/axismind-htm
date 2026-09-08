import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { NavigationLinks, SupportLink } from './NavigationLinks';
import { Locale } from '@/i18n/types';
import { messages } from '@/i18n/messages';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ locale }: { locale: Locale }) {
  const m = messages[locale];
  return (
    <header className="sticky top-0 z-50 border-b border-axis-line/70 bg-axis-canvas/90 backdrop-blur-xl">
      <div className="axis-container flex min-h-20 items-center justify-between gap-6">
        <Link href={`/${locale}/`} className="rounded-full focus-ring">
          <BrandMark />
        </Link>
        <nav aria-label={m.accessibility.mainNav} className="hidden items-center gap-1 lg:flex">
          <NavigationLinks locale={locale} variant="desktop" />
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <SupportLink locale={locale} variant="desktop" />
        </div>
      </div>
      <nav aria-label={m.accessibility.mobileNav} className="axis-scrollbar flex gap-2 overflow-x-auto px-4 pb-4 pt-1 pr-8 lg:hidden">
        <NavigationLinks locale={locale} variant="mobile" />
      </nav>
      <div className="border-t border-axis-line/50 px-4 py-2 lg:hidden">
        <SupportLink locale={locale} variant="mobile" />
      </div>
    </header>
  );
}
