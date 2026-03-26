import Link from "next/link";
import { brands } from "@/lib/brands";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "NEXT DINING — 넥스트다이닝",
  description:
    "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시 등 10개 프리미엄 외식 브랜드를 운영합니다. 서울 한남동, 강남, 명동, 잠실 등 전국 15개 매장.",
};

const BRAND_SECTIONS = [
  {
    label: "한식",
    labelEn: "Korean",
    ids: ["bongwoori", "jinjin-mandu", "bongwoori-soban"],
  },
  {
    label: "일식",
    labelEn: "Japanese",
    ids: ["jinkawa", "bunjiro", "daisen", "takumi-nagasaki", "menya-always"],
  },
  {
    label: "카페 / 라운지",
    labelEn: "Cafe & Lounge",
    ids: ["cafe-le-sens", "noflex-nyc"],
  },
];

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "넥스트다이닝 (Next Dining Corp)",
    alternateName: "NEXT DINING",
    url: "https://next-dining.com",
    description:
      "봉우리 한정식, 진가와, 분지로, 다이센스시 등 10개 프리미엄 외식 브랜드를 운영하는 한국 멀티 브랜드 외식 그룹",
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
    a: "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시, NOFLEX NYC 등 10개 프리미엄 외식 브랜드를 운영하는 멀티 브랜드 외식 그룹입니다. 서울·수원·부산·여주 등 전국 15개 이상 직영 매장과 뉴욕 맨해튼 매장을 운영하며, 검증된 장인의 브랜드를 발굴·운영하는 것이 핵심 역량입니다.",
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

// Stats for the hero
const STATS = [
  { value: "10", label: "브랜드" },
  { value: "15+", label: "직영 매장" },
  { value: "4", label: "도시" },
];

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd items={FAQ_ITEMS} />

      {/* 히어로 */}
      <section className="relative min-h-[90vh] hero-gradient text-white overflow-hidden flex items-center noise-overlay">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.35em] text-stone-400 uppercase mb-8">
              Next Dining Corp.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[1.02] tracking-tight max-w-5xl">
              검증된 장인의 맛을
              <br />
              <span className="text-gradient">새로운 기준</span>으로
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="mt-8 text-lg sm:text-xl text-stone-400 max-w-xl leading-relaxed">
              봉우리 한정식부터 나가사키 장인 돈카츠, 뉴욕 맨해튼까지.
              <br className="hidden sm:block" />
              10개 브랜드가 각자의 철학과 이야기로 한국 외식의 수준을 높입니다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/brands" className="group relative bg-white text-stone-900 px-8 py-4 rounded-xl text-sm font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-white/10">
                <span className="relative z-10">브랜드 보기</span>
                <div className="absolute inset-0 bg-stone-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/contact" className="glass text-stone-300 px-8 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">
                입점 문의
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={500}>
            <div className="mt-20 flex gap-12 sm:gap-16">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-stone-500 mt-1 tracking-wider uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 브랜드 갤러리 — 카테고리별 */}
      {BRAND_SECTIONS.map((section, sectionIdx) => {
        const sectionBrands = section.ids
          .map((id) => brands.find((b) => b.id === id))
          .filter(Boolean);

        return (
          <section
            key={section.label}
            className={`${sectionIdx % 2 === 0 ? "bg-white" : "bg-stone-50/50"} py-24`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mb-12">
                  <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">
                    {section.labelEn}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold">{section.label}</h2>
                  <div className="mt-4 w-12 h-0.5 bg-stone-900" />
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionBrands.map((brand, brandIdx) => {
                  if (!brand) return null;
                  return (
                    <ScrollReveal key={brand.id} delay={brandIdx * 100}>
                      <Link
                        href={`/brands/${brand.id}`}
                        className="brand-card group block rounded-2xl overflow-hidden border border-stone-100 bg-white"
                      >
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <div
                            className={`brand-image absolute inset-0 brand-gradient-${brand.id}`}
                          />
                          {/* Brand initial overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/20 text-[120px] font-bold leading-none select-none">
                              {brand.nameEn.charAt(0)}
                            </span>
                          </div>
                          {/* Price range badge */}
                          {brand.priceRange && (
                            <div className="absolute top-4 left-4">
                              <span className="glass text-xs text-white/80 px-2.5 py-1 rounded-full">
                                {brand.priceRange}
                              </span>
                            </div>
                          )}
                          {brand.locations.some((l) => l.status === "coming-soon") && (
                            <div className="absolute top-4 right-4">
                              <span className="text-xs bg-amber-400/90 px-2.5 py-1 rounded-full text-amber-900 font-medium">
                                신규 오픈 예정
                              </span>
                            </div>
                          )}
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                        </div>
                        <div className="p-6">
                          <p className="text-[10px] font-semibold text-stone-400 tracking-[0.15em] uppercase mb-1.5">
                            {brand.nameEn}
                          </p>
                          <h3 className="font-bold text-stone-900 text-xl mb-2 group-hover:text-stone-700 transition-colors">{brand.name}</h3>
                          <p className="text-sm text-stone-500 mb-4 line-clamp-2 leading-relaxed">{brand.tagline}</p>
                          {brand.storyElements?.originStory && (
                            <p className="text-xs text-stone-400 line-clamp-2 border-t border-stone-100 pt-4 leading-relaxed">
                              {brand.storyElements.originStory}
                            </p>
                          )}
                          <div className="mt-4 flex items-center gap-2 flex-wrap">
                            {brand.locations
                              .filter((l) => l.status === "active")
                              .slice(0, 3)
                              .map((loc) => (
                                <span
                                  key={loc.name}
                                  className="text-[11px] bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-full text-stone-600"
                                >
                                  {loc.name}
                                </span>
                              ))}
                            {brand.locations.filter((l) => l.status === "active").length > 3 && (
                              <span className="text-[11px] text-stone-400">
                                +{brand.locations.filter((l) => l.status === "active").length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* 채용 CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <ScrollReveal direction="scale">
          <div className="relative bg-stone-900 text-white rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 overflow-hidden noise-overlay">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">Join Us</p>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">넥스트다이닝과 함께 성장할 분을 찾습니다</h2>
              <p className="text-stone-400 text-sm leading-relaxed max-w-lg">
                요리사, 서비스 스태프, 경영지원팀까지. 좋은 음식과 좋은 공간을 만들고 싶은 분들의 지원을 기다립니다.
              </p>
            </div>
            <Link href="/careers" className="relative shrink-0 bg-white text-stone-900 px-8 py-4 rounded-xl font-semibold text-sm hover:bg-stone-100 transition-colors">
              채용 공고 보기
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ — GEO 최적화 */}
      <section className="bg-stone-50/50 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">FAQ</p>
              <h2 className="text-3xl font-bold">자주 묻는 질문</h2>
              <div className="mt-4 mx-auto w-12 h-0.5 bg-stone-900" />
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => (
              <ScrollReveal key={faq.q} delay={idx * 60}>
                <div className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-stone-900 mb-2">Q. {faq.q}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">A. {faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
