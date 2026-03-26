import { notFound } from "next/navigation";
import Link from "next/link";
import { brands, getBrandById } from "@/lib/brands";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

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
  american: "양식",
  cafe: "카페",
};

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  active: { label: "운영 중", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "coming-soon": { label: "오픈 예정", color: "bg-amber-50 text-amber-700 border-amber-200" },
  closed: { label: "폐점", color: "bg-stone-50 text-stone-400 border-stone-200" },
};

const STORY_SECTIONS = [
  { key: "originStory", title: "탄생 이야기", titleEn: "Origin Story", icon: "01" },
  { key: "chefOrArtisan", title: "장인의 길", titleEn: "The Artisan", icon: "02" },
  { key: "ingredientPhilosophy", title: "식재료 철학", titleEn: "Ingredients", icon: "03" },
  { key: "signatureMenu", title: "시그니처", titleEn: "Signature", icon: "04" },
  { key: "spaceExperience", title: "공간 경험", titleEn: "Space & Experience", icon: "05" },
] as const;

export default async function BrandDetailPage({ params }: Props) {
  const { id } = await params;
  const brand = getBrandById(id);
  if (!brand) notFound();

  const activeLocations = brand.locations.filter((l) => l.status === "active");
  const elements = brand.storyElements;
  const storyEntries = elements
    ? STORY_SECTIONS.filter((s) => elements[s.key as keyof typeof elements])
    : [];
  const accentColor = brand.accentColor || '#1c1917';

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
        ...(loc.phone && { telephone: loc.phone }),
        ...(loc.hours && { openingHours: loc.hours }),
        address: {
          "@type": "PostalAddress",
          streetAddress: loc.address,
          addressLocality: loc.address.startsWith('서울') ? '서울' : loc.address.startsWith('경기') ? '경기' : loc.address.startsWith('부산') ? '부산' : loc.address.split(' ')[0],
          addressCountry: loc.address.includes('NY') || loc.address.includes('New York') || loc.address.includes('Manhattan') ? 'US' : 'KR',
        },
        url: `https://next-dining.com/brands/${brand.id}`,
        ...(brand.menuHighlights && brand.menuHighlights.length > 0 && {
          hasMenu: {
            "@type": "Menu",
            hasMenuSection: {
              "@type": "MenuSection",
              name: "대표 메뉴",
              hasMenuItem: brand.menuHighlights.map((item) => ({
                "@type": "MenuItem",
                name: item.name,
                offers: {
                  "@type": "Offer",
                  price: item.price,
                  priceCurrency: "KRW",
                },
              })),
            },
          },
        }),
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

      {/* 풀스크린 히어로 — 브랜드 컬러 그라데이션 */}
      <section className="relative min-h-[75vh] text-white flex items-end overflow-hidden noise-overlay">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 30%, #0c0c0c 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Decorative circle */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-32 lg:pb-24 lg:pt-48 w-full">
          <ScrollReveal>
            <Link href="/brands" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors mb-10">
              ← 레스토랑 전체 보기
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex items-center gap-3 mb-4">
              <span className="glass text-xs text-white/80 px-3 py-1 rounded-full">
                {CATEGORY_LABEL[brand.category]}
              </span>
              {brand.priceRange && (
                <span className="text-xs text-white/40">{brand.priceRange}</span>
              )}
              {brand.cuisine && (
                <span className="text-xs text-white/40">/ {brand.cuisine}</span>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-sm font-medium tracking-[0.25em] text-white/40 mb-3 uppercase">{brand.nameEn}</p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">{brand.name}</h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-xl sm:text-2xl text-white/70 max-w-2xl leading-relaxed font-light">
              {brand.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 브랜드 소개 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-4">About</p>
            <p className="text-lg text-stone-700 leading-relaxed">{brand.description}</p>
            <blockquote className="mt-10 pl-6 relative">
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <p className="text-stone-600 leading-relaxed italic text-[15px]">{brand.story}</p>
            </blockquote>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{ backgroundColor: accentColor }}
              >
                공식 웹사이트 방문 →
              </a>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* 5대 스토리 요소 — 교차 레이아웃 */}
      {storyEntries.length > 0 && (
        <section>
          {storyEntries.map((section, idx) => {
            const content = elements![section.key as keyof typeof elements]!;
            const isEven = idx % 2 === 0;

            return (
              <div key={section.key} className={`${isEven ? 'bg-white' : 'bg-stone-50/50'}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                  <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* 이미지/그라데이션 영역 */}
                    <ScrollReveal direction={isEven ? 'left' : 'right'} className="w-full lg:w-1/2">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(${isEven ? '135deg' : '225deg'}, ${accentColor}40 0%, ${accentColor}15 50%, transparent 100%)`,
                          }}
                        />
                        <div className="absolute inset-0 bg-stone-100" style={{ mixBlendMode: 'multiply' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-[80px] font-bold opacity-10 select-none"
                            style={{ color: accentColor }}
                          >
                            {section.icon}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* 텍스트 영역 */}
                    <ScrollReveal direction={isEven ? 'right' : 'left'} className="w-full lg:w-1/2">
                      <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
                        {section.titleEn}
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">
                        {section.title}
                      </h2>
                      <div
                        className="w-8 h-0.5 rounded-full mb-6"
                        style={{ backgroundColor: accentColor }}
                      />
                      <p className="text-stone-600 leading-relaxed text-[15px]">{content}</p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* 메뉴 & 가격 */}
      {brand.menuHighlights && brand.menuHighlights.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">Menu & Price</p>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">대표 메뉴</h2>
            <div className="w-12 h-0.5 bg-stone-900 mb-10" />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brand.menuHighlights.map((item, idx) => (
              <ScrollReveal key={item.name} delay={idx * 80}>
                <div className="group flex items-center justify-between bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all">
                  <span className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">{item.name}</span>
                  <span
                    className="text-sm font-medium ml-4 shrink-0"
                    style={{ color: accentColor }}
                  >
                    {item.price}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-stone-400">* 가격은 매장 및 시기에 따라 변동될 수 있습니다.</p>
        </section>
      )}

      {/* 지점 안내 */}
      <section className="bg-stone-50/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <ScrollReveal className="lg:w-5/12">
              <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">Locations</p>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">지점 안내</h2>
              <div className="w-12 h-0.5 bg-stone-900 mb-6" />
              <p className="text-stone-500 leading-relaxed">
                {brand.name}을(를) 가까운 지점에서 만나보세요.
              </p>
              {activeLocations.length > 0 && (
                <Link
                  href="/contact"
                  className="mt-8 inline-block text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ backgroundColor: accentColor }}
                >
                  예약·문의하기
                </Link>
              )}
            </ScrollReveal>

            <div className="lg:w-7/12">
              {brand.locations.length > 0 ? (
                <div className="space-y-4">
                  {brand.locations.map((loc, idx) => {
                    const status = STATUS_LABEL[loc.status];
                    const reservationLink = brand.reservationLinks?.find(
                      (r) => r.location === loc.name || (!r.location && brand.reservationLinks!.length === 1)
                    );
                    return (
                      <ScrollReveal key={loc.name} delay={idx * 80}>
                        <div className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <p className="font-semibold text-stone-900 text-lg">{loc.name}</p>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full border ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-stone-500">{loc.address}</p>
                          {loc.phone && (
                            <p className="text-sm text-stone-500 mt-1">
                              <a href={`tel:${loc.phone.replace(/[^0-9+()-]/g, '')}`} className="hover:text-stone-900 transition-colors">{loc.phone}</a>
                            </p>
                          )}
                          {loc.hours && (
                            <p className="text-xs text-stone-400 mt-1.5">{loc.hours}</p>
                          )}
                          {reservationLink && loc.status === 'active' && (
                            <a
                              href={reservationLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                              style={{ backgroundColor: accentColor }}
                            >
                              캐치테이블 예약 →
                            </a>
                          )}
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 border border-stone-100 text-center">
                  <p className="text-stone-500">지점 오픈 준비 중입니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 키워드 (SEO) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-lg font-bold mb-6">이런 분께 추천합니다</h2>
            <div className="flex flex-wrap gap-2">
              {brand.keywords.map((kw) => (
                <span key={kw} className="text-sm bg-stone-50 border border-stone-200 px-4 py-2 rounded-full text-stone-600 hover:border-stone-300 transition-colors">
                  #{kw}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 예약/문의 CTA 배너 */}
      {activeLocations.length > 0 && (
        <section className="relative text-white py-16 overflow-hidden noise-overlay">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #0c0c0c 100%)`,
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-2">{brand.name}을(를) 직접 경험해 보세요</h2>
              <p className="text-white/60 text-sm">캐치테이블에서 바로 예약하거나, 문의 페이지에서 상세 안내를 확인하세요.</p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="bg-white text-stone-900 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-stone-100 transition-colors"
                >
                  예약·문의하기
                </Link>
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    공식 사이트 →
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 다른 브랜드 */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">More Brands</p>
                <h2 className="text-2xl font-bold">넥스트다이닝의 다른 브랜드</h2>
              </div>
              <Link href="/brands" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                전체 보기 →
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {brands
              .filter((b) => b.id !== brand.id)
              .slice(0, 4)
              .map((b, idx) => (
                <ScrollReveal key={b.id} delay={idx * 100}>
                  <Link
                    href={`/brands/${b.id}`}
                    className="brand-card group block rounded-2xl border border-stone-100 overflow-hidden bg-white"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div className={`brand-image absolute inset-0 brand-gradient-${b.id}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-[80px] font-bold leading-none select-none">
                          {b.nameEn.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-stone-400 tracking-wider uppercase mb-0.5">{b.nameEn}</p>
                      <p className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">{b.name}</p>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1">{b.tagline}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
