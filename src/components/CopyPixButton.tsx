'use client';

import { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';

type CopyPixButtonProps = {
  pixKey: string;
};

export function CopyPixButton({ pixKey }: CopyPixButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyPixKey() {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <button
      type="button"
      onClick={copyPixKey}
      className="button-primary mt-5 gap-2"
      aria-live="polite"
    >
      {copied ? <Check size={20} weight="bold" /> : <Copy size={20} weight="bold" />}
      {copied ? 'Chave PIX copiada' : 'Copiar chave PIX'}
    </button>
  );
}
