'use client';

import { useI18n } from '@/i18n/LocaleProvider';

export function SkipLink() {
  const { messages: m } = useI18n();
  return <a href="#conteudo" className="skip-link">{m.accessibility.skip}</a>;
}
