import Link from "next/link";
import Image from "next/image";
import { brands } from "@/lib/brands";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";
import AnimatedCounter from "@/components/AnimatedCounter";
import FaqAccordion from "@/components/FaqAccordion";
import { fetchPageContent, fetchBrandInfo } from "@/lib/sheets-cms";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NEXT DINING — 넥스트다이닝",
  description:
    "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시 등 10개 프리미엄 외식 브랜드를 운영합니다. 서울 한남동, 강남, 명동, 잠실, 부산, 뉴욕 등 전국·해외 19개 직영 매장.",
};

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "넥스트다이닝 (Next Dining Corp)",
    alternateName: "NEXT DINING",
    url: "https://next-dining.com",
    description:
      "봉우리 한정식, 진가와, 분지로, 다이센스시 등 10개 프리미엄 외식 브랜드 19개 직영 매장을 운영하는 한국 멀티 브랜드 외식 그룹",
    foundingLocation: { "@type": "Place", name: "서울, 대한민국" },
    areaServed: ["대한민국", "미국"],
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 100 },
    knowsAbout: ["프리미엄 외식", "일식", "한정식", "멀티 브랜드 외식 운영", "해외 브랜드 수입"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const FAQ_ITEMS = [
  {
    q: "넥스트다이닝은 어떤 회사인가요?",
    a: "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시, NOFLEX NYC 등 10개 프리미엄 외식 브랜드를 운영하는 멀티 브랜드 외식 그룹입니다. 서울·수원·부산·여주·뉴욕 등 전국·해외 19개 직영 매장을 운영하며, 검증된 장인의 브랜드를 발굴·운영하는 것이 핵심 역량입니다.",
  },
  {
    q: "한남동에서 데이트하기 좋은 식당은?",
    a: "분지로 사운즈한남점과 다이센스시 사운즈한남점을 추천합니다. 분지로는 나가사키 장인의 프리미엄 돈카츠를, 다이센스시는 프라이빗 룸에서 즐기는 프리미엄 스시를 제공합니다. 두 매장 모두 사운즈한남 복합공간에 위치해 산책과 함께 즐기기 좋습니다.",
  },
  {
    q: "역삼동 비즈니스 식사에 적합한 한식당은?",
    a: "봉우리 한정식 역삼점을 추천드립니다. 코스 형식의 프리미엄 한정식으로 기업 접대와 비즈니스 미팅에 적합한 공간과 서비스를 갖추고 있습니다.",
  },
  {
    q: "서울에서 정통 일본 돈카츠를 먹으려면?",
    a: "분지로는 일본 나가사키의 실제 장인 타카다 유지와 협업해 탄생한 돈카츠 전문점입니다. 명동 한국본점을 비롯해 사운즈한남, 수원, 롯데월드몰에서 즐길 수 있습니다.",
  },
  {
    q: "롯데월드몰에서 식사하기 좋은 일식당은?",
    a: "롯데월드몰에는 진가와(정통 소바)와 분지로(나가사키 돈카츠) 두 매장이 있습니다. 진가와는 100% 메밀 소바, 분지로는 장인의 돈카츠를 선보입니다.",
  },
  {
    q: "넥스트다이닝에 브랜드 입점이나 사업 제휴를 제안하려면?",
    a: "백화점·아울렛·복합몰 등 입점 제안이나 광고·제휴 협업 문의는 communication@next-dining.com으로 보내주세요. 회사 소개 및 제안 내용을 포함해 주시면 담당자가 검토 후 연락드립니다.",
  },
  {
    q: "넥스트다이닝 채용은 어떻게 지원하나요?",
    a: "채용 페이지에서 현재 공개 채용 포지션을 확인하시고 hr@next-dining.com으로 지원하실 수 있습니다. 홀 서비스, 주방(소바 장인 수련생 포함), 본사(마케팅, 경영지원, 브랜드 기획) 등 다양한 포지션이 있으며, 일본 현지 연수 기회도 제공합니다.",
  },
  {
    q: "뉴욕에 있는 넥스트다이닝 브랜드는?",
    a: "NOFLEX NYC는 뉴욕 맨해튼 5번가(286 5th Avenue)에 위치한 미디어 아트 레스토랑 & 칵테일 바입니다. 72피트 LED 월에 투사되는 몰입형 디지털 아트와 함께 대담한 칵테일과 모던 다이닝을 즐길 수 있습니다.",
  },
];

// Asymmetric masonry layout
const BENTO_LAYOUT: { ids: string[]; spans: number[]; heights: string[] }[] = [
  {
    ids: ["bongwoori", "jinkawa"],
    spans: [7, 5],
    heights: ["h-[600px]", "h-[600px]"],
  },
  {
    ids: ["bunjiro", "daisen", "jinjin-mandu"],
    spans: [4, 4, 4],
    heights: ["h-[450px]", "h-[450px]", "h-[450px]"],
  },
  {
    ids: ["takumi-nagasaki", "cafe-le-sens"],
    spans: [5, 7],
    heights: ["h-[500px]", "h-[500px]"],
  },
  {
    ids: ["menya-always", "noflex-nyc", "bongwoori-soban"],
    spans: [4, 4, 4],
    heights: ["h-[450px]", "h-[450px]", "h-[450px]"],
  },
];

function getColSpanClass(span: number): string {
  switch (span) {
    case 4: return "md:col-span-4";
    case 5: return "md:col-span-5";
    case 7: return "md:col-span-7";
    case 8: return "md:col-span-8";
    default: return "md:col-span-4";
  }
}

export default async function HomePage() {
  const [content, sheetBrandInfoList] = await Promise.all([
    fetchPageContent(),
    fetchBrandInfo(),
  ]);
  const sheetBrandInfoMap: Record<string, { tagline: string }> = {};
  for (const info of sheetBrandInfoList) {
    sheetBrandInfoMap[info.brandId] = { tagline: info.tagline };
  }

  const hero = content?.home?.hero;
  const stats = content?.home?.stats;
  const philosophy = content?.home?.philosophy;

  const heroHeading1 = hero?.heading_1 || "다음 세대를 여는";
  const heroHeading2 = hero?.heading_2 || "글로벌 외식 문화기업";
  const heroSubtitle = hero?.subtitle || "검증된 맛을 새로운 기준으로.\n장인의 철학을 담은 브랜드들이 각자의 이야기로 한국 외식의 수준을 높입니다.";
  const ctaPrimary = hero?.cta_primary || "브랜드 보기";
  const ctaSecondary = hero?.cta_secondary || "문의하기";

  const stat1Value = parseInt(stats?.stat_1_value ?? "") || 10;
  const stat1Label = stats?.stat_1_label || "브랜드";
  const stat2Value = parseInt(stats?.stat_2_value ?? "") || 19;
  const stat2Label = stats?.stat_2_label || "직영 매장";
  const stat3Value = parseInt(stats?.stat_3_value ?? "") || 5;
  const stat3Label = stats?.stat_3_label || "도시";

  const philosophyQuote = philosophy?.quote || "우리는 단순한 음식을 넘어,\n그릇에 담긴 철학과 공간이 주는 영감을\n새로운 기준으로 큐레이션합니다.";

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED]">
      <OrganizationJsonLd />
      <FaqJsonLd items={FAQ_ITEMS} />

      {/* ===== 1. HERO — Cinematic Fullscreen ===== */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden gradient-mesh">
        {/* Parallax background */}
        <ParallaxImage
          src="/images/hero-main.jpg"
          alt="넥스트다이닝 대표 이미지"
          overlay="gradient"
          priority
          speed={0.12}
          className="absolute inset-0 z-0"
        />

        {/* Additional gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-[#0A0A0A] z-[11] pointer-events-none" />

        {/* Decorative blurred orbs */}
        <div className="absolute inset-0 z-[12] pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#C8A96E]/8 blur-[140px] rounded-full" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#6B8CAE]/5 blur-[120px] rounded-full" />
        </div>

        {/* Floating geometric decorations */}
        <div className="absolute inset-0 z-[12] pointer-events-none hidden lg:block">
          <div className="deco-float top-[20%] right-[8%] w-24 h-24 border border-[#C8A96E]/10" />
          <div className="deco-float bottom-[30%] left-[5%] w-16 h-16 border border-white/5" />
          <div className="deco-float top-[60%] right-[15%] w-8 h-8 bg-[#C8A96E]/5" />
        </div>

        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0 z-[13] pointer-events-none" />

        <div className="relative z-[20] max-w-7xl mx-auto px-8 w-full text-center">
          {/* Main headline */}
          <ScrollReveal delay={200}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold leading-[1.1] tracking-tight mb-6 text-hero-shadow">
              <span className="block">{heroHeading1}</span>
              <span className="block gold-gradient-text">{heroHeading2}</span>
            </h1>
          </ScrollReveal>

          {/* Gold accent line */}
          <ScrollReveal delay={500}>
            <div className="flex justify-center mb-8">
              <span className="accent-line animate" />
            </div>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={650}>
            <p className="max-w-[65ch] mx-auto text-lg md:text-xl text-[#8A8A8A] font-body font-light leading-relaxed mb-12 whitespace-pre-line">
              {heroSubtitle}
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link
                href="#brands"
                className="cta-primary w-full sm:w-auto px-10 py-4 bg-[#C8A96E] text-[#0A0A0A] font-bold tracking-widest hover:bg-[#E8D5B0] text-sm font-body"
              >
                {ctaPrimary}
              </Link>
              <Link
                href="/contact"
                className="cta-outline w-full sm:w-auto px-10 py-4 border border-[#C8A96E]/50 text-[#C8A96E] font-medium tracking-widest hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 text-sm font-body"
              >
                {ctaSecondary}
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={950}>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/8 pt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display text-[#C8A96E] mb-2">
                  <AnimatedCounter value={stat1Value} suffix="+" />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#8A8A8A] font-body">{stat1Label}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display text-[#C8A96E] mb-2">
                  <AnimatedCounter value={stat2Value} />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#8A8A8A] font-body">{stat2Label}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display text-[#C8A96E] mb-2">
                  <AnimatedCounter value={stat3Value} />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#8A8A8A] font-body">{stat3Label}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 2. BRAND LOGO MARQUEE ===== */}
      <div className="overflow-hidden py-8 border-y border-white/5 marquee-container">
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(calc(-100% / 3)); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
        `}</style>
        <div className="animate-marquee">
          {[...brands, ...brands, ...brands].map((b, i) => (
            <div key={i} className="shrink-0 mx-12 flex items-center">
              <Image
                src={b.logo}
                alt={`${b.name} 로고`}
                width={80}
                height={32}
                className="h-8 w-auto opacity-30 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== 3. BRAND SHOWCASE — Asymmetric Masonry ===== */}
      <section id="brands" className="py-32 px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-[#C8A96E] text-xs font-bold tracking-[0.25em] uppercase mb-4 block font-body">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              장인 정신이 깃든<br />독창적인 브랜드 라인업
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {BENTO_LAYOUT.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {row.ids.map((brandId, colIdx) => {
                const brand = brands.find((b) => b.id === brandId);
                if (!brand) return null;
                const span = row.spans[colIdx];
                const height = row.heights[colIdx];

                return (
                  <ScrollReveal
                    key={brand.id}
                    delay={colIdx * 120}
                    className={getColSpanClass(span)}
                  >
                    <Link
                      href={`/brands/${brand.id}`}
                      className={`brand-card border-shimmer group relative block overflow-hidden rounded-lg ${height}`}
                      style={{
                        background: `linear-gradient(135deg, ${brand.accentColor ?? "#1A1A1A"} 0%, #0A0A0A 100%)`,
                      }}
                    >
                      {/* Background image */}
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        sizes={
                          span >= 7
                            ? "(min-width: 768px) 58vw, 100vw"
                            : span === 5
                            ? "(min-width: 768px) 41vw, 100vw"
                            : "(min-width: 768px) 33vw, 100vw"
                        }
                        className="object-cover opacity-45 group-hover:opacity-60 group-hover:scale-[1.08] transition-all duration-700 ease-out"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />

                      {/* Category badge — top left */}
                      <div className="absolute top-6 left-6 z-10 flex gap-2 flex-wrap">
                        {brand.locations.filter((l) => l.status === "active").length > 0 && (
                          <span className="px-3 py-1 bg-white/8 text-[#8A8A8A] text-[10px] tracking-widest rounded-full font-body backdrop-blur-sm">
                            {brand.locations.filter((l) => l.status === "active").length}개 매장
                          </span>
                        )}
                        {brand.id === "menya-always" && (
                          <span className="px-3 py-1 bg-[#C8A96E]/20 text-[#C8A96E] text-[10px] tracking-widest rounded-full font-body backdrop-blur-sm">
                            오픈 예정
                          </span>
                        )}
                      </div>

                      {/* Brand logo — top right */}
                      <div className={`absolute top-6 right-6 z-10 ${span >= 7 ? "w-16 h-16" : "w-12 h-12"} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}>
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} 로고`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain drop-shadow-lg brightness-0 invert"
                        />
                      </div>

                      {/* Bottom content */}
                      <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end z-10">
                        {/* Tagline — slides up on hover */}
                        <p className="text-[#8A8A8A] text-sm font-body font-light mb-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out">
                          {sheetBrandInfoMap[brand.id]?.tagline || brand.tagline}
                        </p>

                        <h3 className={`font-display font-bold leading-tight mb-1 ${span >= 7 ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                          {brand.name}
                        </h3>
                        <p className="text-[#8A8A8A] text-sm font-body font-light tracking-wider mb-4">
                          {brand.nameEn}
                        </p>

                      </div>

                      {/* Hover: gold border-bottom + subtle overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. PHILOSOPHY — Light cream contrast section ===== */}
      <section className="py-32 md:py-40 bg-[#F7F5F0]">
        <div className="max-w-5xl mx-auto px-8 lg:px-12 md:text-left">
          <ScrollReveal>
            <span className="accent-line mb-16 block" />
          </ScrollReveal>

          <TextReveal
            as="p"
            mode="line"
            delay={100}
            staggerDelay={140}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-relaxed text-[#1A1A1A]"
          >
            {philosophyQuote}
          </TextReveal>

          <ScrollReveal delay={600}>
            <span className="accent-line mt-16 block" />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 5. STATS SECTION ===== */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { value: 10, suffix: "+", label: "브랜드" },
              { value: 19, suffix: "", label: "직영 매장" },
              { value: 5, suffix: "", label: "도시" },
              { value: 350, suffix: "억+", label: "연 매출 (2025년 기준)" },
            ].map((stat, idx) => (
              <ScrollReveal key={stat.label} delay={idx * 100}>
                <div
                  className={`text-center py-12 px-6 relative ${
                    idx < 3 ? "md:border-r border-white/8" : ""
                  } ${idx >= 2 ? "border-t md:border-t-0 border-white/8" : ""}`}
                >
                  <div className="text-5xl md:text-6xl font-display text-[#C8A96E] mb-4 leading-none">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[#8A8A8A] font-body">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. CAREERS CTA — Dramatic ===== */}
      <section className="relative overflow-hidden">
        <ParallaxImage
          src="/images/hero-main.jpg"
          alt="넥스트다이닝 채용"
          overlay="dark"
          speed={0.1}
          className="absolute inset-0 z-0 h-full"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/60 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-8 py-32 text-center">
          <ScrollReveal direction="scale">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#C8A96E] uppercase mb-6 font-body">
              Join Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              넥스트다이닝과 함께<br />성장할 분을 찾습니다
            </h2>
            <p className="text-[#8A8A8A] text-base leading-relaxed max-w-lg mx-auto mb-10 font-body">
              요리사, 서비스 스태프, 경영지원팀까지.<br />
              좋은 음식과 좋은 공간을 만들고 싶은 분들의 지원을 기다립니다.
            </p>
            <Link
              href="/careers"
              className="cta-primary inline-block px-10 py-4 bg-[#C8A96E] text-[#0A0A0A] font-bold tracking-widest hover:bg-[#E8D5B0] text-sm font-body"
            >
              채용 공고 보기
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 7. FAQ — Accordion ===== */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="mx-auto max-w-3xl px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#C8A96E] uppercase mb-3 font-body">
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">자주 묻는 질문</h2>
              <div className="mt-6 mx-auto w-12 h-px bg-[#C8A96E]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <FaqAccordion items={FAQ_ITEMS} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
