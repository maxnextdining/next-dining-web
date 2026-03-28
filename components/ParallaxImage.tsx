'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  priority?: boolean;
  overlay?: 'dark' | 'gradient' | 'none';
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = '',
  priority = false,
  overlay = 'none',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportH = window.innerHeight;

        // Only update when element is visible
        if (rect.bottom < 0 || rect.top > viewportH) return;

        // scrollProgress: -1 (below viewport) → 0 (center) → 1 (above viewport)
        const scrollProgress = (viewportH / 2 - (rect.top + rect.height / 2)) / viewportH;
        setOffsetY(scrollProgress * speed * 100);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed]);

  const overlayClass =
    overlay === 'dark'
      ? 'absolute inset-0 bg-black/50 z-10'
      : overlay === 'gradient'
      ? 'absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10'
      : null;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        style={{
          position: 'absolute',
          inset: '-15%', // extra space to prevent edge gaps during parallax shift
          willChange: 'transform',
          transform: `translateY(${offsetY}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      {overlayClass && <div className={overlayClass} />}
    </div>
  );
}
