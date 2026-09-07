import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'unstyled';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-axis-teal text-axis-surface shadow-sm hover:-translate-y-0.5',
  outline: 'border border-axis-line bg-axis-surface text-axis-ink hover:border-axis-teal',
  secondary: 'bg-axis-surface text-axis-ink hover:-translate-y-0.5',
  ghost: 'bg-transparent text-axis-ink hover:bg-axis-muted',
  unstyled: '',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'min-h-14 px-7 py-3',
  sm: 'min-h-10 px-4 py-2 text-sm',
  lg: 'min-h-16 px-8 py-4',
  icon: 'h-10 w-10 p-0',
};

export function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: Pick<ButtonProps, 'variant' | 'size' | 'className'> = {}) {
  return cn(
    'inline-flex items-center justify-center rounded-full text-center font-bold transition-colors transition-transform focus-ring',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, ...props },
  ref,
) {
  return <button ref={ref} className={buttonVariants({ variant, size, className })} {...props} />;
});
