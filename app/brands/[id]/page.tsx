import { notFound } from "next/navigation";
import Link from "next/link";
import { brands, getBrandById } from "@/lib/brands";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return brands.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const brand = getBrandById(id);
  if (!brand) return {};

  const locationNames = brand.locations
    .filter((l) => l.status === "active")
    .map((l) => l.name)
    .join(", ");

  return {
    title: `${brand.name} (${brand.nameEn})`,
    description: `${brand.description} 운영 지점: ${locationNames || "오픈 준비 중"}`,
    keywords: brand.keywords,
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  japanese: "일식",
  korean: "한식",
  cafe: "카페",
};

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  active: { label: "운영 중", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "coming-soon": { label: "오픈 예정", color: "bg-amber-50 text-amber-700 border-amber-200" },
  closed: { label: "폐점", color: "bg-stone-50 text-stone-400 border-stone-200" },
};

export default async function BrandDetailPage({ params }: Props) {
  const { id } = await params;
  const brand = getBrandById(id);
  if (!brand) notFound();

  const activeLocations = brand.locations.filter((l) => l.status === "active");
  const comingSoon = brand.locations.filter((l) => l.status === "coming-soon");

  // Schema.org Restaurant JSON-LD
  const jsonLd = activeLocations.length > 0
    ? activeLocations.map((loc) => ({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: brand.name,
        alternateName: brand.nameEn,
        description: brand.description,
        servesCuisine: brand.cuisine || CATEGORY_LABEL[brand.category],
        priceRange: brand.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: loc.address,
          addressLocality: "서울",
          addressCountry: "KR",
        },
        url: `https://next-dining.com/brands/${brand.id}`,
        parentOrganization: {
          "@type": "Organization",
          name: "넥스트다이닝 (Next Dining Corp)",
          url: "https://next-dining.com",
        },
      }))
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd) }}
        />
      )}

      {/* 히어로 */}
      <section className="bg-stone-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/brands" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-white transition-colors mb-8">
            ← 레스토랑 전체 보기
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-stone-300">
                  {CATEGORY_LABEL[brand.category]}
                </span>
                {brand.priceRange && (
                  <span className="text-xs text-stone-500">{brand.priceRange}</span>
                )}
              </div>
              <p className="text-sm font-medium tracking-widest text-stone-400 mb-2">{brand.nameEn}</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{brand.name}</h1>
              <p className="text-lg text-stone-300 max-w-xl">{brand.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 이미지 플레이스홀더 */}
      <div className="aspect-[21/9] bg-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-stone-400 text-sm">대표 이미지 (준비 중)</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-12">
            {/* 브랜드 소개 */}
            <section>
              <h2 className="text-xl font-bold mb-4">브랜드 소개</h2>
              <p className="text-stone-600 leading-relaxed text-[15px]">{brand.description}</p>
            </section>

            {/* 브랜드 스토리 */}
            <section>
              <h2 className="text-xl font-bold mb-4">브랜드 스토리</h2>
              <blockquote className="border-l-2 border-stone-900 pl-6">
                <p className="text-stone-700 leading-relaxed italic text-[15px]">{brand.story}</p>
              </blockquote>
            </section>

            {/* 키워드 (검색 노출용) */}
            <section>
              <h2 className="text-xl font-bold mb-4">이런 분께 추천합니다</h2>
              <div className="flex flex-wrap gap-2">
                {brand.keywords.map((kw) => (
                  <span key={kw} className="text-sm bg-stone-50 border border-stone-200 px-3 py-1 rounded-full text-stone-600">
                    #{kw}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* 사이드: 지점 정보 */}
          <div>
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 sticky top-20">
              <h2 className="font-bold text-stone-900 mb-5">지점 안내</h2>

              {brand.locations.length > 0 ? (
                <div className="space-y-4">
                  {brand.locations.map((loc) => {
                    const status = STATUS_LABEL[loc.status];
                    return (
                      <div key={loc.name} className="pb-4 border-b border-stone-200 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-stone-900 text-sm">{loc.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500">{loc.address}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-stone-500">지점 오픈 준비 중입니다.</p>
              )}

              {activeLocations.length > 0 && (
                <Link
                  href="/contact"
                  className="mt-6 block w-full text-center bg-stone-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
                >
                  예약·문의하기
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 넥스트다이닝 다른 브랜드 */}
      <section className="bg-stone-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold">넥스트다이닝의 다른 브랜드</h2>
            <Link href="/brands" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
              전체 보기 →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {brands
              .filter((b) => b.id !== brand.id)
              .slice(0, 4)
              .map((b) => (
                <Link
                  key={b.id}
                  href={`/brands/${b.id}`}
                  className="shrink-0 w-52 rounded-xl border border-stone-200 bg-white hover:border-stone-400 transition-colors p-4"
                >
                  <div className="aspect-square bg-stone-100 rounded-lg mb-3" />
                  <p className="text-xs text-stone-400 mb-1">{b.nameEn}</p>
                  <p className="text-sm font-semibold text-stone-900">{b.name}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
