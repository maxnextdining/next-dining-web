import Link from 'next/link';
import Image from 'next/image';

const BRAND_LINKS = [
  { href: '/brands/bongwoori', label: '봉우리 한정식' },
  { href: '/brands/jinkawa', label: '진가와' },
  { href: '/brands/bunjiro', label: '분지로' },
  { href: '/brands/takumi-nagasaki', label: '타쿠미나가사키' },
  { href: '/brands/daisen', label: '다이센스시' },
  { href: '/brands/cafe-le-sens', label: '카페 르상스' },
  { href: '/brands/noflex-nyc', label: 'NOFLEX NYC' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 회사 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/next-dining-logo.png"
                alt="NEXT DINING"
                width={140}
                height={32}
                className="h-7 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              음식, 공간, 사람을 연결해 새로운 외식의 기준을 만듭니다.
              각 브랜드가 독립된 철학과 세계관을 갖춘 멀티 브랜드 그룹입니다.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              (주)넥스트다이닝 | 대표이사 장경훈, 정호상<br />
              서울특별시 | next-dining.com
            </p>
          </div>

          {/* 브랜드 */}
          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Restaurants</h3>
            <ul className="space-y-2.5">
              {BRAND_LINKS.map((b) => (
                <li key={b.href}>
                  <Link href={b.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: '브랜드 스토리' },
                { href: '/happenings', label: '새소식' },
                { href: '/careers', label: '채용 안내' },
                { href: '/contact', label: '문의하기' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Next Dining Corp. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-stone-300">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-stone-300">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
