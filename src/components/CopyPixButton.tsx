'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, WarningCircle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

type CopyPixButtonProps = {
  pixKey: string;
};

export function CopyPixButton({ pixKey }: CopyPixButtonProps) {
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
      {status === 'copied' ? 'Chave PIX copiada' : null}
      {status === 'error' ? 'Não foi possível copiar' : null}
      {status === 'idle' ? 'Copiar chave PIX' : null}
    </Button>
  );
}
