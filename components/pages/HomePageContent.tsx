import Link from "next/link";
import Image from "next/image";
import { brands } from "@/lib/brands";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";
import AnimatedCounter from "@/components/AnimatedCounter";
import FaqAccordion from "@/components/FaqAccordion";
import type { Lang } from "@/lib/i18n";
import { t, langPrefix } from "@/lib/i18n";

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

interface Props {
  lang: Lang;
  sheetBrandInfoMap: Record<string, { tagline: string }>;
  heroHeading1: string;
  heroHeading2: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stat1Value: number;
  stat1Label: string;
  stat2Value: number;
  stat2Label: string;
  stat3Value: number;
  stat3Label: string;
  philosophyQuote: string;
  recruitHeading: string;
  recruitHeading2: string;
  recruitDescription: string;
  recruitCta: string;
  faqItems: { q: string; a: string }[];
}

export default function HomePageContent({
  lang,
  sheetBrandInfoMap,
  heroHeading1,
  heroHeading2,
  heroSubtitle,
  ctaPrimary,
  ctaSecondary,
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label,
  stat3Value,
  stat3Label,
  philosophyQuote,
  recruitHeading,
  recruitHeading2,
  recruitDescription,
  recruitCta,
  faqItems,
}: Props) {
  const prefix = langPrefix(lang);

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED]">

      {/* ===== 1. HERO — Cinematic Fullscreen ===== */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden gradient-mesh">
        <ParallaxImage
          src="/images/hero-main.jpg"
          alt="넥스트다이닝 대표 이미지"
          overlay="gradient"
          priority
          speed={0.12}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-[#0A0A0A] z-[11] pointer-events-none" />
        <div className="absolute inset-0 z-[12] pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#C8A96E]/8 blur-[140px] rounded-full" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#6B8CAE]/5 blur-[120px] rounded-full" />
        </div>
        <div className="absolute inset-0 z-[12] pointer-events-none hidden lg:block">
          <div className="deco-float top-[20%] right-[8%] w-24 h-24 border border-[#C8A96E]/10" />
          <div className="deco-float bottom-[30%] left-[5%] w-16 h-16 border border-white/5" />
          <div className="deco-float top-[60%] right-[15%] w-8 h-8 bg-[#C8A96E]/5" />
        </div>
        <div className="noise-overlay absolute inset-0 z-[13] pointer-events-none" />

        <div className="relative z-[20] max-w-7xl mx-auto px-8 w-full text-center">
          <ScrollReveal delay={200}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[5.5rem] leading-[1.1] tracking-tight mb-6 text-hero-shadow">
              <span className="block">{heroHeading1}</span>
              <span className="block gold-gradient-text">{heroHeading2}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="flex justify-center mb-8">
              <span className="accent-line animate" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={650}>
            <p className="max-w-[65ch] mx-auto text-lg md:text-xl text-[#8A8A8A] font-body font-light leading-relaxed mb-12 whitespace-pre-line">
              {heroSubtitle}
            </p>
          </ScrollReveal>

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
              {t(lang, 'home.portfolio_label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight whitespace-pre-line">
              {t(lang, 'home.portfolio_heading')}
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
                      href={`${prefix}/brands/${brand.id}`}
                      className={`brand-card border-shimmer group relative block overflow-hidden rounded-lg ${height}`}
                      style={{ background: "#0A0A0A" }}
                    >
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
                        className="object-cover group-hover:scale-[1.08] transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                      <div className="absolute top-6 left-6 z-10 flex gap-2 flex-wrap">
                        {brand.locations.filter((l) => l.status === "active").length > 0 && (
                          <span className="px-3 py-1 bg-white/8 text-[#8A8A8A] text-[10px] tracking-widest rounded-full font-body backdrop-blur-sm">
                            {brand.locations.filter((l) => l.status === "active").length}{t(lang, 'home.stores_count')}
                          </span>
                        )}
                        {brand.id === "menya-always" && (
                          <span className="px-3 py-1 bg-[#C8A96E]/20 text-[#C8A96E] text-[10px] tracking-widest rounded-full font-body backdrop-blur-sm">
                            {t(lang, 'home.coming_soon')}
                          </span>
                        )}
                      </div>

                      <div className={`absolute top-6 right-6 z-10 ${span >= 7 ? "w-16 h-16" : "w-12 h-12"} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}>
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} 로고`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain drop-shadow-lg brightness-0 invert"
                        />
                      </div>

                      <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end z-10">
                        <p className="text-[#8A8A8A] text-sm font-body font-light mb-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out">
                          {sheetBrandInfoMap[brand.id]?.tagline || brand.tagline}
                        </p>
                        <h3 className={`font-display leading-tight mb-1 ${span >= 7 ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                          {lang === 'ja' ? brand.nameEn : brand.name}
                        </h3>
                        <p className="text-[#8A8A8A] text-sm font-body font-light tracking-wider mb-4">
                          {lang === 'ja' ? (brand.cuisine || brand.category.toUpperCase()) : brand.nameEn}
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. PHILOSOPHY ===== */}
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
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A1A]"
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
              { value: 10, suffix: "+", label: t(lang, 'home.stat_brands') },
              { value: 21, suffix: "",  label: t(lang, 'home.stat_stores') },
              { value: 5,  suffix: "",  label: t(lang, 'home.stat_cities') },
              { value: 350, suffix: "億+", label: t(lang, 'home.stat_revenue') },
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

      {/* ===== 6. CAREERS CTA ===== */}
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
              {t(lang, 'home.join_label')}
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              {recruitHeading}<br />{recruitHeading2}
            </h2>
            <p className="text-[#8A8A8A] text-base leading-relaxed max-w-lg mx-auto mb-10 font-body whitespace-pre-line">
              {recruitDescription}
            </p>
            <Link
              href="/careers"
              className="cta-primary inline-block px-10 py-4 bg-[#C8A96E] text-[#0A0A0A] font-bold tracking-widest hover:bg-[#E8D5B0] text-sm font-body"
            >
              {recruitCta}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 7. FAQ ===== */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="mx-auto max-w-3xl px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#C8A96E] uppercase mb-3 font-body">
                {t(lang, 'home.faq_label')}
              </p>
              <h2 className="text-3xl md:text-4xl font-display">{t(lang, 'home.faq_heading')}</h2>
              <div className="mt-6 mx-auto w-12 h-px bg-[#C8A96E]" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <FaqAccordion items={faqItems} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
