import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';
import { Messages } from '@/i18n/types';

const screenshots = [
  { src: '/screenshots/1.png', alt: 'Mosaico um', title: 'Jornada principal' },
  { src: '/screenshots/2.png', alt: 'Mosaico dois', title: 'Cuidado e consulta' },
  { src: '/screenshots/3.png', alt: 'Mosaico três', title: 'Entendimento sem diagnóstico' },
  { src: '/screenshots/4.png', alt: 'Mosaico quatro', title: 'Exportação sob controle da pessoa' },
] as const;

const mockMessages = {
  gallery: {
    enlarge: 'Ampliar',
    enlargeAria: 'Ampliar imagem: {title}',
    dialogAria: 'Imagem ampliada. Use scroll, duplo clique ou dois dedos para zoom; arraste para mover. Pressione Escape para fechar.',
    item1Title: 'Jornada principal',
    item2Title: 'Cuidado e consulta',
    item3Title: 'Entendimento sem diagnóstico',
    item4Title: 'Exportação sob controle da pessoa',
  }
} as unknown as Messages;

describe('ScreenshotGallery', () => {
  it('abre o mosaico escolhido em um diálogo e devolve o foco ao fechar', async () => {
    render(<ScreenshotGallery messages={mockMessages} screenshots={screenshots} />);
    const trigger = screen.getByRole('button', { name: 'Ampliar imagem: Jornada principal' });

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog', { name: 'Jornada principal' })).toBeVisible();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('fecha o zoom com Escape', async () => {
    render(<ScreenshotGallery messages={mockMessages} screenshots={screenshots} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagem: Cuidado e consulta' }));

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('ajusta o zoom com scroll e duplo clique', () => {
    render(<ScreenshotGallery messages={mockMessages} screenshots={screenshots} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagem: Jornada principal' }));

    const zoomTarget = screen.getByRole('application', { name: /Imagem ampliada/ });
    const image = within(zoomTarget).getByRole('img', { name: 'Mosaico um' });
    expect(image).toHaveStyle({ transform: 'translate3d(0px, 0px, 0) scale(1)' });

    fireEvent.doubleClick(zoomTarget);
    expect(image).toHaveStyle({ transform: 'translate3d(0px, 0px, 0) scale(2)' });

    fireEvent.wheel(zoomTarget, { deltaY: 100 });
    expect(image).toHaveStyle({ transform: 'translate3d(0px, 0px, 0) scale(1.85)' });
  });
});
