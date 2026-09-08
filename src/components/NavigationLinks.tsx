'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/content/site';
import { Locale } from '@/i18n/types';
import { messages } from '@/i18n/messages';

type NavigationLinksProps = {
  locale: Locale;
  variant: 'desktop' | 'mobile';
};

export function normalizePathname(pathname: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const pathWithoutBase = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;

  if (!pathWithoutBase || pathWithoutBase === '/') return '/';
  return `/${pathWithoutBase.replace(/^\/+|\/+$/g, '')}/`;
}

const supportItem = navigation.find((item) => item.href === '/apoie/')!;
const labels = {
  '/': 'home',
  '/como-usar/': 'how',
  '/seguranca/': 'security',
  '/privacidade/': 'privacy',
  '/termos/': 'terms',
  '/apoie/': 'support',
} as const;

export function NavigationLinks({ locale, variant }: NavigationLinksProps) {
  const pathname = normalizePathname(usePathname());
  const m = messages[locale];

  return navigation.filter((item) => item.href !== supportItem.href).map((item) => {
    const active = pathname.includes(item.href);
    const baseClass = variant === 'desktop' ? 'nav-link focus-ring' : 'nav-pill focus-ring';
    const activeClass = active
      ? variant === 'desktop'
        ? ' nav-link-active'
        : ' nav-pill-active'
      : '';

    return (
      <Link
        key={item.href}
        href={`/${locale}${item.href}`}
        aria-current={active ? 'page' : undefined}
        className={`${baseClass}${activeClass}`}
      >
        {m.navigation[labels[item.href as keyof typeof labels]]}
      </Link>
    );
  });
}

export function SupportLink({ locale, variant = 'desktop' }: { locale: Locale, variant?: 'desktop' | 'mobile' }) {
  const pathname = normalizePathname(usePathname());
  const m = messages[locale];
  const active = pathname.includes(supportItem.href);
  const mobile = variant === 'mobile';
  const visibilityClass = mobile ? 'w-full lg:hidden' : 'hidden lg:inline-flex';

  return (
    <Link
      href={`/${locale}${supportItem.href}`}
      aria-current={active ? 'page' : undefined}
      className={`nav-support focus-ring ${visibilityClass}${active ? ' nav-support-active' : ''}`}
    >
      {m.navigation.support}
    </Link>
  );
}
