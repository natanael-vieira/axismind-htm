'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, WarningCircle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/LocaleProvider';

type CopyPixButtonProps = {
  pixKey: string;
};

export function CopyPixButton({ pixKey }: CopyPixButtonProps) {
  const { messages: m } = useI18n();
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(pixKey);
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus('idle'), 2400);
  }

  return (
    <Button
      type="button"
      onClick={copyPixKey}
      className="mt-5 gap-2"
      aria-live="polite"
    >
      {status === 'copied' ? <Check size={20} weight="bold" /> : null}
      {status === 'error' ? <WarningCircle size={20} weight="bold" /> : null}
      {status === 'idle' ? <Copy size={20} weight="bold" /> : null}
      {status === 'copied' ? m.copy.copied : null}
      {status === 'error' ? m.copy.error : null}
      {status === 'idle' ? m.copy.idle : null}
    </Button>
  );
}
