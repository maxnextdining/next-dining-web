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

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-sm tracking-wide leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto pt-20 pb-12">
        {/* 회사 */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/next-dining-logo-white.png"
              alt="NEXT DINING"
              width={140}
              height={32}
              className="h-7 w-auto"
            />
          </div>
          <p className="text-[#b8c8dc] max-w-sm mb-8 leading-loose font-body">
            음식, 공간, 사람을 연결해 새로운 외식의 기준을 만듭니다.
            각 브랜드가 독립된 철학과 세계관을 갖춘 멀티 브랜드 그룹입니다.
          </p>
          <p className="text-xs text-[#b8c8dc]/50">
            (주)넥스트다이닝 | 대표이사 장경훈, 정호상<br />
            서울시 용산구 대사관로 35, 사운즈 한남 B1 | next-dining.com
          </p>
        </div>

        {/* 브랜드 */}
        <div>
          <h3 className="text-[#e9c176] font-bold mb-6 uppercase tracking-widest text-xs font-body">Brands</h3>
          <ul className="space-y-3">
            {BRAND_LINKS.map((b) => (
              <li key={b.href}>
                <Link
                  href={b.href}
                  className="text-[#b8c8dc] hover:text-[#e5e2e1] transition-colors underline-offset-4 hover:underline"
                >
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 링크 */}
        <div>
          <h3 className="text-[#e9c176] font-bold mb-6 uppercase tracking-widest text-xs font-body">Company</h3>
          <ul className="space-y-3">
            {[
              { href: '/about', label: '회사 소개' },
              { href: '/happenings', label: '새소식' },
              { href: '/careers', label: '채용 안내' },
              { href: '/contact', label: '문의하기' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[#b8c8dc] hover:text-[#e5e2e1] transition-colors underline-offset-4 hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 pb-12">
        <div className="text-[#b8c8dc]/50">© {new Date().getFullYear()} Next Dining Corp. All rights reserved.</div>
        <div className="text-xs text-white/20 uppercase tracking-[0.4em] font-body">Crafted for Excellence</div>
      </div>
    </footer>
  );
}
