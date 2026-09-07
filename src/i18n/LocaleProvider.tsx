'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { interpolate, isRtl, messages, type Locale, type Messages } from './messages';

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  translate: (value: string, variables?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const fallbackContext: LocaleContextValue = {
  locale: 'pt-BR',
  messages: messages['pt-BR'],
  setLocale: () => undefined,
  translate: interpolate,
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR');

  useEffect(() => {
    const stored = window.localStorage.getItem('axismind-locale');
    if (stored && stored in messages) setLocaleState(stored as Locale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? 'rtl' : 'ltr';
    document.documentElement.dataset.locale = locale;
    document.title = messages[locale].meta.siteTitle;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    messages: messages[locale],
    setLocale: (nextLocale) => {
      window.localStorage.setItem('axismind-locale', nextLocale);
      setLocaleState(nextLocale);
    },
    translate: interpolate,
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);
  return context ?? fallbackContext;
}
