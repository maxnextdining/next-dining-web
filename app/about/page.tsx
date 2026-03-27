import Link from "next/link";
import Image from "next/image";
import { brands } from "@/lib/brands";
import type { BrandCategory, BrandFormat } from "@/lib/brands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "넥스트다이닝은 이하연 김치 명인의 봉우리, 370년 전통 진가와, 나가사키 장인 분지로, 큐슈 1위 다이센스시 등 검증된 외식 브랜드를 한국에서 운영하는 프리미엄 외식 그룹입니다.",
};

const CATEGORY_LABEL: Record<BrandCategory, string> = {
  korean: "한식",
  japanese: "일식",
  cafe: "카페·라운지",
  american: "양식·글로벌",
};

const CATEGORY_ORDER: BrandCategory[] = ["korean", "japanese", "cafe", "american"];

const FORMAT_LABEL: Record<BrandFormat, string> = {
  dining: "다이닝",
  casual: "캐주얼",
  foodcourt: "푸드코트",
  lounge: "카페라운지",
  pub: "펍·라운지",
};

const FORMAT_COLOR: Record<BrandFormat, string> = {
  dining: "bg-stone-900 text-white",
  casual: "bg-amber-100 text-amber-800",
  foodcourt: "bg-sky-100 text-sky-800",
  lounge: "bg-rose-100 text-rose-800",
  pub: "bg-violet-100 text-violet-800",
};

/** 브랜드별 기원 한 줄 — About 페이지 전용 */
const ORIGIN_LINE: Record<string, string> = {
  bongwoori: "국가 공인 김치 명인 이하연 명인 창립",
  "bongwoori-soban": "봉우리 한정식의 정신을 편안한 형태로",
  "jinjin-mandu": "여의도 30년 내공 남승욱 대표 창립",
  jinkawa: "나가사키 미나미시마바라, 약 370년 전통 수연면",
  bunjiro: "나가사키 돈카츠 장인 타카다 유지(高田祐治) 창립",
  "takumi-nagasaki": "16세기 무역항 나가사키의 독자적 식문화",
  daisen: "큐슈 1위 와카타케마루(若竹丸) 한국 진출",
  "cafe-le-sens": "사운즈한남의 문화적 에너지에서 탄생",
  "menya-always": "정통 일본 라멘의 깊은 맛 연구",
  "noflex-nyc": "넥스트다이닝 첫 해외 직영 — 뉴욕 맨해튼 5th Ave",
};

export default function AboutPage() {
  return (
    <div>
      {/* 헤더 */}
      <section className="bg-stone-950 text-white pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase mb-5">About Next Dining</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mb-6">
            검증된 장인의 브랜드를<br />한국에서 운영합니다
          </h1>
          <p className="text-stone-400 max-w-xl leading-relaxed text-lg">
            넥스트다이닝은 수십 년, 수백 년 역사를 가진 장인의 브랜드를 발굴하고
            한국과 해외에서 직영 운영하는 프리미엄 외식 그룹입니다.
          </p>
          <p className="text-stone-500 text-sm mt-4">
            대표이사 장경훈 · 정호상 &nbsp;|&nbsp; 서울시 용산구 대사관로 35, 사운즈 한남 B1
          </p>
        </div>
      </section>

      {/* 운영 철학 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">What We Do</p>
          <h2 className="text-3xl font-bold mb-8">검증된 장인의 브랜드를<br />한국에서 운영합니다</h2>
          <div className="space-y-6 text-stone-600 leading-relaxed text-[15px]">
            <p>
              넥스트다이닝은 외식 브랜드를 직접 만들기보다, 이미 수십 년 이상의 역사와 철학을 가진
              장인의 브랜드를 발굴하고 한국에서 운영하는 것을 핵심으로 합니다.
            </p>
            <p>
              국가 공인 김치 명인이 창립한 봉우리 한정식, 370년 전통의 나가사키 수연면 진가와,
              나가사키 장인 타카다 유지의 돈카츠 분지로, 큐슈 지방 1위 스시야 와카타케마루의
              한국 법인 다이센스시, 뉴욕 맨해튼의 미디어 아트 다이닝 NOFLEX NYC까지
              — 넥스트다이닝이 운영하는 9개 브랜드 뒤에는 반드시 검증된 이야기가 있습니다.
            </p>
            <p>
              우리의 역할은 그 본질을 해치지 않으면서, 한국 고객이 최고의 경험을 할 수 있는
              공간과 서비스를 만드는 것입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 브랜드 포트폴리오 */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">Brand Portfolio</p>
              <h2 className="text-3xl font-bold">10개 브랜드, 4개 업태</h2>
            </div>
            <Link href="/brands" className="hidden sm:inline-block text-sm text-stone-500 hover:text-stone-900 transition-colors">
              전체 보기 →
            </Link>
          </div>

          {CATEGORY_ORDER.map((cat) => {
            const catBrands = brands.filter((b) => b.category === cat);
            if (catBrands.length === 0) return null;
            return (
              <div key={cat} className="mb-12 last:mb-0">
                <h3 className="text-lg font-bold text-stone-800 mb-5 flex items-center gap-3">
                  {CATEGORY_LABEL[cat]}
                  <span className="text-sm font-normal text-stone-400">{catBrands.length}개 브랜드</span>
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {catBrands.map((brand) => {
                    const activeCount = brand.locations.filter((l) => l.status === "active").length;
                    return (
                      <Link
                        key={brand.id}
                        href={`/brands/${brand.id}`}
                        className="group bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all flex gap-5"
                      >
                        <div className="w-14 h-14 shrink-0 bg-stone-50 rounded-xl flex items-center justify-center p-2">
                          <Image src={brand.logo} alt={`${brand.name} 로고`} width={48} height={48} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h4 className="font-bold text-stone-900">{brand.name}</h4>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${FORMAT_COLOR[brand.format]}`}>
                              {FORMAT_LABEL[brand.format]}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400 mb-2">{ORIGIN_LINE[brand.id] ?? brand.tagline}</p>
                          <div className="flex items-center gap-3 text-xs text-stone-500">
                            {activeCount > 0 && <span>{activeCount}개 매장</span>}
                            {brand.priceRange && <span>{brand.priceRange}</span>}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="mt-8 sm:hidden text-center">
            <Link href="/brands" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
              전체 브랜드 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 파트너사 안내 — 바이어/MD 타겟 */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">For Partners</p>
            <h2 className="text-3xl font-bold mb-6">입점·제휴를 검토하고 계신가요?</h2>
            <p className="text-stone-600 leading-relaxed">
              넥스트다이닝은 롯데월드몰, 신세계아울렛, 아이파크몰, 사운즈한남 등 국내 주요 상업시설에 입점 운영 중이며,
              뉴욕 맨해튼에 해외 직영점을 운영하고 있습니다.
              일식·한식·양식·카페 등 다업태 포트폴리오에서 귀사 공간에 최적화된 브랜드를 제안드립니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { value: "9개", label: "프리미엄 브랜드", sub: "일식·한식·양식·카페" },
              { value: "19", label: "전국 직영 매장", sub: "서울·수원·부산·여주·뉴욕" },
              { value: "~350억", label: "연 매출 규모", sub: "2024년 기준, 전 매장 직영" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-7 border border-stone-100 text-center">
                <p className="text-4xl font-bold text-stone-900 mb-2">{s.value}</p>
                <p className="text-sm font-semibold text-stone-700 mb-1">{s.label}</p>
                <p className="text-xs text-stone-400">{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block bg-stone-900 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-stone-800 transition-colors text-center"
            >
              입점·제휴 문의하기
            </Link>
            <Link
              href="/brands"
              className="inline-block border border-stone-300 text-stone-700 px-8 py-3 rounded-xl font-semibold text-sm hover:border-stone-500 transition-colors text-center"
            >
              브랜드 포트폴리오 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Philosophy */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">Vision & Philosophy</p>
        <h2 className="text-3xl font-bold mb-12">4대 핵심 가치</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Originality", desc: "검증된 장인의 전통과 오리지널리티를 발굴하고 보존합니다", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
            { title: "Premium Quality", desc: "최상의 식재료와 조리법으로 타협 없는 품질을 추구합니다", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
            { title: "고객 중심 혁신", desc: "고객 경험을 최우선에 두고 서비스와 공간을 설계합니다", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
            { title: "운영 전문성", desc: "데이터 기반 시스템으로 다업태 직영 매장을 안정적으로 운영합니다", icon: "M12 20V10M18 20V4M6 20v-4" },
          ].map((v) => (
            <div key={v.title} className="bg-stone-50 rounded-2xl p-7 border border-stone-100">
              <div className="w-10 h-10 bg-stone-900 rounded-xl mb-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d={v.icon} />
                </svg>
              </div>
              <h3 className="font-bold text-stone-900 text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 채용 링크 */}
      <section className="bg-stone-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-stone-400 text-sm mb-3">넥스트다이닝과 함께하고 싶으신가요?</p>
          <h2 className="text-2xl font-bold mb-6">팀 이야기가 궁금하다면 채용 페이지를 확인하세요</h2>
          <Link href="/careers" className="inline-block bg-white text-stone-900 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-stone-100 transition-colors">
            채용 안내 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
