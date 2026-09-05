'use client';

import Image from 'next/image';
import { MagnifyingGlassPlus, X } from '@phosphor-icons/react';
import { flushSync } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

type Screenshot = {
  src: string;
  alt: string;
  title: string;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

export function ScreenshotGallery({ screenshots }: { screenshots: readonly Screenshot[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const transitionTo = useCallback((update: () => void) => {
    const transitionDocument = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!transitionDocument.startViewTransition || reduceMotion) {
      update();
      return Promise.resolve();
    }

    const transition = transitionDocument.startViewTransition(() => {
      flushSync(update);
    });

    return transition.finished;
  }, []);

  const openScreenshot = useCallback((index: number) => {
    void transitionTo(() => setSelectedIndex(index));
  }, [transitionTo]);

  const closeScreenshot = useCallback(() => {
    if (selectedIndex === null) return;

    const trigger = triggerRefs.current[selectedIndex];
    void transitionTo(() => setSelectedIndex(null)).finally(() => trigger?.focus());
  }, [selectedIndex, transitionTo]);

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
          <figure key={shot.src} className="soft-card overflow-hidden p-3">
            <button
              ref={(element) => { triggerRefs.current[index] = element; }}
              type="button"
              className="screenshot-trigger focus-ring"
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
                style={{ viewTransitionName: selectedIndex === index ? 'none' : `screenshot-${index}` }}
              />
              <span className="screenshot-zoom-hint" aria-hidden="true">
                <MagnifyingGlassPlus size={20} weight="bold" />
                Ampliar
              </span>
            </button>
            <figcaption className="px-4 py-4 font-bold">{shot.title}</figcaption>
          </figure>
        ))}
      </div>

      {selectedScreenshot && selectedIndex !== null ? (
        <div className="screenshot-lightbox" role="dialog" aria-modal="true" aria-labelledby="screenshot-lightbox-title">
          <button type="button" tabIndex={-1} className="screenshot-lightbox-backdrop" aria-label="Fechar ao clicar fora da imagem" onClick={closeScreenshot} />
          <div className="screenshot-lightbox-panel">
            <div className="screenshot-lightbox-header">
              <p id="screenshot-lightbox-title" className="font-bold">{selectedScreenshot.title}</p>
              <button ref={closeButtonRef} type="button" className="screenshot-lightbox-close focus-ring" aria-label="Fechar imagem ampliada" onClick={closeScreenshot}>
                <X size={24} weight="bold" />
              </button>
            </div>
            <div className="screenshot-lightbox-media">
              <Image
                src={selectedScreenshot.src}
                width={1536}
                height={1100}
                alt={selectedScreenshot.alt}
                priority
                className="screenshot-lightbox-image"
                style={{ viewTransitionName: `screenshot-${selectedIndex}` }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
