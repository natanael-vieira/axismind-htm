import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyPixButton } from '@/components/CopyPixButton';

const pixKey = 'natnaelsales@gmail.com';

describe('CopyPixButton', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('copia exatamente a chave Pix e confirma a ação', async () => {
    render(<CopyPixButton pixKey={pixKey} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copiar chave PIX' }));

    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith(pixKey));
    expect(screen.getByRole('button', { name: 'Chave PIX copiada' })).toBeVisible();
  });

  it('informa a falha sem apresentar uma confirmação falsa', async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error('clipboard indisponível'));
    render(<CopyPixButton pixKey={pixKey} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copiar chave PIX' }));

    expect(await screen.findByRole('button', { name: 'Não foi possível copiar' })).toBeVisible();
    expect(screen.queryByText('Chave PIX copiada')).not.toBeInTheDocument();
  });
});
