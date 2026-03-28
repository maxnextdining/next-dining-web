'use client';

import { useEffect, useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  mode?: 'line' | 'word';
  delay?: number;
  staggerDelay?: number;
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'p',
  mode = 'line',
  delay = 0,
  staggerDelay = 80,
}: TextRevealProps) {
  // Observe from the wrapping div; the Tag is the first (only) child.
  const wrapperRef = useRef<HTMLDivElement>(null);

  const segments =
    mode === 'line'
      ? children.split('\n').filter((s) => s.trim().length > 0)
      : children.split(' ').filter((s) => s.length > 0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Target is the first child element (the Tag itself)
    const target = wrapper.firstElementChild ?? wrapper;
    const innerSpans = wrapper.querySelectorAll<HTMLSpanElement>('[data-text-inner]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            innerSpans.forEach((span) => {
              span.style.transform = 'translateY(0)';
              span.style.opacity = '1';
            });
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    /*
     * The wrapper div uses display:contents so it contributes no box of its
     * own — the Tag renders as if the div were not there. The ref still gives
     * us a DOM handle to querySelector from.
     */
    <div ref={wrapperRef} style={{ display: 'contents' }}>
      <Tag className={className}>
        {segments.map((segment, i) => (
          <span
            key={i}
            style={{
              display: mode === 'line' ? 'block' : 'inline-block',
              overflow: 'hidden',
              marginRight: mode === 'word' ? '0.25em' : undefined,
            }}
          >
            <span
              data-text-inner
              style={{
                display: 'block',
                transform: 'translateY(110%)',
                opacity: 0,
                transition:
                  'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${delay + i * staggerDelay}ms`,
              }}
            >
              {segment}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
