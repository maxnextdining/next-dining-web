import Link from "next/link";
import { brands } from "@/lib/brands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXT DINING — 넥스트다이닝",
  description:
    "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시 등 9개 프리미엄 외식 브랜드를 운영합니다. 서울 한남동, 강남, 명동, 잠실 등 전국 15개 매장.",
};

const STATS = [
  { label: "운영 브랜드", value: "9개" },
  { label: "전국 직영 매장", value: "15+" },
  { label: "연 매출(2024)", value: "약 250억" },
  { label: "해외 법인", value: "USA Inc." },
];

const VALUES = [
  { title: "장인정신", titleEn: "Craftsmanship", desc: "타카다 유지 장인의 50년 노하우, 매일 새로 뽑는 소바. 정성은 기술보다 강합니다." },
  { title: "브랜드 경험", titleEn: "Experience", desc: "맛·공간·서비스를 하나의 이야기로 설계해 고객이 오래 기억하는 경험을 만듭니다." },
  { title: "사람 중심", titleEn: "People First", desc: "직원이 행복해야 고객의 경험도 따뜻해집니다. 함께 성장하는 팀을 만들어갑니다." },
  { title: "본질의 가치", titleEn: "Authenticity", desc: "보이는 화려함보다 음식 본연의 깊이를 먼저 생각합니다." },
];

const CATEGORY_LABEL: Record<string, string> = {
  japanese: "일식",
  korean: "한식",
  cafe: "카페",
};

// 히어로에서 순환 표시할 대표 브랜드 3개
const FEATURED_BRANDS = ["bunjiro", "bongwoori", "daisen"];

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "넥스트다이닝 (Next Dining Corp)",
    alternateName: "NEXT DINING",
    url: "https://next-dining.com",
    description:
      "봉우리 한정식, 진가와, 분지로, 다이센스시 등 9개 프리미엄 외식 브랜드를 운영하는 한국 멀티 브랜드 외식 그룹",
    foundingLocation: { "@type": "Place", name: "서울, 대한민국" },
    areaServed: "대한민국",
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
    q: "한남동에서 데이트하기 좋은 식당은?",
    a: "분지로 사운즈한남점과 다이센스시 한남점을 추천합니다. 분지로는 나가사키 장인의 프리미엄 돈카츠를, 다이센스시는 셰프 카운터 오마카세 스시를 제공합니다. 두 매장 모두 사운즈한남 복합공간에 위치해 산책과 함께 즐기기 좋습니다.",
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
    q: "넥스트다이닝 채용 문의는 어떻게 하나요?",
    a: "채용 페이지에서 공개 채용 공고를 확인하시고 온라인으로 지원하실 수 있습니다. 홀·주방·본사(경영지원, 마케팅) 등 다양한 포지션이 있습니다.",
  },
];

export default function HomePage() {
  const activeBrands = brands.filter(
    (b) => b.locations.some((l) => l.status === "active") || b.id === "menya-always"
  );

  const featured = brands.filter((b) => FEATURED_BRANDS.includes(b.id));

  return (
    <>
      <OrganizationJsonLd />

      {/* 히어로 — 몰입형 풀스크린 */}
      <section className="relative min-h-screen bg-stone-950 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-stone-950/70 to-stone-950" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <p className="text-xs font-semibold tracking-[0.3em] text-stone-500 uppercase mb-8">
            Next Dining Corp
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-4xl">
            음식이 만드는
            <br />
            <span className="text-stone-400">새로운 기준</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-stone-400 max-w-xl leading-relaxed">
            봉우리 한정식부터 나가사키 장인 돈카츠까지.
            <br className="hidden sm:block" />
            9개 브랜드가 각자의 철학과 이야기로 한국 외식의 수준을 높입니다.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/brands" className="bg-white text-stone-900 px-8 py-4 rounded-xl text-sm font-semibold hover:bg-stone-100 transition-colors">
              레스토랑 보기
            </Link>
            <Link href="/about" className="border border-stone-600 text-stone-300 px-8 py-4 rounded-xl text-sm font-semibold hover:border-stone-400 hover:text-white transition-colors">
              브랜드 스토리
            </Link>
          </div>

          {/* 대표 브랜드 미리보기 */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((b) => (
              <Link
                key={b.id}
                href={`/brands/${b.id}`}
                className="group bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all"
              >
                <p className="text-xs tracking-widest text-stone-500 mb-2">{b.nameEn}</p>
                <p className="font-semibold text-white mb-1">{b.name}</p>
                <p className="text-sm text-stone-400 line-clamp-2">{b.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 지표 */}
      <section className="bg-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-xs text-stone-500 uppercase tracking-widest">{s.label}</dt>
                <dd className="mt-1 text-3xl font-bold text-stone-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 브랜드 갤러리 — 스토리 강조 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2">Our Restaurants</p>
            <h2 className="text-3xl sm:text-4xl font-bold">9개의 이야기</h2>
          </div>
          <Link href="/brands" className="text-sm text-stone-500 hover:text-stone-900 transition-colors hidden sm:block">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBrands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.id}`} className="group block rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-300 hover:shadow-lg transition-all">
              <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs bg-white/80 backdrop-blur px-2 py-1 rounded-full text-stone-600 font-medium">
                    {CATEGORY_LABEL[brand.category]}
                  </span>
                </div>
                {brand.locations.some((l) => l.status === "coming-soon") && (
                  <div className="absolute top-3 right-3">
                    <span className="text-xs bg-amber-400/90 px-2 py-1 rounded-full text-amber-900 font-medium">신규 오픈 예정</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs text-stone-400 font-medium tracking-wider mb-1">{brand.nameEn}</p>
                <h3 className="font-bold text-stone-900 text-lg mb-1">{brand.name}</h3>
                <p className="text-sm text-stone-500 mb-3 line-clamp-2">{brand.tagline}</p>
                {/* 핵심 스토리 한 줄 */}
                {brand.storyElements?.originStory && (
                  <p className="text-xs text-stone-400 line-clamp-2 border-t border-stone-100 pt-3">
                    {brand.storyElements.originStory}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {brand.locations.filter((l) => l.status === "active").slice(0, 3).map((loc) => (
                    <span key={loc.name} className="text-xs bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-full text-stone-600">
                      {loc.name}
                    </span>
                  ))}
                  {brand.locations.filter((l) => l.status === "active").length > 3 && (
                    <span className="text-xs text-stone-400">
                      +{brand.locations.filter((l) => l.status === "active").length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 가치관 */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2">Our Philosophy</p>
            <h2 className="text-3xl sm:text-4xl font-bold">넥스트다이닝이 지키는 것</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-stone-100 hover:shadow-md transition-shadow">
                <p className="text-xs tracking-widest text-stone-400 uppercase mb-3">{v.titleEn}</p>
                <h3 className="font-bold text-stone-900 text-lg mb-3">{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 채용 CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-stone-900 text-white rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">Join Us</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">넥스트다이닝과 함께 성장할 분을 찾습니다</h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-lg">
              요리사, 서비스 스태프, 경영지원팀까지. 좋은 음식과 좋은 공간을 만들고 싶은 분들의 지원을 기다립니다.
            </p>
          </div>
          <Link href="/careers" className="shrink-0 bg-white text-stone-900 px-8 py-4 rounded-xl font-semibold text-sm hover:bg-stone-100 transition-colors">
            채용 공고 보기
          </Link>
        </div>
      </section>

      {/* FAQ — GEO 최적화 */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2">FAQ</p>
            <h2 className="text-2xl font-bold">자주 묻는 질문</h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-stone-100">
                <h3 className="font-semibold text-stone-900 mb-2">Q. {faq.q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
