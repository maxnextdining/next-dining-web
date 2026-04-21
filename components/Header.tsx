'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const ALL_NAV = [
  { href: '/brands', label: '브랜드' },
  { href: '/about', label: '회사 소개' },
  { href: '/happenings', label: '새소식' },
  { href: '/careers', label: '채용' },
  { href: '/contact', label: '문의' },
];

export default function Header({ hiddenPages = [] }: { hiddenPages?: string[] }) {
  const NAV = ALL_NAV.filter((n) => !hiddenPages.includes(n.href.slice(1)));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Always dark-themed site
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      // Smart header: hide on scroll down, show on scroll up
      if (y > lastScrollY.current && y > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={[
          'fixed top-0 w-full z-40 transition-all duration-500',
          scrolled
            ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl'
            : 'bg-transparent',
          hidden ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
        style={{
          height: '80px',
        }}
      >
        {/* Gold border-bottom — fades in on scroll */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-[#C8A96E] transition-opacity duration-500"
          style={{ opacity: scrolled ? 0.3 : 0 }}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center shrink-0">
            <Image
              src="/images/next-dining-logo-white.png"
              alt="NEXT DINING"
              width={70}
              height={16}
              className="h-3.5 lg:h-4 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav — centered */}
          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="relative group text-sm tracking-wide text-white/60 hover:text-[#C8A96E] transition-colors duration-300"
              >
                <span className={isActive(n.href) ? 'text-[#C8A96E]' : ''}>
                  {n.label}
                </span>
                {/* Active / hover underline — grows from center */}
                <span
                  className={[
                    'absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-[#C8A96E]',
                    'transition-all duration-300 ease-out',
                    isActive(n.href)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full',
                  ].join(' ')}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/contact?tab=partnership"
              className="cta-outline text-sm tracking-wide px-5 py-2 rounded-full border border-white/20 text-white/70 bg-transparent hover:border-white/40 hover:text-white"
            >
              제휴·입점
            </Link>
            <Link
              href="/contact?tab=reservation"
              className="cta-primary text-sm tracking-wide px-5 py-2 rounded-full bg-[#C8A96E] text-[#0A0A0A] font-semibold hover:bg-[#E8D5B0] hover:shadow-[0_0_20px_rgba(200,169,110,0.25)]"
            >
              예약하기
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative z-10 flex flex-col justify-center items-center w-10 h-10 gap-0"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
          >
            <span
              className={[
                'block h-0.5 bg-[#C8A96E] origin-center transition-all duration-300 ease-in-out',
                open
                  ? 'w-6 translate-y-[3px] rotate-45'
                  : 'w-6 -translate-y-[4px]',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 bg-[#C8A96E] origin-center transition-all duration-300 ease-in-out',
                open ? 'w-6 opacity-0 scale-x-0' : 'w-6 opacity-100 scale-x-100',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 bg-[#C8A96E] origin-center transition-all duration-300 ease-in-out',
                open
                  ? 'w-6 -translate-y-[3px] -rotate-45'
                  : 'w-6 translate-y-[4px]',
              ].join(' ')}
            />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        className={[
          'fixed inset-0 z-50 flex flex-col bg-[#0A0A0A] transition-all duration-500 ease-in-out md:hidden',
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 h-20 shrink-0">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/images/next-dining-logo-white.png"
              alt="NEXT DINING"
              width={60}
              height={14}
              className="h-3.5 w-auto"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
            className="flex flex-col justify-center items-center w-10 h-10 gap-0"
          >
            <span
              className="block h-0.5 w-6 bg-[#C8A96E] origin-center translate-y-[3px] rotate-45 transition-all duration-300"
            />
            <span
              className="block h-0.5 w-6 bg-[#C8A96E] origin-center -translate-y-[3px] -rotate-45 transition-all duration-300"
            />
          </button>
        </div>

        {/* Nav items — vertically centered */}
        <nav className="flex-1 flex flex-col justify-center px-8">
          {NAV.map((n, i) => (
            <div key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className={[
                  'group block py-5 text-3xl font-light tracking-tight transition-all duration-300',
                  isActive(n.href)
                    ? 'text-[#C8A96E]'
                    : 'text-white/70 hover:text-[#C8A96E]',
                  // Staggered fade-in
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                ].join(' ')}
                style={{
                  transitionDelay: open ? `${100 + i * 80}ms` : '0ms',
                }}
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-xs text-[#C8A96E]/50 font-mono tracking-widest">
                    0{i + 1}
                  </span>
                  {n.label}
                </span>
              </Link>
              {/* Gold divider */}
              {i < NAV.length - 1 && (
                <div
                  className={[
                    'h-px bg-[#C8A96E]/10 transition-all duration-500',
                    open ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                  style={{ transitionDelay: open ? `${140 + i * 80}ms` : '0ms' }}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div
          className={[
            'px-8 pb-12 shrink-0 transition-all duration-500 space-y-3',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          ].join(' ')}
          style={{ transitionDelay: open ? '520ms' : '0ms' }}
        >
          <Link
            href="/contact?tab=reservation"
            onClick={() => setOpen(false)}
            className="cta-primary block w-full text-center text-sm tracking-widest py-4 rounded-full bg-[#C8A96E] text-[#0A0A0A] font-semibold hover:bg-[#E8D5B0]"
          >
            예약하기
          </Link>
          <Link
            href="/contact?tab=partnership"
            onClick={() => setOpen(false)}
            className="cta-outline block w-full text-center text-sm tracking-widest py-4 rounded-full border border-white/20 text-white/70 bg-transparent hover:border-white/40 hover:text-white"
          >
            제휴·입점
          </Link>
        </div>
      </div>
    </>
  );
}
