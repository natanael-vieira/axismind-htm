'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/content/site';

type NavigationLinksProps = {
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

export function NavigationLinks({ variant }: NavigationLinksProps) {
  const pathname = normalizePathname(usePathname());

  return navigation.filter((item) => item.href !== supportItem.href).map((item) => {
    const active = pathname === item.href;
    const baseClass = variant === 'desktop' ? 'nav-link focus-ring' : 'nav-pill focus-ring';
    const activeClass = active
      ? variant === 'desktop'
        ? ' nav-link-active'
        : ' nav-pill-active'
      : '';

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={`${baseClass}${activeClass}`}
      >
        {item.label}
      </Link>
    );
  });
}

export function SupportLink({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const pathname = normalizePathname(usePathname());
  const active = pathname === supportItem.href;
  const mobile = variant === 'mobile';
  const visibilityClass = mobile ? 'w-full lg:hidden' : 'hidden lg:inline-flex';

  return (
    <Link
      href={supportItem.href}
      aria-current={active ? 'page' : undefined}
      className={`nav-support focus-ring ${visibilityClass}${active ? ' nav-support-active' : ''}`}
    >
      {supportItem.label}
    </Link>
  );
}
