import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NavigationLinks } from '@/components/NavigationLinks';

let pathname = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
}));

describe('NavigationLinks', () => {
  beforeEach(() => {
    pathname = '/';
  });

  it('marca Início como a página atual e aplica o destaque laranja', () => {
    render(<NavigationLinks variant="desktop" />);

    const activeLink = screen.getByRole('link', { name: 'Início' });
    expect(activeLink).toHaveAttribute('aria-current', 'page');
    expect(activeLink).toHaveClass('nav-link-active');
    expect(screen.getByRole('link', { name: 'Como usar' })).not.toHaveAttribute('aria-current');
  });

  it('acompanha a rota atual nas páginas internas e no menu móvel', () => {
    pathname = '/privacidade/';
    render(<NavigationLinks variant="mobile" />);

    const activeLink = screen.getByRole('link', { name: 'Privacidade' });
    expect(activeLink).toHaveAttribute('aria-current', 'page');
    expect(activeLink).toHaveClass('nav-pill-active');
  });
});
