'use client';

import Image from 'next/image';
import { MagnifyingGlassPlus, X } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useI18n } from '@/i18n/LocaleProvider';

type Screenshot = {
  src: string;
  alt?: string;
  title?: string;
  translationItem?: 1 | 2 | 3 | 4;
  sequence?: number;
};

type ViewerState = {
  scale: number;
  x: number;
  y: number;
};

type Point = { x: number; y: number };

const clampScale = (scale: number) => Math.min(4, Math.max(1, scale));
const distanceBetween = (first: Point, second: Point) => Math.hypot(second.x - first.x, second.y - first.y);

export function ScreenshotGallery({ screenshots }: { screenshots: readonly Screenshot[] }) {
  const { messages: m, translate } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewer, setViewer] = useState<ViewerState>({ scale: 1, x: 0, y: 0 });
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const zoomTargetRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const gestureRef = useRef({ distance: 0, scale: 1, dragging: false, last: { x: 0, y: 0 } });

  const openScreenshot = useCallback((index: number) => {
    setViewer({ scale: 1, x: 0, y: 0 });
    setSelectedIndex(index);
  }, []);

  const closeScreenshot = useCallback(() => {
    if (selectedIndex === null) return;

    const trigger = triggerRefs.current[selectedIndex];
    setSelectedIndex(null);
    setViewer({ scale: 1, x: 0, y: 0 });
    trigger?.focus();
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

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

  const screenshotCopy = (shot: Screenshot, index: number) => {
    if (shot.title && shot.alt) return { title: shot.title, alt: shot.alt };

    const itemNumber = shot.translationItem ?? Math.min(index + 1, 4);
    const item = `item${itemNumber}` as 'item1' | 'item2' | 'item3' | 'item4';
    const suffix = shot.sequence === undefined ? '' : ` ${String(shot.sequence).padStart(2, '0')}`;

    return {
      title: shot.title ?? `${m.gallery[`${item}Title`]}${suffix}`,
      alt: shot.alt ?? `${m.gallery[`${item}Alt`]}${suffix}`,
    };
  };

  const selectedCopy = selectedScreenshot && selectedIndex !== null
    ? screenshotCopy(selectedScreenshot, selectedIndex)
    : null;

  const changeZoom = (delta: number) => {
    setViewer((current) => ({ ...current, scale: clampScale(current.scale + delta) }));
  };

  const resetViewer = () => setViewer({ scale: 1, x: 0, y: 0 });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointersRef.current.size === 1) {
      gestureRef.current = { ...gestureRef.current, dragging: true, last: { x: event.clientX, y: event.clientY } };
    }
    if (pointersRef.current.size === 2) {
      const [first, second] = [...pointersRef.current.values()];
      gestureRef.current = { ...gestureRef.current, distance: distanceBetween(first, second), scale: viewer.scale, dragging: false };
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointersRef.current.size >= 2) {
      const [first, second] = [...pointersRef.current.values()];
      const initialDistance = gestureRef.current.distance;
      if (initialDistance > 0) {
        setViewer((current) => ({ ...current, scale: clampScale(gestureRef.current.scale * distanceBetween(first, second) / initialDistance) }));
      }
      return;
    }
    if (!gestureRef.current.dragging || viewer.scale <= 1) return;
    const last = gestureRef.current.last;
    const dx = event.clientX - last.x;
    const dy = event.clientY - last.y;
    gestureRef.current.last = { x: event.clientX, y: event.clientY };
    setViewer((current) => ({ ...current, x: current.x + dx, y: current.y + dy }));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    gestureRef.current.dragging = false;
    gestureRef.current.distance = 0;
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 0.15 : -0.15);
  };

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {screenshots.map((shot, index) => (
          (() => {
            const { title, alt } = screenshotCopy(shot, index);
            return (
          <Card key={shot.src} className="overflow-hidden p-3">
            <figure>
              <Button
                ref={(element) => { triggerRefs.current[index] = element; }}
                type="button"
                variant="unstyled"
                className="screenshot-trigger"
                aria-label={translate(m.gallery.enlargeAria, { title })}
                aria-haspopup="dialog"
                onClick={() => openScreenshot(index)}
              >
                <Image
                  src={shot.src}
                  width={1080}
                  height={2400}
                  alt={alt}
                  className="screenshot-thumbnail"
                />
                <span className="screenshot-zoom-hint" aria-hidden="true">
                  <MagnifyingGlassPlus size={20} weight="bold" />
                  {m.gallery.enlarge}
                </span>
              </Button>
              <figcaption className="px-4 py-4 font-bold">{title}</figcaption>
            </figure>
          </Card>
            );
          })()
        ))}
      </div>

      {selectedScreenshot && selectedIndex !== null ? (
        <div
          className="screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="screenshot-lightbox-title"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeScreenshot();
          }}
        >
          <div className="screenshot-lightbox-content">
            <p id="screenshot-lightbox-title" className="sr-only">{selectedCopy?.title}</p>
            <Button
              ref={closeButtonRef}
              type="button"
              variant="unstyled"
              className="screenshot-lightbox-close"
              aria-label={m.gallery.close}
              onClick={closeScreenshot}
              onKeyDown={(event) => {
                if (event.key === 'Tab' && event.shiftKey) {
                  event.preventDefault();
                  zoomTargetRef.current?.focus();
                }
              }}
            >
              <X size={26} weight="bold" aria-hidden="true" />
            </Button>
            <div
              ref={zoomTargetRef}
              className="screenshot-lightbox-viewport"
              tabIndex={0}
              role="application"
              aria-label={m.gallery.dialogAria}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onWheel={handleWheel}
              onDoubleClick={() => {
                if (viewer.scale === 1) changeZoom(1);
                else resetViewer();
              }}
              onKeyDown={(event) => {
                if (event.key === 'Tab' && !event.shiftKey) {
                  event.preventDefault();
                  closeButtonRef.current?.focus();
                }
                if (event.key === '+' || event.key === '=') changeZoom(0.15);
                if (event.key === '-' || event.key === '_') changeZoom(-0.15);
                if (event.key === '0') resetViewer();
              }}
            >
              <Image
                src={selectedScreenshot.src}
                width={1080}
                height={2400}
                alt={selectedCopy?.alt ?? ''}
                priority
                className="screenshot-lightbox-image"
                draggable={false}
                style={{ transform: `translate3d(${viewer.x}px, ${viewer.y}px, 0) scale(${viewer.scale})` }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
