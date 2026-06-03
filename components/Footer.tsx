import Link from 'next/link';
import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import { t, langPrefix } from '@/lib/i18n';

const BRAND_IDS = [
  'bongwoori',
  'bongwoori-soban',
  'jinkawa',
  'bunjiro',
  'takumi-nagasaki',
  'daisen',
  'cafe-le-sens',
  'jinjin-mandu',
  'menya-always',
  'noflex-nyc',
] as const;

type BrandId = typeof BRAND_IDS[number];

interface CompanyLinkDef {
  href: string;
  labelKey: 'footer.about' | 'footer.happenings' | 'footer.careers' | 'footer.contact';
  pageId: string;
}

const ALL_COMPANY_LINKS: CompanyLinkDef[] = [
  { href: '/about',      labelKey: 'footer.about',      pageId: 'about' },
  { href: '/happenings', labelKey: 'footer.happenings',  pageId: 'happenings' },
  { href: '/careers',    labelKey: 'footer.careers',     pageId: 'careers' },
  { href: '/contact',    labelKey: 'footer.contact',     pageId: 'contact' },
];

// Pages without /ja equivalents
const JA_EXCLUDED = new Set(['happenings', 'careers', 'contact']);

interface FooterProps {
  hiddenPages?: string[];
  lang?: Lang;
}

export default function Footer({ hiddenPages = [], lang = 'ko' }: FooterProps) {
  const prefix = langPrefix(lang);
  const year = new Date().getFullYear();

  const COMPANY_LINKS = ALL_COMPANY_LINKS
    .filter((l) => !hiddenPages.includes(l.pageId))
    .map((l) => ({
      href: lang === 'ja' && JA_EXCLUDED.has(l.pageId)
        ? l.href
        : `${prefix}${l.href}`,
      label: t(lang, l.labelKey),
    }));

  const BRAND_COL_LEFT = BRAND_IDS.slice(0, 5);
  const BRAND_COL_RIGHT = BRAND_IDS.slice(5);

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
              width={104}
              height={16}
              className="h-3.5 w-auto object-contain object-left"
            />
            <p className="font-display text-[#C8A96E] text-base leading-snug whitespace-pre-line">
              {t(lang, 'footer.tagline')}
            </p>
            <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-[220px] whitespace-pre-line">
              {t(lang, 'footer.tagline_sub')}
            </p>
          </div>

          {/* Column 2 — Brands */}
          <div>
            <h3 className="text-xs tracking-[0.25em] text-[#C8A96E] font-bold uppercase mb-6">
              {t(lang, 'footer.brands_col')}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {BRAND_COL_LEFT.map((id) => (
                <Link
                  key={id}
                  href={`${prefix}/brands/${id}`}
                  className="text-[#8A8A8A] hover:text-[#EDEDED] hover:underline underline-offset-4 hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {t(lang, `footer.brand.${id}` as Parameters<typeof t>[1])}
                </Link>
              ))}
              {BRAND_COL_RIGHT.map((id) => (
                <Link
                  key={id}
                  href={`${prefix}/brands/${id}`}
                  className="text-[#8A8A8A] hover:text-[#EDEDED] hover:underline underline-offset-4 hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {t(lang, `footer.brand.${id}` as Parameters<typeof t>[1])}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="text-xs tracking-[0.25em] text-[#C8A96E] font-bold uppercase mb-6">
              {t(lang, 'footer.company_col')}
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
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-xs tracking-[0.25em] text-[#C8A96E] font-bold uppercase mb-6">
              {t(lang, 'footer.contact_col')}
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
              <li className="leading-relaxed whitespace-pre-line">
                {t(lang, 'footer.address')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Business info */}
          <div className="text-[10px] text-white/30 leading-relaxed space-y-0.5">
            <p>{t(lang, 'footer.company_info')}</p>
            <p>{t(lang, 'footer.biz_number')}</p>
          </div>

          {/* Copyright + tagline */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <p className="text-xs text-white/30">
              {t(lang, 'footer.copyright').replace('{year}', String(year))}
            </p>
            <p className="text-xs tracking-[0.4em] text-white/15 uppercase">
              {t(lang, 'footer.crafted')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
