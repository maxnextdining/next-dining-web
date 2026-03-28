import Link from 'next/link';
import Image from 'next/image';

const BRAND_LINKS = [
  { href: '/brands/bongwoori', label: '봉우리 한정식' },
  { href: '/brands/bongwoori-soban', label: '봉우리소반' },
  { href: '/brands/jinkawa', label: '진가와' },
  { href: '/brands/bunjiro', label: '분지로' },
  { href: '/brands/takumi-nagasaki', label: '타쿠미나가사키' },
  { href: '/brands/daisen', label: '다이센스시' },
  { href: '/brands/cafe-le-sens', label: '카페 르상스' },
  { href: '/brands/jinjin-mandu', label: '진진만두' },
  { href: '/brands/menya-always', label: '멘야올웨이즈' },
  { href: '/brands/noflex-nyc', label: 'NOFLEX NYC' },
];

const COMPANY_LINKS = [
  { href: '/about', label: '회사 소개' },
  { href: '/happenings', label: '새소식' },
  { href: '/careers', label: '채용 안내' },
  { href: '/contact', label: '문의하기' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: '이용약관' },
  { href: '/privacy', label: '개인정보처리방침' },
];

const BRAND_COL_LEFT = BRAND_LINKS.slice(0, 5);
const BRAND_COL_RIGHT = BRAND_LINKS.slice(5);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-sm leading-relaxed">
      {/* Top gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C8A96E]/30 to-transparent" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1 — Company */}
          <div className="flex flex-col gap-5">
            <Image
              src="/images/next-dining-logo-white.png"
              alt="NEXT DINING"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
            <p className="font-display font-bold text-[#C8A96E] text-base leading-snug">
              다음 세대를 여는<br />글로벌 외식 문화기업
            </p>
            <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-[220px]">
              음식, 공간, 사람을 연결해<br />새로운 외식의 기준을 만듭니다.
            </p>
          </div>

          {/* Column 2 — Brands */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-[#C8A96E] font-bold uppercase mb-6">
              BRANDS
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {BRAND_COL_LEFT.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="text-[#8A8A8A] hover:text-[#EDEDED] hover:underline underline-offset-4 hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {b.label}
                </Link>
              ))}
              {BRAND_COL_RIGHT.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="text-[#8A8A8A] hover:text-[#EDEDED] hover:underline underline-offset-4 hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {b.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-[#C8A96E] font-bold uppercase mb-6">
              COMPANY
            </h3>
            <ul className="space-y-3 mb-4">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#8A8A8A] hover:text-[#EDEDED] hover:underline underline-offset-4 transition-colors duration-300 text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/5 pt-4">
              <ul className="space-y-3">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-xs text-[#8A8A8A]/70 hover:text-[#EDEDED] hover:underline underline-offset-4 transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-[#C8A96E] font-bold uppercase mb-6">
              CONTACT
            </h3>
            <ul className="space-y-3 text-[#8A8A8A] text-sm">
              <li>
                <a
                  href="mailto:communication@next-dining.com"
                  className="hover:text-[#EDEDED] transition-colors duration-300"
                >
                  communication@next-dining.com
                </a>
              </li>
              <li className="leading-relaxed">
                서울시 용산구 대사관로 35<br />
                사운즈 한남 B1
              </li>
            </ul>

            {/* Instagram */}
            <div className="mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-[#8A8A8A] hover:text-[#EDEDED] hover:border-[#C8A96E]/40 hover:scale-110 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Business info */}
          <div className="text-[10px] text-white/30 leading-relaxed space-y-0.5">
            <p>(주)넥스트다이닝 | 대표이사 장경훈, 정호상</p>
            <p>사업자등록번호: 211-88-02389</p>
            <p>통신판매업신고: 등록 준비 중</p>
          </div>

          {/* Copyright + tagline */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <p className="text-xs text-white/30">
              © {year} Next Dining Corp. All rights reserved.
            </p>
            <p className="text-xs tracking-[0.4em] text-white/15 uppercase">
              Crafted for Excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
