'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, localeLabels, Locale } from '@/i18n/types';

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const pathParts = pathname.split('/');
    pathParts[1] = newLocale;
    const newPath = pathParts.join('/');
    router.push(newPath);
  };

  return (
    <label className="inline-flex items-center gap-2 text-xs font-bold text-axis-body">
      <select
        value={locale}
        onChange={(event) => handleChange(event.target.value)}
        aria-label="Language switcher"
        className="rounded-full border border-axis-line bg-axis-surface px-3 py-2 text-xs font-bold text-axis-ink outline-none focus:ring-2 focus:ring-axis-teal"
      >
        {locales.map((option) => (
          <option key={option} value={option}>
            {localeLabels[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
