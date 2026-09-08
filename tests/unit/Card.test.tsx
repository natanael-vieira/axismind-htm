import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '@/components/ui/card';

describe('Card', () => {
  it('preserva o fundo escuro original na variação de destaque', () => {
    render(<Card tone="dark">Transparência</Card>);

    expect(screen.getByText('Transparência')).toHaveClass('bg-axis-ink', 'text-axis-surface');
    expect(screen.getByText('Transparência')).not.toHaveClass('bg-axis-surface/90');
  });
});
