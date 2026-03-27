'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/brands', label: '브랜드' },
  { href: '/about', label: '회사 소개' },
  { href: '/happenings', label: '새소식' },
  { href: '/careers', label: '채용' },
  { href: '/contact', label: '문의' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isBrandDetail = pathname.startsWith('/brands/') && pathname !== '/brands';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dark mode: homepage and brand detail hero areas
  const isDark = isHome || isBrandDetail;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isDark
          ? scrolled
            ? 'bg-[#131313]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
          : scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-stone-100'
            : 'bg-white/80 backdrop-blur border-b border-stone-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/images/next-dining-logo.png"
            alt="NEXT DINING"
            width={140}
            height={32}
            className={`h-7 lg:h-8 w-auto transition-all ${isDark ? 'brightness-0 invert' : ''}`}
            priority
          />
        </Link>

        {/* 데스크탑 Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm font-body tracking-tight transition-colors ${
                isDark
                  ? 'text-[#e5e2e1]/70 hover:text-[#e9c176]'
                  : 'text-stone-600 hover:text-stone-900'
              } ${pathname === n.href ? (isDark ? 'text-[#e9c176] border-b border-[#e9c176] pb-0.5' : 'text-stone-900 font-semibold') : ''}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className={`text-sm px-5 py-2.5 font-medium transition-all duration-300 ${
              isDark
                ? 'bg-[#e9c176] text-[#131313] hover:opacity-80'
                : 'bg-stone-900 text-white rounded-lg hover:bg-stone-800'
            }`}
          >
            예약하기
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className={`md:hidden p-2 ${isDark ? 'text-[#e5e2e1]' : 'text-stone-600'}`}
          onClick={() => setOpen(!open)}
          aria-label="메뉴"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className={`md:hidden px-4 pb-4 pt-2 space-y-1 ${
          isDark
            ? 'bg-[#131313]/95 backdrop-blur-xl border-t border-white/5'
            : 'bg-white border-t border-stone-100'
        }`}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`block py-2.5 text-sm ${
                isDark ? 'text-[#e5e2e1]/70 hover:text-[#e9c176]' : 'text-stone-700 hover:text-stone-900'
              }`}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`block mt-3 text-center text-sm px-4 py-2.5 ${
              isDark
                ? 'bg-[#e9c176] text-[#131313]'
                : 'bg-stone-900 text-white rounded-lg'
            }`}
            onClick={() => setOpen(false)}
          >
            예약하기
          </Link>
        </div>
      )}
    </header>
  );
}
