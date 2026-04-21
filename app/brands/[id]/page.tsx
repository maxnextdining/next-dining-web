import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { existsSync } from "fs";
import path from "path";
import { brands, getBrandById } from "@/lib/brands";
import { fetchBrandMenu } from "@/lib/menu-sheets";
import { fetchBrandInfoById, fetchBrandStories } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";

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

  const sheetBrandInfo = await fetchBrandInfoById(id);
  const description = sheetBrandInfo?.description || brand.description;
  const tagline = sheetBrandInfo?.tagline || brand.tagline;

  const locationNames = brand.locations
    .filter((l) => l.status === "active")
    .map((l) => l.name)
    .join(", ");

  return {
    title: `${brand.name} (${brand.nameEn})`,
    description: `${description} 운영 지점: ${locationNames || "오픈 준비 중"}`,
    keywords: brand.keywords,
    openGraph: {
      title: `${brand.name} | NEXT DINING`,
      description: tagline,
      images: [{ url: brand.image, width: 1200, height: 630, alt: brand.name }],
    },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  japanese: "일식",
  korean: "한식",
  american: "양식",
  cafe: "카페",
};

const FORMAT_LABEL: Record<string, string> = {
  dining: "Fine Dining",
  casual: "Casual",
  foodcourt: "Food Court",
  lounge: "Lounge",
  cafe: "Café",
  pub: "Pub",
};

const STATUS_CONFIG: Record<string, { label: string; dotColor: string; textColor: string }> = {
  active:       { label: "운영 중",   dotColor: "bg-emerald-400", textColor: "text-emerald-400" },
  "coming-soon":{ label: "오픈 예정", dotColor: "bg-amber-400",   textColor: "text-amber-400"   },
  closed:       { label: "폐점",      dotColor: "bg-[#8A8A8A]",   textColor: "text-[#8A8A8A]"   },
};

const STORY_SECTIONS = [
  { key: "originStory",           title: "탄생 이야기", titleEn: "THE ORIGIN",       icon: "01", imageFile: "origin.jpg" },
  { key: "chefOrArtisan",         title: "장인의 길",   titleEn: "CRAFTSMANSHIP",    icon: "02", imageFile: "chef.jpg" },
  { key: "ingredientPhilosophy",  title: "식재료 철학", titleEn: "INGREDIENTS",      icon: "03", imageFile: "ingredient.jpg" },
  { key: "signatureMenu",         title: "시그니처",    titleEn: "SIGNATURE",        icon: "04", imageFile: "signature.jpg" },
  { key: "spaceExperience",       title: "공간 경험",   titleEn: "ATMOSPHERE",       icon: "05", imageFile: "space.jpg" },
] as const;

export default async function BrandDetailPage({ params }: Props) {
  const { id } = await params;
  const brand = getBrandById(id);
  if (!brand) notFound();

  const activeLocations = brand.locations.filter((l) => l.status === "active");
  const accentColor = brand.accentColor ?? "#C8A96E";

  const storyImageExists = (imageFile: string): boolean =>
    existsSync(path.join(process.cwd(), "public", "images", "brands", "story", id, imageFile));

  // Google Sheets 데이터 fetch (브랜드 기본정보 + 스토리 + 메뉴)
  const [sheetBrandInfo, sheetStories, sheetMenu] = await Promise.all([
    fetchBrandInfoById(id),
    fetchBrandStories(),
    fetchBrandMenu(id),
  ]);

  // 시트 스토리 데이터 오버레이
  const sheetStory = sheetStories[id];

  // 시트 브랜드 정보 오버레이 (비어있지 않은 값만)
  const brandInfo = {
    tagline: sheetBrandInfo?.tagline || brand.tagline,
    description: sheetBrandInfo?.description || brand.description,
    story: sheetStory?.storyShort || brand.story,
  };
  const elements = sheetStory ? {
    originStory: sheetStory.originStory || brand.storyElements?.originStory,
    chefOrArtisan: sheetStory.chefOrArtisan || brand.storyElements?.chefOrArtisan,
    ingredientPhilosophy: sheetStory.ingredientPhilosophy || brand.storyElements?.ingredientPhilosophy,
    signatureMenu: sheetStory.signatureMenu || brand.storyElements?.signatureMenu,
    spaceExperience: sheetStory.spaceExperience || brand.storyElements?.spaceExperience,
  } : brand.storyElements;

  const storyEntries = elements
    ? STORY_SECTIONS.filter((s) => elements[s.key as keyof typeof elements])
    : [];
  const menuItems: { name: string; price: string; photo?: string }[] =
    sheetMenu.length > 0
      ? sheetMenu.map((m, i) => ({
          name: m.menuName,
          price: m.price,
          photo: brand.menuHighlights?.[i]?.photo,
        }))
      : (brand.menuHighlights ?? []);

  // Schema.org Restaurant JSON-LD
  const jsonLd =
    activeLocations.length > 0
      ? activeLocations.map((loc) => ({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: brand.name,
          alternateName: brand.nameEn,
          description: brandInfo.description,
          servesCuisine: brand.cuisine || CATEGORY_LABEL[brand.category],
          priceRange: brand.priceRange,
          ...(loc.phone && { telephone: loc.phone }),
          ...(loc.hours && { openingHours: loc.hours }),
          address: {
            "@type": "PostalAddress",
            streetAddress: loc.address,
            addressLocality: loc.address.startsWith("서울")
              ? "서울"
              : loc.address.startsWith("경기")
              ? "경기"
              : loc.address.startsWith("부산")
              ? "부산"
              : loc.address.split(" ")[0],
            addressCountry:
              loc.address.includes("NY") ||
              loc.address.includes("New York") ||
              loc.address.includes("Manhattan")
                ? "US"
                : "KR",
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd),
          }}
        />
      )}

      {/* ===== 1. HERO — Immersive brand landing ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <ParallaxImage
          src={brand.heroImage ?? brand.image}
          alt={brand.name}
          overlay="gradient"
          priority
          speed={0.2}
          className="absolute inset-0 w-full h-full"
        />
        {/* Additional gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A] z-20 pointer-events-none" />
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}22 0%, transparent 65%)`,
          }}
        />
        <div className="noise-overlay absolute inset-0 z-20 pointer-events-none" />

        {/* Back link */}
        <div className="absolute top-28 left-6 sm:left-10 lg:left-20 z-30">
          <ScrollReveal>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-body text-xs tracking-widest uppercase"
            >
              ← 모든 브랜드
            </Link>
          </ScrollReveal>
        </div>

        {/* Hero content — centered */}
        <div className="relative z-30 w-full text-center px-6 sm:px-10 max-w-5xl mx-auto pt-32 pb-24">
          {/* Badges */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="px-4 py-1 border border-white/20 backdrop-blur-sm text-white/80 text-xs tracking-widest uppercase font-body">
                {CATEGORY_LABEL[brand.category]}
              </span>
              <span className="px-4 py-1 border border-white/10 backdrop-blur-sm text-white/50 text-xs tracking-widest uppercase font-body">
                {FORMAT_LABEL[brand.format]}
              </span>
            </div>
          </ScrollReveal>

          {/* Logo */}
          <ScrollReveal delay={100}>
            <div className="flex justify-center mb-8">
              <Image
                src={brand.logo}
                alt={`${brand.name} 로고`}
                width={96}
                height={96}
                className="w-20 h-20 md:w-24 md:h-24 object-contain brightness-0 invert drop-shadow-2xl"
              />
            </div>
          </ScrollReveal>

          {/* Brand name */}
          <ScrollReveal delay={200}>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-none tracking-tight mb-3 text-hero-shadow">
              {brand.name}
            </h1>
            <p className="text-[#8A8A8A] font-body tracking-[0.4em] text-sm uppercase mb-2">
              {brand.nameEn}
            </p>
            <p className="text-[#8A8A8A]/60 font-body tracking-[0.3em] text-xs uppercase mb-6">
              {brand.categoryLabel || `${brand.category.toUpperCase()} ${FORMAT_LABEL[brand.format]?.toUpperCase() || brand.format.toUpperCase()}`}
            </p>
          </ScrollReveal>

          {/* Tagline */}
          <ScrollReveal delay={300}>
            <p className="text-xl text-[#EDEDED]/80 font-body leading-relaxed max-w-xl mx-auto mb-10 whitespace-pre-line">
              {brandInfo.tagline}
            </p>
          </ScrollReveal>

          {/* Price + store count pills */}
          <ScrollReveal delay={380}>
            <div className="flex items-center justify-center gap-4 mb-10">
              {activeLocations.length > 0 && (
                <span className="px-5 py-2 bg-white/5 border border-white/10 text-white/70 text-sm font-body rounded-full">
                  {activeLocations.length}개 매장 운영 중
                </span>
              )}
            </div>
          </ScrollReveal>

          {/* Accent line */}
          <ScrollReveal delay={460}>
            <div className="flex justify-center">
              <span className="accent-line animate" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 2. ABOUT — Brand story introduction ===== */}
      <section className="bg-[#0A0A0A] py-32 lg:py-40 px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <ScrollReveal direction="left" className="md:col-span-7">
            <div className="space-y-8">
              <h2
                className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight whitespace-pre-line"
                style={{ color: accentColor }}
              >
                {brandInfo.tagline}
              </h2>
              <p className="text-[#EDEDED]/80 text-lg leading-relaxed font-body">
                {brandInfo.description}
              </p>
              {brandInfo.story && (
                <blockquote
                  className="border-l-4 pl-8 py-4 font-display text-xl font-semibold text-[#C8A96E] leading-relaxed"
                  style={{ borderColor: "#C8A96E" }}
                >
                  &ldquo;{brandInfo.story}&rdquo;
                </blockquote>
              )}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-body tracking-widest uppercase border border-white/20 text-[#EDEDED]/80 hover:text-white hover:border-white/40 px-8 py-4 transition-colors"
                >
                  공식 웹사이트 방문 →
                </a>
              )}
            </div>
          </ScrollReveal>

          {/* Right: summary image or decorative element */}
          <ScrollReveal direction="right" delay={150} className="md:col-span-5">
            <div
              className="relative aspect-[4/5] overflow-hidden flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)` }}
            >
              {storyImageExists("summary.jpg") ? (
                <Image
                  src={`/images/brands/story/${brand.id}/summary.jpg`}
                  alt={`${brand.name} — 브랜드 소개`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <span
                  className="font-display font-bold select-none pointer-events-none leading-none"
                  style={{
                    fontSize: "clamp(8rem, 18vw, 14rem)",
                    color: accentColor,
                    opacity: 0.07,
                  }}
                >
                  {brand.nameEn.charAt(0)}
                </span>
              )}
              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2"
                style={{ borderColor: accentColor }}
              />
              <div
                className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2"
                style={{ borderColor: accentColor }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 3. FIVE STORY CHAPTERS ===== */}
      {storyEntries.length > 0 && (
        <section>
          {storyEntries.map((section, idx) => {
            const content = elements![section.key as keyof typeof elements]!;
            const isEven = idx % 2 === 0;
            const bgColor = isEven ? "#0A0A0A" : "#0F0F0F";
            const chapterNum = String(idx + 1).padStart(2, "0");

            return (
              <div key={section.key} style={{ backgroundColor: bgColor }} className="relative overflow-hidden">
                {/* Decorative chapter number background */}
                <div className="absolute top-0 right-0 text-[12rem] md:text-[16rem] font-display leading-none opacity-[0.03] select-none pointer-events-none">
                  {chapterNum}
                </div>

                {/* Chapter divider (not first) */}
                {idx > 0 && (
                  <div className="section-divider mx-6 sm:mx-10 lg:mx-20" />
                )}

                <div className="py-24 lg:py-32 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center ${
                      !isEven ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    {/* Story image (이미지 없으면 장식 블록 fallback) */}
                    <ScrollReveal
                      direction={isEven ? "left" : "right"}
                      className={!isEven ? "md:[direction:ltr]" : ""}
                    >
                      <div
                        className="relative h-80 lg:h-96 overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}08 100%)`,
                          borderLeft: `2px solid ${accentColor}30`,
                        }}
                      >
                        {storyImageExists(section.imageFile) ? (
                          <>
                            <Image
                              src={`/images/brands/story/${brand.id}/${section.imageFile}`}
                              alt={`${brand.name} — ${section.title}`}
                              fill
                              sizes="(min-width: 768px) 50vw, 100vw"
                              className="object-cover"
                            />
                            {/* 이미지 위 그래디언트 오버레이 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span
                                className="font-display font-bold select-none pointer-events-none leading-none"
                                style={{ fontSize: "clamp(6rem, 14vw, 10rem)", color: accentColor, opacity: 0.12 }}
                              >
                                {chapterNum}
                              </span>
                            </div>
                            <div
                              className="absolute bottom-6 left-6 w-16 h-px"
                              style={{ backgroundColor: `${accentColor}50` }}
                            />
                          </>
                        )}
                      </div>
                    </ScrollReveal>

                    {/* Text block */}
                    <ScrollReveal
                      direction={isEven ? "right" : "left"}
                      delay={150}
                      className={!isEven ? "md:[direction:ltr]" : ""}
                    >
                      <div className="space-y-5">
                        <div className="flex items-center gap-4">
                          <span
                            className="font-display text-6xl leading-none"
                            style={{ color: accentColor, opacity: 0.2 }}
                          >
                            {chapterNum}
                          </span>
                          <div>
                            <p className="text-xs tracking-widest uppercase text-[#8A8A8A] font-body mb-1">
                              {section.titleEn}
                            </p>
                            <h3 className="font-display text-2xl text-[#EDEDED]">
                              {section.title}
                            </h3>
                          </div>
                        </div>
                        <div
                          className="w-10 h-px"
                          style={{ backgroundColor: accentColor }}
                        />
                        <p className="text-[#EDEDED]/70 leading-relaxed text-base lg:text-lg font-body">
                          {content}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* ===== 4. CHEF/ARTISAN PROFILE ===== */}
      {elements?.chefOrArtisan && (
        <section className="bg-[#0A0A0A] py-32 px-6 sm:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            {/* Section label */}
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-16">
                <span className="text-xs tracking-[0.3em] uppercase text-[#8A8A8A] font-body">
                  Artisan
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Photo / placeholder */}
              <ScrollReveal direction="left">
                <div
                  className="relative aspect-[3/4] overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: "#141414" }}
                >
                  {brand.chefPhoto ? (
                    <Image
                      src={brand.chefPhoto}
                      alt={brand.chefName ?? `${brand.name} 장인`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center space-y-2">
                      <span
                        className="font-display text-[8rem] leading-none select-none"
                        style={{ color: accentColor, opacity: 0.08 }}
                      >
                        匠
                      </span>
                      <p className="text-[#8A8A8A] text-xs font-body tracking-widest">
                        사진 준비 중
                      </p>
                    </div>
                  )}
                  {/* Accent border accent */}
                  <div
                    className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 z-10"
                    style={{ borderColor: accentColor }}
                  />
                </div>
              </ScrollReveal>

              {/* Bio text */}
              <ScrollReveal direction="right" delay={150}>
                <div className="space-y-6">
                  <div>
                    <span
                      className="text-xs tracking-[0.3em] uppercase font-body"
                      style={{ color: accentColor }}
                    >
                      Master Artisan
                    </span>
                    {brand.chefName && (
                      <h3
                        className="font-display text-3xl lg:text-4xl mt-2 text-[#EDEDED]"
                        style={{ color: accentColor }}
                      >
                        {brand.chefName}
                      </h3>
                    )}
                    {brand.chefTitle && (
                      <p className="text-[#8A8A8A] font-body mt-2 text-sm">
                        {brand.chefTitle}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-px" style={{ backgroundColor: accentColor }} />
                  <p className="text-[#EDEDED]/70 leading-relaxed text-lg font-body">
                    {elements.chefOrArtisan}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ===== 5. MENU & PRICING ===== */}
      {menuItems.length > 0 && (
        <section className="bg-[#0F0F0F] py-32 px-6 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs tracking-[0.3em] uppercase text-[#8A8A8A] font-body">
                  MENU
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-[#EDEDED] mb-16">
                시그니처 메뉴
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {menuItems.map((item, idx) => (
                <ScrollReveal key={item.name} delay={idx * 60}>
                  <div className="group bg-[#141414] border border-white/5 hover:border-[#C8A96E]/20 hover:border-t-[#C8A96E]/50 transition-all duration-300 overflow-hidden">
                    {/* Photo area placeholder / actual photo */}
                    {item.photo ? (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.photo}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div
                        className="relative aspect-[4/3] overflow-hidden flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}12 0%, #141414 100%)`,
                        }}
                      >
                        <span
                          className="font-display text-5xl select-none"
                          style={{ color: accentColor, opacity: 0.15 }}
                        >
                          {item.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-display text-lg text-[#EDEDED] leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-[#C8A96E] text-sm font-body font-medium whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="mt-8 text-xs text-[#8A8A8A] font-body">
              * 가격은 매장 및 시기에 따라 변동될 수 있습니다.
            </p>
          </div>
        </section>
      )}

      {/* ===== 6. PHOTO GALLERY ===== */}
      {brand.gallery && brand.gallery.length > 0 && (
        <section className="bg-[#0A0A0A] py-32 px-6 sm:px-10 lg:px-20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs tracking-[0.3em] uppercase text-[#8A8A8A] font-body">
                  GALLERY
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-[#EDEDED] mb-16">
                공간과 메뉴
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-3 lg:gap-4">
              {brand.gallery.map((src, idx) => {
                const isHero = idx === 0;
                const isWide = idx === 4 && brand.gallery!.length > 5;
                return (
                  <ScrollReveal key={src} delay={Math.min(idx, 8) * 70}>
                    <div
                      className={`img-premium relative overflow-hidden rounded-lg group ${
                        isHero ? "col-span-2 row-span-2" : isWide ? "col-span-2" : ""
                      }`}
                    >
                      <div
                        className={`relative ${
                          isHero ? "aspect-square" : isWide ? "aspect-[2/1]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${brand.name} ${idx + 1}`}
                          fill
                          sizes={
                            isHero
                              ? "(max-width: 1024px) 100vw, 50vw"
                              : isWide
                              ? "(max-width: 1024px) 100vw, 50vw"
                              : "(max-width: 1024px) 50vw, 25vw"
                          }
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== 7. LOCATIONS ===== */}
      <section className="bg-[#0F0F0F] py-32 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#8A8A8A] font-body">
                LOCATIONS
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-[#EDEDED] mb-16">
              매장 안내
            </h2>
          </ScrollReveal>

          {brand.locations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brand.locations.map((loc, idx) => {
                const status = STATUS_CONFIG[loc.status];
                const reservationLink = brand.reservationLinks?.find(
                  (r) =>
                    r.location === loc.name ||
                    (!r.location && brand.reservationLinks!.length === 1)
                );
                return (
                  <ScrollReveal key={loc.name} delay={idx * 100}>
                    <div className="bg-[#141414] border border-white/5 p-8 lg:p-10 flex flex-col h-full hover:border-white/10 transition-colors">
                      {/* Name + status row */}
                      <div className="mb-6">
                        <h3 className="font-display text-xl lg:text-2xl text-[#EDEDED] mb-2">
                          {loc.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dotColor}${loc.status === "active" ? " animate-pulse" : ""}`} />
                          <span className={`text-xs font-body tracking-wider ${status.textColor}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4 flex-grow font-body">
                        {loc.address}
                      </p>

                      {/* Contact */}
                      {loc.phone && (
                        <p className="text-sm text-[#EDEDED]/60 mb-2 font-body">
                          <a
                            href={`tel:${loc.phone.replace(/[^0-9+()-]/g, "")}`}
                            className="hover:text-[#EDEDED] transition-colors"
                          >
                            {loc.phone}
                          </a>
                        </p>
                      )}
                      {loc.hours && (
                        <p className="text-xs text-[#8A8A8A] mb-6 font-body">{loc.hours}</p>
                      )}

                      {/* Reservation */}
                      {reservationLink && loc.status === "active" && (
                        reservationLink.url ? (
                          <a
                            href={reservationLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center text-white py-4 font-body text-xs tracking-widest uppercase transition-opacity hover:opacity-80 mt-auto"
                            style={{ backgroundColor: accentColor }}
                          >
                            예약하기
                          </a>
                        ) : reservationLink.note ? (
                          <div
                            className="w-full text-center py-4 font-body text-xs tracking-widest uppercase border mt-auto"
                            style={{ color: accentColor, borderColor: `${accentColor}40` }}
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
            <div className="bg-[#141414] border border-white/5 p-10 text-center">
              <p className="text-[#8A8A8A] font-body">지점 오픈 준비 중입니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== 8. SEO KEYWORDS ===== */}
      <section className="bg-[#0A0A0A] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-[#8A8A8A] font-body mb-6">
              이런 분께 추천합니다
            </p>
            <div className="flex flex-wrap gap-2">
              {brand.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-4 py-2 bg-[#141414] border border-white/5 text-[#8A8A8A] text-sm font-body rounded-full hover:border-white/10 hover:text-[#EDEDED] transition-colors"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 9. BRAND CTA ===== */}
      {activeLocations.length > 0 && (
        <section
          className="relative py-32 lg:py-40 px-6 sm:px-10 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 60%, #0A0A0A 100%)`,
          }}
        >
          <div className="noise-overlay absolute inset-0 z-[1] pointer-events-none" />
          {/* Radial light */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accentColor}40, transparent 70%)`,
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
                직접 경험해 보세요
              </h2>
              <p className="text-white/60 font-body text-lg mb-12">
                {brand.name}의 특별한 식경험이 기다립니다.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white px-10 py-5 font-body text-sm font-semibold tracking-widest uppercase hover:bg-[#EDEDED] transition-colors"
                  style={{ color: accentColor }}
                >
                  예약·문의하기
                </Link>
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-5 font-body text-sm font-semibold tracking-widest uppercase hover:bg-white/10 transition-colors"
                  >
                    공식 사이트 →
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== 10. RELATED BRANDS ===== */}
      <section className="bg-[#0A0A0A] py-24 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#8A8A8A] font-body mb-2">
                  More Brands
                </p>
                <h2 className="font-display text-2xl lg:text-3xl text-[#EDEDED]">
                  다른 브랜드 둘러보기
                </h2>
              </div>
              <Link
                href="/brands"
                className="text-sm text-[#8A8A8A] hover:text-[#EDEDED] transition-colors font-body whitespace-nowrap"
              >
                전체 보기 →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {brands
              .filter((b) => b.id !== brand.id)
              .slice(0, 4)
              .map((b, idx) => (
                <ScrollReveal key={b.id} delay={idx * 80}>
                  <Link
                    href={`/brands/${b.id}`}
                    className="brand-card group block overflow-hidden border border-white/5 bg-[#141414]"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={b.image}
                        alt={b.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-[#8A8A8A] tracking-wider uppercase mb-0.5 font-body">
                        {b.nameEn}
                      </p>
                      <p className="text-sm font-semibold text-[#EDEDED] group-hover:text-white transition-colors font-display">
                        {b.name}
                      </p>
                      <p className="text-xs text-[#8A8A8A] mt-1 line-clamp-1 font-body">
                        {b.tagline}
                      </p>
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
