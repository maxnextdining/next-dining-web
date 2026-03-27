import Link from "next/link";
import { brands } from "@/lib/brands";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "NEXT DINING — 넥스트다이닝",
  description:
    "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시 등 9개 프리미엄 외식 브랜드를 운영합니다. 서울 한남동, 강남, 명동, 잠실, 부산, 뉴욕 등 전국·해외 17개 매장.",
};

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "넥스트다이닝 (Next Dining Corp)",
    alternateName: "NEXT DINING",
    url: "https://next-dining.com",
    description:
      "봉우리 한정식, 진가와, 분지로, 다이센스시 등 9개 프리미엄 외식 브랜드 17개 직영 매장을 운영하는 한국 멀티 브랜드 외식 그룹",
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
    a: "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시, NOFLEX NYC 등 9개 프리미엄 외식 브랜드를 운영하는 멀티 브랜드 외식 그룹입니다. 서울·수원·부산·여주·뉴욕 등 전국·해외 17개 직영 매장을 운영하며, 검증된 장인의 브랜드를 발굴·운영하는 것이 핵심 역량입니다.",
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
    q: "뉴욕에 있는 넥스트다이닝 레스토랑은?",
    a: "NOFLEX NYC는 뉴욕 맨해튼 5번가(286 5th Avenue)에 위치한 미디어 아트 레스토랑 & 칵테일 바입니다. 72피트 LED 월에 투사되는 몰입형 디지털 아트와 함께 대담한 칵테일과 모던 다이닝을 즐길 수 있습니다.",
  },
];

const STATS = [
  { value: "9", label: "브랜드" },
  { value: "17", label: "직영 매장" },
  { value: "5", label: "도시" },
];

// Bento grid layout: alternating 8+4 and 4+4+4 rows
const BENTO_LAYOUT = [
  { ids: ["bongwoori", "jinkawa"], spans: [8, 4] },
  { ids: ["bunjiro", "daisen", "jinjin-mandu"], spans: [4, 4, 4] },
  { ids: ["takumi-nagasaki", "cafe-le-sens"], spans: [4, 8] },
  { ids: ["menya-always", "noflex-nyc", "bongwoori-soban"], spans: [4, 4, 4] },
];

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  korean: { label: "한식", color: "bg-[#e9c176]/20 text-[#e9c176]" },
  japanese: { label: "일식", color: "bg-[#b8c8dc]/20 text-[#b8c8dc]" },
  cafe: { label: "카페", color: "bg-[#cbc6bc]/20 text-[#cbc6bc]" },
  american: { label: "양식", color: "bg-[#c4b5fd]/20 text-[#c4b5fd]" },
};

export default function HomePage() {
  return (
    <div className="bg-[#131313] text-[#e5e2e1]">
      <OrganizationJsonLd />
      <FaqJsonLd items={FAQ_ITEMS} />

      {/* ===== 히어로 (Stitch Dark Editorial) ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden hero-gradient">
        {/* Decorative blurred circles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#e9c176]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#b8c8dc]/5 blur-[100px] rounded-full" />
        </div>
        <div className="noise-overlay absolute inset-0 z-[1] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full text-center">
          <ScrollReveal>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tighter mb-8">
              검증된 장인의 맛을<br />
              <span className="gold-gradient-text font-bold">새로운 기준으로</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#c5c6cb] font-body font-light leading-relaxed mb-12">
              봉우리 한정식부터 나가사키 장인 돈카츠, 뉴욕 맨해튼까지.
              <br className="hidden sm:block" />
              10개 브랜드가 각자의 철학과 이야기로 한국 외식의 수준을 높입니다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="#brands"
                className="w-full sm:w-auto px-10 py-4 bg-[#e5e2e1] text-[#131313] font-bold tracking-widest hover:bg-[#e9c176] transition-colors duration-300 text-sm"
              >
                브랜드 보기
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-10 py-4 border border-[#44474b]/30 glass-card text-[#e5e2e1] font-medium tracking-widest hover:border-[#e9c176] transition-colors duration-300 text-sm"
              >
                입점 문의
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={500}>
            <div className="grid grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto border-t border-[#44474b]/10 pt-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-headline text-[#e9c176] mb-2">{stat.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#c5c6cb] font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 브랜드 벤토 그리드 (Stitch Asymmetric Layout) ===== */}
      <section id="brands" className="py-32 px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div className="max-w-2xl">
              <span className="text-[#e9c176] text-xs font-bold tracking-[0.3em] uppercase mb-4 block font-body">
                Our Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-light leading-tight">
                장인 정신이 깃든<br />독창적인 브랜드 라인업
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="space-y-6">
          {BENTO_LAYOUT.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {row.ids.map((brandId, colIdx) => {
                const brand = brands.find((b) => b.id === brandId);
                if (!brand) return null;
                const span = row.spans[colIdx];
                const isLarge = span === 8;
                const catInfo = CATEGORY_LABELS[brand.category] || CATEGORY_LABELS.japanese;
                const activeLocCount = brand.locations.filter((l) => l.status === "active").length;

                return (
                  <ScrollReveal key={brand.id} delay={colIdx * 120} className={span === 8 ? 'md:col-span-8' : 'md:col-span-4'}>
                    <Link
                      href={`/brands/${brand.id}`}
                      className={`brand-card group relative block overflow-hidden ${isLarge ? 'h-[500px]' : 'h-[400px]'} rounded-lg`}
                      style={{
                        background: `linear-gradient(135deg, ${brand.accentColor || '#231600'} 0%, #131313 100%)`,
                      }}
                    >
                      {/* Initial letter watermark */}
                      <div className={`absolute top-10 right-10 font-serif select-none pointer-events-none ${isLarge ? 'text-[12rem]' : 'text-[8rem]'} opacity-[0.05] text-[#e9c176]`}>
                        {brand.nameEn.charAt(0)}
                      </div>

                      {/* Content */}
                      <div className="absolute inset-0 p-10 lg:p-12 flex flex-col justify-end z-10">
                        <div className="flex gap-2 mb-4">
                          <span className={`px-3 py-1 ${catInfo.color} text-[10px] tracking-widest rounded-full font-body`}>
                            {catInfo.label}
                          </span>
                          {activeLocCount > 0 && (
                            <span className="px-3 py-1 bg-white/5 text-[#c5c6cb] text-[10px] tracking-widest rounded-full font-body">
                              {activeLocCount}개 매장
                            </span>
                          )}
                          {brand.locations.some((l) => l.status === "coming-soon") && (
                            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-[10px] tracking-widest rounded-full font-body">
                              신규 오픈
                            </span>
                          )}
                        </div>
                        <h3 className={`font-headline font-bold mb-2 ${isLarge ? 'text-3xl' : 'text-2xl'}`}>
                          {brand.name}
                          <span className="text-[#c5c6cb] font-light ml-2 text-base">
                            {brand.nameEn}
                          </span>
                        </h3>
                        <p className={`text-[#c5c6cb] font-body font-light ${isLarge ? 'max-w-md' : 'text-sm'}`}>
                          {brand.tagline}
                        </p>
                        {brand.priceRange && (
                          <div className="mt-4">
                            <span className="glass text-xs text-[#e9c176] px-3 py-1 rounded-full">
                              {brand.priceRange}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ===== Philosophy Quote (Stitch Pattern) ===== */}
      <section className="py-40 bg-[#0e0e0e]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <ScrollReveal>
            <div className="text-[#e9c176] text-5xl mb-12 font-serif">&ldquo;</div>
            <p className="font-headline text-3xl md:text-4xl italic font-light leading-relaxed text-[#e5e2e1] mb-12">
              우리는 단순한 음식을 넘어,<br className="hidden md:block" />
              그릇에 담긴 철학과 공간이 주는 영감을<br className="hidden md:block" />
              새로운 기준으로 큐레이션합니다.
            </p>
            <div className="h-px w-24 bg-[#e9c176] mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 채용 CTA ===== */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ScrollReveal direction="scale">
          <div className="relative glass-card rounded-2xl p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#e9c176]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#c5c6cb] uppercase mb-3 font-body">Join Us</p>
              <h2 className="text-2xl lg:text-3xl font-bold font-headline mb-3">넥스트다이닝과 함께 성장할 분을 찾습니다</h2>
              <p className="text-[#c5c6cb] text-sm leading-relaxed max-w-lg font-body">
                요리사, 서비스 스태프, 경영지원팀까지. 좋은 음식과 좋은 공간을 만들고 싶은 분들의 지원을 기다립니다.
              </p>
            </div>
            <Link
              href="/careers"
              className="relative shrink-0 bg-[#e5e2e1] text-[#131313] px-8 py-4 text-sm font-semibold hover:bg-[#e9c176] transition-colors"
            >
              채용 공고 보기
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FAQ — GEO 최적화 ===== */}
      <section className="py-24 bg-[#0e0e0e]">
        <div className="mx-auto max-w-3xl px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#c5c6cb] uppercase mb-2 font-body">FAQ</p>
              <h2 className="text-3xl font-bold font-headline">자주 묻는 질문</h2>
              <div className="mt-4 mx-auto w-12 h-px bg-[#e9c176]" />
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => (
              <ScrollReveal key={faq.q} delay={idx * 60}>
                <div className="glass-card rounded-xl p-6 border border-[#44474b]/20 hover:border-[#e9c176]/30 transition-all">
                  <h3 className="font-semibold text-[#e5e2e1] mb-2 font-body">Q. {faq.q}</h3>
                  <p className="text-sm text-[#c5c6cb] leading-relaxed font-body">A. {faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
