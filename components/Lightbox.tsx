'use client';

import { useEffect, useCallback } from 'react';
import { IconX } from './Icons';

interface LightboxProps {
  src: string | null;
  caption?: string;
  onClose: () => void;
}

export function Lightbox({ src, caption, onClose }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (src) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [src, handleKey]);

  return (
    <div
      className={`lightbox${src ? ' open' : ''}`}
      onClick={onClose}
    >
      {src && (
        <>
          <img
            src={src}
            alt={caption ?? ''}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lb-close" onClick={onClose} aria-label="Close lightbox">
            <IconX />
          </button>
          {caption && <div className="lb-cap">{caption}</div>}
        </>
      )}
    </div>
  );
}

export function useLightbox() {
  return { Lightbox };
}
