import Link from "next/link";
import Image from "next/image";
import { brands } from "@/lib/brands";
import ScrollReveal from "@/components/ScrollReveal";
import type { Lang } from "@/lib/i18n";
import { t, langPrefix } from "@/lib/i18n";

type CategoryKey = 'korean' | 'japanese' | 'american' | 'cafe';

const CATEGORY_LABELS_STYLE: Record<CategoryKey, { className: string }> = {
  korean:   { className: "bg-[#C8A96E]/15 text-[#C8A96E]" },
  japanese: { className: "bg-[#6B8CAE]/15 text-[#6B8CAE]" },
  american: { className: "bg-[#6BAE8C]/15 text-[#6BAE8C]" },
  cafe:     { className: "bg-[#9B8DC8]/15 text-[#9B8DC8]" },
};

const ROW_LAYOUT: [number, number][] = [
  [7, 5],
  [5, 7],
  [7, 5],
  [5, 7],
  [7, 5],
];

const ROW_HEIGHTS: [string, string][] = [
  ["h-[500px]", "h-[500px]"],
  ["h-[450px]", "h-[450px]"],
  ["h-[450px]", "h-[450px]"],
  ["h-[500px]", "h-[500px]"],
  ["h-[400px]", "h-[400px]"],
];

const COL_SPAN: Record<number, string> = {
  5: "col-span-5",
  7: "col-span-7",
};

interface Props {
  lang: Lang;
  sheetBrandInfoMap: Record<string, { tagline: string; description: string }>;
  headerHeading: string;
  headerSubtitle: string;
  partnershipHeading: string;
  partnershipSubtitle: string;
}

function BrandCard({
  brand,
  height,
  sheetTagline,
  lang,
}: {
  brand: (typeof brands)[0];
  height: string;
  sheetTagline?: string;
  lang: Lang;
}) {
  const prefix = langPrefix(lang);
  const activeCount = brand.locations.filter((l) => l.status === "active").length;
  const hasComingSoon = brand.locations.some((l) => l.status === "coming-soon");
  const catKey = brand.category as CategoryKey;
  const categoryMeta = CATEGORY_LABELS_STYLE[catKey];
  const categoryLabel = t(lang, `brands.category.${catKey}` as Parameters<typeof t>[1]);

  return (
    <Link
      href={`${prefix}/brands/${brand.id}`}
      className={`brand-card group relative block w-full ${height} overflow-hidden rounded-xl hover:shadow-[0_1px_0_0_#C8A96E,0_24px_60px_-16px_rgba(0,0,0,0.5)]`}
    >
      <div className="img-premium absolute inset-0 overflow-hidden">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="brand-image object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent group-hover:from-[#0A0A0A] group-hover:via-[#0A0A0A]/55 transition-all duration-500" />

      {categoryMeta && (
        <div className="absolute top-4 left-4 z-10">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm ${categoryMeta.className}`}>
            {categoryLabel}
          </span>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
        {hasComingSoon && (
          <span className="text-xs bg-[#C8A96E]/90 text-[#0A0A0A] px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm">
            {t(lang, 'brands.coming_soon')}
          </span>
        )}
        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg p-1.5 border border-white/15">
          <Image
            src={brand.logo}
            alt={`${brand.name} 로고`}
            width={28}
            height={28}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-1">
          {lang === 'ja' ? (brand.cuisine || brand.category.toUpperCase()) : brand.nameEn}
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-white mb-2 leading-tight">
          {lang === 'ja' ? brand.nameEn : brand.name}
        </h3>
        <p className="text-[#EDEDED]/80 text-sm max-w-md leading-relaxed mb-4 line-clamp-2">
          {sheetTagline || brand.tagline}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {activeCount > 0 && (
            <span className="text-xs bg-white/10 text-[#EDEDED] px-3 py-1 rounded-full border border-white/15 backdrop-blur-sm">
              {activeCount}{t(lang, 'brands.stores_count')}
            </span>
          )}
        </div>
      </div>

      <span className="absolute bottom-6 right-6 text-xs tracking-[0.2em] uppercase text-[#C8A96E] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-body">
        View →
      </span>
    </Link>
  );
}

export default function BrandsPageContent({
  lang,
  sheetBrandInfoMap,
  headerHeading,
  headerSubtitle,
  partnershipHeading,
  partnershipSubtitle,
}: Props) {
  const prefix = langPrefix(lang);

  const rows: [typeof brands[0], typeof brands[0] | undefined][] = [];
  for (let i = 0; i < brands.length; i += 2) {
    rows.push([brands[i], brands[i + 1]]);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* ── Hero Header ─────────────────────────────────── */}
      <section className="bg-[#0A0A0A] pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <p className="text-xs tracking-[0.3em] text-[#C8A96E] uppercase font-bold mb-4">
              {t(lang, 'brands.header_label')}
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-[#EDEDED] mb-4 leading-tight">
              {headerHeading}
            </h1>
            <span className="accent-line block mb-6" />
            <p className="text-[#8A8A8A] text-lg max-w-xl leading-relaxed">
              {headerSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Brand Gallery Grid ───────────────────────────── */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            {rows.map((pair, rowIdx) => {
              const [left, right] = pair;
              const [leftSpan, rightSpan] = ROW_LAYOUT[rowIdx] ?? [6, 6];
              const [leftH, rightH] = ROW_HEIGHTS[rowIdx] ?? ["h-[450px]", "h-[450px]"];

              return (
                <div key={rowIdx} className="grid grid-cols-12 gap-4">
                  <ScrollReveal
                    direction="up"
                    delay={rowIdx * 60}
                    className={`${COL_SPAN[leftSpan] ?? "col-span-6"} col-span-12 md:${COL_SPAN[leftSpan] ?? "col-span-6"}`}
                  >
                    <BrandCard
                      brand={left}
                      height={leftH}
                      sheetTagline={sheetBrandInfoMap[left.id]?.tagline}
                      lang={lang}
                    />
                  </ScrollReveal>

                  {right && (
                    <ScrollReveal
                      direction="up"
                      delay={rowIdx * 60 + 80}
                      className={`${COL_SPAN[rightSpan] ?? "col-span-6"} col-span-12 md:${COL_SPAN[rightSpan] ?? "col-span-6"}`}
                    >
                      <BrandCard
                        brand={right}
                        height={rightH}
                        sheetTagline={sheetBrandInfoMap[right.id]?.tagline}
                        lang={lang}
                      />
                    </ScrollReveal>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Partnership CTA ──────────────────────────────── */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="glass-dark rounded-2xl p-12 md:p-16 text-center">
              <p className="text-xs tracking-[0.3em] text-[#C8A96E] uppercase font-bold mb-4">
                {t(lang, 'brands.partnership_label')}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-[#EDEDED] mb-4">
                {partnershipHeading}
              </h2>
              <span className="accent-line mx-auto block mb-6" />
              <p className="text-[#8A8A8A] text-base max-w-lg mx-auto mb-8 leading-relaxed">
                {partnershipSubtitle}
              </p>
              <Link
                href="/contact"
                className="cta-primary inline-flex items-center gap-2 px-8 py-3 bg-[#C8A96E] text-[#0A0A0A] text-sm font-bold tracking-wider uppercase rounded-full hover:bg-[#E8D5B0]"
              >
                {t(lang, 'brands.contact_cta')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
