'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const NAV = [
  { href: '/about', label: '브랜드 스토리' },
  { href: '/brands', label: '레스토랑' },
  { href: '/happenings', label: '새소식' },
  { href: '/careers', label: '채용' },
  { href: '/contact', label: '문의' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/images/next-dining-logo.png"
            alt="NEXT DINING"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* 데스크탑 Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* 예약 CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-sm bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors"
          >
            입점 문의
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-stone-600"
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
        <div className="md:hidden bg-white border-t border-stone-100 px-4 pb-4 pt-2 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block py-2.5 text-sm text-stone-700 hover:text-stone-900"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block mt-3 text-center text-sm bg-stone-900 text-white px-4 py-2.5 rounded-lg"
            onClick={() => setOpen(false)}
          >
            입점 문의
          </Link>
        </div>
      )}
    </header>
  );
}
