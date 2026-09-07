'use client';

import Image from 'next/image';
import { MagnifyingGlassPlus, X } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Screenshot = {
  src: string;
  alt: string;
  title: string;
};

export function ScreenshotGallery({ screenshots }: { screenshots: readonly Screenshot[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openScreenshot = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeScreenshot = useCallback(() => {
    if (selectedIndex === null) return;

    const trigger = triggerRefs.current[selectedIndex];
    setSelectedIndex(null);
    trigger?.focus();
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeScreenshot();
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeScreenshot, selectedIndex]);

  const selectedScreenshot = selectedIndex === null ? null : screenshots[selectedIndex];

  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {screenshots.map((shot, index) => (
          <Card key={shot.src} className="overflow-hidden p-3">
            <figure>
              <Button
                ref={(element) => { triggerRefs.current[index] = element; }}
                type="button"
                variant="unstyled"
                className="screenshot-trigger"
                aria-label={`Ampliar imagem: ${shot.title}`}
                aria-haspopup="dialog"
                onClick={() => openScreenshot(index)}
              >
                <Image
                  src={shot.src}
                  width={1536}
                  height={1100}
                  alt={shot.alt}
                  className="screenshot-thumbnail"
                />
                <span className="screenshot-zoom-hint" aria-hidden="true">
                  <MagnifyingGlassPlus size={20} weight="bold" />
                  Ampliar
                </span>
              </Button>
              <figcaption className="px-4 py-4 font-bold">{shot.title}</figcaption>
            </figure>
          </Card>
        ))}
      </div>

      {selectedScreenshot && selectedIndex !== null ? (
        <div className="screenshot-lightbox" role="dialog" aria-modal="true" aria-labelledby="screenshot-lightbox-title">
          <Button type="button" variant="unstyled" tabIndex={-1} className="screenshot-lightbox-backdrop" aria-label="Fechar ao clicar fora da imagem" onClick={closeScreenshot} />
          <div className="screenshot-lightbox-content">
            <p id="screenshot-lightbox-title" className="sr-only">{selectedScreenshot.title}</p>
            <Image
              src={selectedScreenshot.src}
              width={1536}
              height={1100}
              alt={selectedScreenshot.alt}
              priority
              className="screenshot-lightbox-image"
            />
            <Button ref={closeButtonRef} type="button" variant="outline" size="icon" className="screenshot-lightbox-close" aria-label="Fechar imagem ampliada" onClick={closeScreenshot}>
              <X size={22} weight="bold" />
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
