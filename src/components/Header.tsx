import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { NavigationLinks } from './NavigationLinks';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-axis-line/70 bg-axis-canvas/90 backdrop-blur-xl">
      <div className="axis-container flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="rounded-full focus-ring">
          <BrandMark />
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          <NavigationLinks variant="desktop" />
        </nav>
        <a href="mailto:natnaelsales@gmail.com" className="button-secondary hidden sm:inline-flex">
          Fale conosco
        </a>
      </div>
      <nav aria-label="Navegação móvel" className="axis-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
        <NavigationLinks variant="mobile" />
      </nav>
    </header>
  );
}
