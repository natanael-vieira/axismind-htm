'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, WarningCircle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

type CopyPixButtonProps = {
  pixKey: string;
  labels: { idle: string; copied: string; error: string };
};

export function CopyPixButton({ pixKey, labels }: CopyPixButtonProps) {
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
      {status === 'copied' ? labels.copied : null}
      {status === 'error' ? labels.error : null}
      {status === 'idle' ? labels.idle : null}
    </Button>
  );
}
