'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'mask' | 'blur';
  delay?: number;
  stagger?: boolean;
  once?: boolean;
  threshold?: number;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  stagger = false,
  once = true,
  threshold = 0.15,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealClass =
      direction === 'left'  ? 'reveal-left'  :
      direction === 'right' ? 'reveal-right' :
      direction === 'scale' ? 'reveal-scale' :
      direction === 'mask'  ? 'reveal-mask'  :
      direction === 'blur'  ? 'reveal-blur'  :
      'reveal';

    const activate = () => {
      el.style.willChange = 'transform, opacity';
      if (stagger) {
        const childEls = el.querySelectorAll(
          '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-mask, .reveal-blur'
        );
        childEls.forEach((child) => child.classList.add('visible'));
      }
      el.classList.add('visible');

      // Remove will-change after animation completes to free GPU memory
      const maxDuration = 900 + delay;
      const timer = setTimeout(() => {
        el.style.willChange = 'auto';
      }, maxDuration);
      return timer;
    };

    const deactivate = () => {
      if (stagger) {
        const childEls = el.querySelectorAll(
          '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-mask, .reveal-blur'
        );
        childEls.forEach((child) => child.classList.remove('visible'));
      }
      el.classList.remove('visible');
      el.style.willChange = 'transform, opacity';
    };

    let cleanupTimer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cleanupTimer = activate();
            if (once) observer.unobserve(el);
          } else if (!once) {
            deactivate();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(cleanupTimer);
    };
  }, [direction, stagger, once, threshold, delay]);

  const revealClass =
    direction === 'left'  ? 'reveal-left'  :
    direction === 'right' ? 'reveal-right' :
    direction === 'scale' ? 'reveal-scale' :
    direction === 'mask'  ? 'reveal-mask'  :
    direction === 'blur'  ? 'reveal-blur'  :
    'reveal';

  return (
    <Tag
      ref={ref}
      className={`${revealClass}${stagger ? ' stagger-children' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
