'use client';
import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number;
    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.12);
      currentY = lerp(currentY, targetY, 0.12);
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div
      className="hidden md:block fixed pointer-events-none z-30"
      style={{
        left: pos.x,
        top: pos.y,
        width: 400,
        height: 400,
        transform: 'translate(-50%, -50%)',
        background:
          'radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
