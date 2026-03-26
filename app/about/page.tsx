import Link from "next/link";
import { brands } from "@/lib/brands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "브랜드 스토리",
  description:
    "넥스트다이닝은 이하연 김치 명인의 봉우리, 370년 전통 진가와, 나가사키 장인 분지로, 큐슈 1위 다이센스시 등 검증된 외식 브랜드를 한국에서 운영하는 프리미엄 외식 그룹입니다.",
};

const BRAND_ORIGINS = [
  {
    id: "bongwoori",
    title: "봉우리 한정식",
    origin: "대한민국 국가 공인 김치 명인 이하연 명인 창립",
    highlight: "국가 공인 김치 명인의 발효 철학을 담은 한 상",
  },
  {
    id: "bongwoori-soban",
    title: "봉우리 소반",
    origin: "봉우리 한정식의 정신을 편안한 형태로",
    highlight: "명인의 맛을 캐주얼하게 — 아울렛에서 만나는 정갈한 한식",
  },
  {
    id: "jinkawa",
    title: "진가와",
    origin: "나가사키 현 미나미 시마바라, 약 370년 전통 수연면",
    highlight: "370년 끊이지 않은 장인의 손끝에서 나오는 면",
  },
  {
    id: "bunjiro",
    title: "분지로",
    origin: "나가사키 돈카츠 장인 타카다 유지(高田祐治) 창립",
    highlight: "장인이 평생 다듬어온 돈카츠 철학의 한국 이식",
  },
  {
    id: "takumi-nagasaki",
    title: "타쿠미나가사키",
    origin: "16세기 무역항 나가사키의 독자적 식문화",
    highlight: "일식과 서양식이 교차하는 나가사키만의 Fine Casual",
  },
  {
    id: "daisen",
    title: "다이센스시",
    origin: "큐슈 지방 압도적 1위 브랜드 와카타케마루(若竹丸) 한국 진출",
    highlight: "큐슈 최고의 스시야가 한남동 카운터에",
  },
  {
    id: "cafe-le-sens",
    title: "카페 르상스",
    origin: "사운즈한남의 문화적 에너지에서 탄생",
    highlight: "감각(Le Sens)을 깨우는 스페셜티 카페",
  },
  {
    id: "jinjin-mandu",
    title: "진진만두",
    origin: "여의도 30년 경력 남승욱 대표 창립",
    highlight: "30년 한자리, 변하지 않는 손맛",
  },
  {
    id: "menya-always",
    title: "멘야올웨이즈",
    origin: "정통 일본 라멘의 깊은 맛 연구",
    highlight: "매일 12시간 우린 육수, 언제나 한결같은 위안",
  },
  {
    id: "noflex-nyc",
    title: "NOFLEX NYC",
    origin: "넥스트다이닝 첫 해외 직영 — 뉴욕 맨해튼 5th Ave",
    highlight: "미디어 아트 레스토랑이라는 새로운 카테고리를 연 K-다이닝의 글로벌 확장",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* 헤더 */}
      <section className="bg-stone-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase mb-5">Brand Story</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mb-6">
            브랜드가 곧<br />이야기입니다
          </h1>
          <p className="text-stone-400 max-w-xl leading-relaxed text-lg">
            넥스트다이닝의 각 브랜드 뒤에는 수십 년, 혹은 수백 년의 이야기가 있습니다.
            우리는 그 이야기와 철학을 한국 식탁 위에 옮깁니다.
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
              — 넥스트다이닝이 운영하는 10개 브랜드 뒤에는 반드시 검증된 이야기가 있습니다.
            </p>
            <p>
              우리의 역할은 그 본질을 해치지 않으면서, 한국 고객이 최고의 경험을 할 수 있는
              공간과 서비스를 만드는 것입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 브랜드 기원 */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">Brand Origins</p>
          <h2 className="text-3xl font-bold mb-12">각 브랜드의 뿌리</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRAND_ORIGINS.map((item) => (
              <Link
                key={item.id}
                href={`/brands/${item.id}`}
                className="group bg-white rounded-2xl p-7 border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-stone-900 rounded-xl mb-5 group-hover:bg-stone-800 transition-colors" />
                <h3 className="font-bold text-stone-900 text-lg mb-2">{item.title}</h3>
                <p className="text-xs text-stone-400 mb-3">{item.origin}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{item.highlight}</p>
                <p className="mt-4 text-sm text-stone-400 group-hover:text-stone-700 transition-colors">
                  스토리 보기 →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 모든 브랜드 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">전체 브랜드 포트폴리오</h2>
          <Link href="/brands" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
              className="group text-center p-5 rounded-xl border border-stone-100 hover:border-stone-300 transition-all"
            >
              <div className="aspect-square bg-stone-100 rounded-xl mb-3 group-hover:bg-stone-200 transition-colors" />
              <p className="text-xs text-stone-400 mb-0.5">{brand.nameEn}</p>
              <p className="text-sm font-semibold text-stone-900">{brand.name}</p>
            </Link>
          ))}
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
              { value: "10개", label: "프리미엄 브랜드", sub: "일식·한식·양식·카페" },
              { value: "15+", label: "전국 직영 매장", sub: "서울·수원·부산·여주·뉴욕" },
              { value: "~250억", label: "연 매출 규모", sub: "2024년 기준, 전 매장 직영" },
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
