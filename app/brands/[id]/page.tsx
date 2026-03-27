import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { brands, getBrandById } from "@/lib/brands";
import { fetchBrandMenu } from "@/lib/menu-sheets";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

/** ISR: 1시간마다 재생성 — Google Sheets 메뉴 반영 */
export const revalidate = 3600;

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
  { key: "originStory", title: "탄생 이야기", titleEn: "The Origin", icon: "01" },
  { key: "chefOrArtisan", title: "장인의 길", titleEn: "Craftsmanship", icon: "02" },
  { key: "ingredientPhilosophy", title: "식재료 철학", titleEn: "Ingredients", icon: "03" },
  { key: "signatureMenu", title: "시그니처", titleEn: "Signature", icon: "04" },
  { key: "spaceExperience", title: "공간 경험", titleEn: "Atmosphere", icon: "05" },
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

  // Google Sheets 메뉴 fetch (fallback: 하드코딩 데이터)
  const sheetMenu = await fetchBrandMenu(id);
  const menuItems = sheetMenu.length > 0
    ? sheetMenu.map((m) => ({ name: m.menuName, price: m.price }))
    : (brand.menuHighlights ?? []);

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
        ...(menuItems.length > 0 && {
          hasMenu: {
            "@type": "Menu",
            hasMenuSection: {
              "@type": "MenuSection",
              name: "대표 메뉴",
              hasMenuItem: menuItems.map((item) => ({
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

      {/* ===== 풀스크린 히어로 (Stitch Pattern) ===== */}
      <section className="relative min-h-[85vh] text-white flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${accentColor}cc 0%, ${accentColor} 50%, #0c0c0c 100%)`,
          }}
        />
        {/* Brand hero image */}
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="noise-overlay absolute inset-0 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        {/* Decorative background element */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-20 pb-16 pt-32 lg:pb-24 lg:pt-48 w-full">
          <ScrollReveal>
            <Link href="/brands" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 font-body uppercase tracking-widest text-xs">
              ← 브랜드 전체 보기
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1 bg-white/10 backdrop-blur-xl border border-white/10 text-white text-xs tracking-widest uppercase font-body">
                {CATEGORY_LABEL[brand.category]}
              </span>
              {brand.priceRange && (
                <span className="text-white/50 font-body tracking-widest text-xs">{brand.priceRange}</span>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex items-end gap-6">
              <Image src={brand.logo} alt={`${brand.name} 로고`} width={96} height={96} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-xl brightness-0 invert" />
              <div className="space-y-2">
                <span className="block text-white/40 font-body tracking-[0.4em] text-sm font-bold uppercase">{brand.nameEn}</span>
                <h1 className="text-white font-headline font-bold text-6xl sm:text-7xl lg:text-[8rem] leading-none tracking-tighter">{brand.name}</h1>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <p className="text-white/70 font-headline text-lg md:text-2xl font-light tracking-tight mt-6 max-w-2xl">
              {brand.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 브랜드 소개 (Stitch About Section) ===== */}
      <section className="bg-white py-32 px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 items-start">
          <ScrollReveal className="md:col-span-7">
            <h2 className="font-headline text-4xl md:text-5xl mb-10 leading-tight" style={{ color: accentColor }}>
              {brand.tagline}
            </h2>
            <div className="space-y-8 text-stone-600 text-lg leading-relaxed font-body">
              <p>{brand.description}</p>
              {brand.story && (
                <blockquote className="border-l-4 pl-8 py-4 italic font-headline text-xl" style={{ borderColor: accentColor, color: accentColor }}>
                  &ldquo;{brand.story}&rdquo;
                </blockquote>
              )}
            </div>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-white px-8 py-4 text-sm font-medium font-body tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: accentColor }}
              >
                공식 웹사이트 방문 →
              </a>
            )}
          </ScrollReveal>
          <ScrollReveal delay={200} className="md:col-span-5">
            <div className="aspect-[4/5] relative overflow-hidden" style={{ backgroundColor: `${accentColor}15` }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-headline text-[12rem] font-bold opacity-[0.06] select-none" style={{ color: accentColor }}>
                  {brand.nameEn.charAt(0)}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 5대 스토리 (Stitch Alternating Sections) ===== */}
      {storyEntries.length > 0 && (
        <section className="bg-stone-50 py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-32 lg:space-y-40">
            {storyEntries.map((section, idx) => {
              const content = elements![section.key as keyof typeof elements]!;
              const isReversed = idx % 2 !== 0;

              return (
                <div key={section.key} className={`grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center`}>
                  {/* Visual block */}
                  <ScrollReveal
                    direction={isReversed ? 'right' : 'left'}
                    className={isReversed ? 'order-2 md:order-2' : ''}
                  >
                    <div className="relative h-[400px] lg:h-[500px] overflow-hidden" style={{ backgroundColor: accentColor }}>
                      <div className="noise-overlay absolute inset-0 z-10 pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/10 font-headline text-[12rem] lg:text-[15rem] font-bold select-none">{section.icon}</span>
                      </div>
                      <div className={`absolute bottom-10 ${isReversed ? 'right-10' : 'left-10'} w-24 h-px bg-white/30 z-20`} />
                    </div>
                  </ScrollReveal>

                  {/* Text block */}
                  <ScrollReveal
                    direction={isReversed ? 'left' : 'right'}
                    className={isReversed ? 'order-1 md:order-1' : ''}
                  >
                    <div className="space-y-6">
                      <span className="font-body text-xs tracking-widest uppercase text-stone-400">{section.titleEn}</span>
                      <h3 className="font-headline text-3xl lg:text-4xl" style={{ color: accentColor }}>
                        {section.icon} {section.title}
                      </h3>
                      <p className="text-stone-600 leading-relaxed text-lg font-body">{content}</p>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== 메뉴 & 가격 (Google Sheets CMS 연동) ===== */}
      {menuItems.length > 0 && (
        <section className="bg-white py-32 px-6 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
                <h2 className="font-headline text-4xl lg:text-5xl" style={{ color: accentColor }}>Premium Menu</h2>
                <span className="font-body text-sm tracking-widest text-stone-400 uppercase">Artisan Crafted Selection</span>
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item, idx) => (
                <ScrollReveal key={item.name} delay={idx * 80}>
                  <div className="group p-8 border border-stone-200 hover:border-stone-300 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h4 className="font-headline text-xl" style={{ color: accentColor }}>{item.name}</h4>
                      </div>
                      <span className="font-bold font-body" style={{ color: accentColor }}>{item.price}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="mt-8 text-xs text-stone-400 font-body">* 가격은 매장 및 시기에 따라 변동될 수 있습니다.</p>
          </div>
        </section>
      )}

      {/* ===== 포토 갤러리 ===== */}
      {brand.gallery && brand.gallery.length > 0 && (
        <section className="bg-white py-32 px-6 sm:px-10 lg:px-20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
                <h2 className="font-headline text-4xl lg:text-5xl" style={{ color: accentColor }}>Gallery</h2>
                <span className="font-body text-sm tracking-widest text-stone-400 uppercase">공간과 메뉴</span>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {brand.gallery.map((src, idx) => (
                <ScrollReveal key={src} delay={idx * 80}>
                  <div className={`relative overflow-hidden group ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                    <div className={`relative ${idx === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                      <Image
                        src={src}
                        alt={`${brand.name} 사진 ${idx + 1}`}
                        fill
                        sizes={idx === 0 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 지점 안내 (Stitch Location Cards) ===== */}
      <section className="bg-stone-50 py-32 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-headline text-4xl mb-16 text-center" style={{ color: accentColor }}>Locations</h2>
          </ScrollReveal>
          {brand.locations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brand.locations.map((loc, idx) => {
                const status = STATUS_LABEL[loc.status];
                const reservationLink = brand.reservationLinks?.find(
                  (r) => r.location === loc.name || (!r.location && brand.reservationLinks!.length === 1)
                );
                return (
                  <ScrollReveal key={loc.name} delay={idx * 100}>
                    <div className="bg-white p-10 lg:p-12 flex flex-col h-full border border-stone-200">
                      <div className="flex justify-between items-start mb-8">
                        <span className={`text-[10px] tracking-widest px-3 py-1 font-body uppercase border rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                        <h3 className="font-headline text-xl lg:text-2xl" style={{ color: accentColor }}>{loc.name}</h3>
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-grow font-body">{loc.address}</p>
                      {loc.phone && (
                        <p className="text-sm text-stone-500 mb-2 font-body">
                          <a href={`tel:${loc.phone.replace(/[^0-9+()-]/g, '')}`} className="hover:text-stone-900 transition-colors">{loc.phone}</a>
                        </p>
                      )}
                      {loc.hours && (
                        <p className="text-xs text-stone-400 mb-6 font-body">{loc.hours}</p>
                      )}
                      {reservationLink && loc.status === 'active' && (
                        reservationLink.url ? (
                          <a
                            href={reservationLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center text-white py-4 font-body text-sm tracking-widest transition-opacity hover:opacity-80"
                            style={{ backgroundColor: accentColor }}
                          >
                            예약하기
                          </a>
                        ) : reservationLink.note ? (
                          <div
                            className="w-full text-center py-4 font-body text-sm tracking-widest border"
                            style={{ color: accentColor, borderColor: accentColor }}
                          >
                            {reservationLink.note}
                          </div>
                        ) : null
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-10 border border-stone-200 text-center">
              <p className="text-stone-500 font-body">지점 오픈 준비 중입니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== 키워드 (SEO) ===== */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <ScrollReveal>
            <h2 className="text-lg font-bold font-headline mb-6">이런 분께 추천합니다</h2>
            <div className="flex flex-wrap gap-2">
              {brand.keywords.map((kw) => (
                <span key={kw} className="text-sm bg-stone-50 border border-stone-200 px-4 py-2 rounded-full text-stone-600 hover:border-stone-300 transition-colors font-body">
                  #{kw}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA 배너 (Stitch Pattern) ===== */}
      {activeLocations.length > 0 && (
        <section className="relative py-32 lg:py-40 px-6 sm:px-10 overflow-hidden" style={{ backgroundColor: accentColor }}>
          <div className="noise-overlay absolute inset-0 z-[1] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
          />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-headline text-4xl md:text-6xl text-white mb-12 leading-tight">
                {brand.name}을(를) 직접<br />경험해 보세요.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="bg-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-stone-100 transition-colors font-body"
                  style={{ color: accentColor }}
                >
                  예약·문의하기
                </Link>
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/20 text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-colors font-body"
                  >
                    공식 사이트 →
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== 다른 브랜드 ===== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2 font-body">More Brands</p>
                <h2 className="text-2xl font-bold font-headline">넥스트다이닝의 다른 브랜드</h2>
              </div>
              <Link href="/brands" className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-body">
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
                    className="brand-card group block overflow-hidden border border-stone-100"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div className={`brand-image absolute inset-0 brand-gradient-${b.id}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-[80px] font-bold leading-none select-none font-headline">
                          {b.nameEn.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-[10px] text-stone-400 tracking-wider uppercase mb-0.5 font-body">{b.nameEn}</p>
                      <p className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors font-headline">{b.name}</p>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1 font-body">{b.tagline}</p>
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
