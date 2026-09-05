'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/content/site';

type NavigationLinksProps = {
  variant: 'desktop' | 'mobile';
};

function normalizePathname(pathname: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const pathWithoutBase = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;

  if (!pathWithoutBase || pathWithoutBase === '/') return '/';
  return `/${pathWithoutBase.replace(/^\/+|\/+$/g, '')}/`;
}

export function NavigationLinks({ variant }: NavigationLinksProps) {
  const pathname = normalizePathname(usePathname());

  return navigation.map((item) => {
    const active = pathname === item.href;
    const support = item.href === '/apoie/';
    const baseClass = support
      ? 'nav-support focus-ring'
      : variant === 'desktop'
        ? 'nav-link focus-ring'
        : 'nav-pill focus-ring';
    const activeClass = active
      ? support
        ? ' nav-support-active'
        : variant === 'desktop'
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
