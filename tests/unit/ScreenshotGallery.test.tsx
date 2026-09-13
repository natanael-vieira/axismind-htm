import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';

const screenshots = [
  { src: '/screenshots/1.png', title: 'Introdução ao diário', alt: 'Introdução ao diário — captura real do axismind em português do Brasil' },
  { src: '/screenshots/2.png', title: 'Privacidade no aparelho', alt: 'Privacidade no aparelho — captura real do axismind em português do Brasil' },
  { src: '/screenshots/3.png', title: 'Limites e consentimento', alt: 'Limites e consentimento — captura real do axismind em português do Brasil' },
  { src: '/screenshots/4.png', title: 'Boas-vindas ao diário', alt: 'Boas-vindas ao diário — captura real do axismind em português do Brasil' },
  { src: '/screenshots/5.png', title: 'Recursos de organização', alt: 'Recursos de organização — captura real do axismind em português do Brasil' },
] as const;

describe('ScreenshotGallery', () => {
  it('abre a captura escolhida em um diálogo e devolve o foco ao fechar', async () => {
    render(<ScreenshotGallery screenshots={screenshots} />);
    const trigger = screen.getByRole('button', { name: 'Ampliar imagem: Introdução ao diário' });

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog', { name: 'Introdução ao diário' })).toBeVisible();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
    const close = screen.getByRole('button', { name: 'Fechar imagem ampliada' });
    expect(close).toHaveFocus();

    fireEvent.click(close);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('fecha o zoom com Escape', async () => {
    render(<ScreenshotGallery screenshots={screenshots} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagem: Privacidade no aparelho' }));

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('ajusta o zoom com scroll e duplo clique', () => {
    render(<ScreenshotGallery screenshots={screenshots} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagem: Recursos de organização' }));

    const zoomTarget = screen.getByRole('application', { name: /Imagem ampliada/ });
    const image = within(zoomTarget).getByRole('img', { name: 'Recursos de organização — captura real do axismind em português do Brasil' });
    expect(image).toHaveStyle({ transform: 'translate3d(0px, 0px, 0) scale(1)' });

    fireEvent.doubleClick(zoomTarget);
    expect(image).toHaveStyle({ transform: 'translate3d(0px, 0px, 0) scale(2)' });

    fireEvent.wheel(zoomTarget, { deltaY: 100 });
    expect(image).toHaveStyle({ transform: 'translate3d(0px, 0px, 0) scale(1.85)' });
  });

  it('mantém o foco dentro do diálogo', () => {
    render(<ScreenshotGallery screenshots={screenshots} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagem: Introdução ao diário' }));

    const close = screen.getByRole('button', { name: 'Fechar imagem ampliada' });
    const zoomTarget = screen.getByRole('application', { name: /Imagem ampliada/ });
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });

    expect(zoomTarget).toHaveFocus();
  });
});
