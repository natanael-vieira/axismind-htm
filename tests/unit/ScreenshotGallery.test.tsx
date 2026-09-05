import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';

const screenshots = [
  { src: '/screenshots/1.png', alt: 'Mosaico um', title: 'Jornada principal' },
  { src: '/screenshots/2.png', alt: 'Mosaico dois', title: 'Cuidado e consulta' },
  { src: '/screenshots/3.png', alt: 'Mosaico três', title: 'Entendimento sem diagnóstico' },
  { src: '/screenshots/4.png', alt: 'Mosaico quatro', title: 'Exportação sob controle da pessoa' },
] as const;

describe('ScreenshotGallery', () => {
  it('abre o mosaico escolhido em um diálogo e devolve o foco ao fechar', async () => {
    render(<ScreenshotGallery screenshots={screenshots} />);
    const trigger = screen.getByRole('button', { name: 'Ampliar imagem: Jornada principal' });

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog', { name: 'Jornada principal' })).toBeVisible();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });

    fireEvent.click(screen.getByRole('button', { name: 'Fechar imagem ampliada' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('fecha o zoom com Escape', async () => {
    render(<ScreenshotGallery screenshots={screenshots} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagem: Cuidado e consulta' }));

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
