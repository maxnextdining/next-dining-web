import Link from "next/link";
import Image from "next/image";
import { brands } from "@/lib/brands";
import { fetchBrandInfo } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "브랜드 — NEXT DINING",
  description:
    "넥스트다이닝의 10개 프리미엄 외식 브랜드를 만나보세요. 봉우리 한정식, 진가와, 분지로, 다이센스시, 타쿠미나가사키, 카페르상스 등 각자의 철학과 이야기로 한국 외식의 수준을 높이는 브랜드들입니다.",
  openGraph: {
    title: "브랜드 | NEXT DINING",
    description: "넥스트다이닝의 10개 프리미엄 외식 브랜드 포트폴리오",
  },
};

const CATEGORY_LABELS: Record<string, { label: string; className: string }> = {
  korean:   { label: "한식",  className: "bg-[#C8A96E]/15 text-[#C8A96E]" },
  japanese: { label: "일식",  className: "bg-[#6B8CAE]/15 text-[#6B8CAE]" },
  american: { label: "양식",  className: "bg-[#6BAE8C]/15 text-[#6BAE8C]" },
  cafe:     { label: "카페",  className: "bg-[#9B8DC8]/15 text-[#9B8DC8]" },
};

/**
 * Alternating column layout spec (1-indexed):
 * Row 1: brand[0] col-span-7, brand[1] col-span-5
 * Row 2: brand[2] col-span-5, brand[3] col-span-7
 * Row 3: brand[4] col-span-7, brand[5] col-span-5
 * Row 4: brand[6] col-span-5, brand[7] col-span-7
 * Row 5: brand[8] col-span-7, brand[9] col-span-5
 */
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

// Map col-span number to Tailwind class (dynamic classes not safe in Tailwind)
const COL_SPAN: Record<number, string> = {
  5: "col-span-5",
  7: "col-span-7",
};

export default async function BrandsPage() {
  const sheetBrandInfoList = await fetchBrandInfo();
  const sheetBrandInfoMap: Record<string, { tagline: string; description: string }> = {};
  for (const info of sheetBrandInfoList) {
    sheetBrandInfoMap[info.brandId] = { tagline: info.tagline, description: info.description };
  }

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
              OUR BRANDS
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-[#EDEDED] mb-4 leading-tight">
              10개의 독창적인 브랜드
            </h1>
            <span className="accent-line block mb-6" />
            <p className="text-[#8A8A8A] text-lg max-w-xl leading-relaxed">
              각자의 철학과 이야기로 한국 외식의 수준을 높입니다
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
                <div
                  key={rowIdx}
                  className="grid grid-cols-12 gap-4"
                >
                  {/* Left card */}
                  <ScrollReveal
                    direction="up"
                    delay={rowIdx * 60}
                    className={`${COL_SPAN[leftSpan] ?? "col-span-6"} col-span-12 md:${COL_SPAN[leftSpan] ?? "col-span-6"}`}
                  >
                    <BrandCard brand={left} height={leftH} sheetTagline={sheetBrandInfoMap[left.id]?.tagline} />
                  </ScrollReveal>

                  {/* Right card */}
                  {right && (
                    <ScrollReveal
                      direction="up"
                      delay={rowIdx * 60 + 80}
                      className={`${COL_SPAN[rightSpan] ?? "col-span-6"} col-span-12 md:${COL_SPAN[rightSpan] ?? "col-span-6"}`}
                    >
                      <BrandCard brand={right} height={rightH} sheetTagline={sheetBrandInfoMap[right.id]?.tagline} />
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
                PARTNERSHIP
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-[#EDEDED] mb-4">
                브랜드 입점·제휴 문의
              </h2>
              <span className="accent-line mx-auto block mb-6" />
              <p className="text-[#8A8A8A] text-base max-w-lg mx-auto mb-8 leading-relaxed">
                넥스트다이닝과 함께 성장할 파트너를 찾습니다. 입점, 제휴, 프랜차이즈 등
                다양한 협력 방식에 대해 언제든지 문의해주세요.
              </p>
              <Link
                href="/contact"
                className="cta-primary inline-flex items-center gap-2 px-8 py-3 bg-[#C8A96E] text-[#0A0A0A] text-sm font-bold tracking-wider uppercase rounded-full hover:bg-[#E8D5B0]"
              >
                문의하기
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

/* ── Brand Card ─────────────────────────────────────────── */

function BrandCard({
  brand,
  height,
  sheetTagline,
}: {
  brand: (typeof brands)[0];
  height: string;
  sheetTagline?: string;
}) {
  const activeCount = brand.locations.filter((l) => l.status === "active").length;
  const hasComingSoon = brand.locations.some((l) => l.status === "coming-soon");
  const categoryMeta = CATEGORY_LABELS[brand.category];

  return (
    <Link
      href={`/brands/${brand.id}`}
      className={`brand-card group relative block w-full ${height} overflow-hidden rounded-xl hover:shadow-[0_1px_0_0_#C8A96E,0_24px_60px_-16px_rgba(0,0,0,0.5)]`}
    >
      {/* Image */}
      <div className="img-premium absolute inset-0 overflow-hidden">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="brand-image object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent group-hover:from-[#0A0A0A] group-hover:via-[#0A0A0A]/55 transition-all duration-500" />

      {/* Top-left: category badge */}
      {categoryMeta && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm ${categoryMeta.className}`}
          >
            {categoryMeta.label}
          </span>
        </div>
      )}

      {/* Top-right: coming soon badge OR logo */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
        {hasComingSoon && (
          <span className="text-xs bg-[#C8A96E]/90 text-[#0A0A0A] px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm">
            오픈 예정
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

      {/* Bottom: text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-1">
          {brand.nameEn}
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-white mb-2 leading-tight">
          {brand.name}
        </h3>
        <p className="text-[#EDEDED]/80 text-sm max-w-md leading-relaxed mb-4 line-clamp-2">
          {sheetTagline || brand.tagline}
        </p>

        {/* Bottom pills */}
        <div className="flex flex-wrap items-center gap-2">
          {activeCount > 0 && (
            <span className="text-xs bg-white/10 text-[#EDEDED] px-3 py-1 rounded-full border border-white/15 backdrop-blur-sm">
              {activeCount}개 매장
            </span>
          )}
        </div>
      </div>

      {/* View indicator */}
      <span className="absolute bottom-6 right-6 text-xs tracking-[0.2em] uppercase text-[#C8A96E] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-body">
        View →
      </span>

      {/* Gold bottom border on hover — rendered via brand-card CSS class */}
    </Link>
  );
}
