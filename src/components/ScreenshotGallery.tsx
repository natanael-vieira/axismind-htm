'use client';

import Image from 'next/image';
import { MagnifyingGlassPlus } from '@phosphor-icons/react';
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
  const [zoom, setZoom] = useState(1);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const zoomTargetRef = useRef<HTMLDivElement>(null);

  const openScreenshot = useCallback((index: number) => {
    setZoom(1);
    setSelectedIndex(index);
  }, []);

  const closeScreenshot = useCallback(() => {
    if (selectedIndex === null) return;

    const trigger = triggerRefs.current[selectedIndex];
    setSelectedIndex(null);
    setZoom(1);
    trigger?.focus();
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    zoomTargetRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeScreenshot();
    };

    window.addEventListener('keydown', handleKeyDown);
          return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeScreenshot, selectedIndex]);

  const selectedScreenshot = selectedIndex === null ? null : screenshots[selectedIndex];

  const changeZoom = (delta: number) => {
    setZoom((current) => Math.min(3, Math.max(1, Number((current + delta).toFixed(2)))));
  };

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
          <div className="screenshot-lightbox-content">
            <p id="screenshot-lightbox-title" className="sr-only">{selectedScreenshot.title}</p>
            <div
              ref={zoomTargetRef}
              className="screenshot-lightbox-viewport"
              tabIndex={0}
              role="button"
              aria-label="Imagem ampliada. Clique para alternar o zoom ou use o scroll do mouse. Pressione Escape para fechar."
              onClick={() => setZoom((current) => current === 1 ? 1.5 : 1)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') setZoom((current) => current === 1 ? 1.5 : 1);
              }}
              onWheel={(event) => {
                event.preventDefault();
                changeZoom(event.deltaY < 0 ? 0.15 : -0.15);
              }}
            >
              <Image
                src={selectedScreenshot.src}
                width={1536}
                height={1100}
                alt={selectedScreenshot.alt}
                priority
                className="screenshot-lightbox-image"
                style={{ width: `${zoom * 100}%` }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
