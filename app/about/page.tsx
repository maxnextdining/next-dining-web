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
    id: "daisen",
    title: "다이센스시",
    origin: "큐슈 지방 압도적 1위 브랜드 와카타케마루(若竹丸) 한국 진출",
    highlight: "큐슈 최고의 스시야가 한남동 카운터에",
  },
  {
    id: "jinjin-mandu",
    title: "진진만두",
    origin: "여의도 30년 경력 남승욱 대표 창립",
    highlight: "30년 한자리, 변하지 않는 손맛",
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
              한국 법인 다이센스시까지 — 넥스트다이닝이 운영하는 브랜드 뒤에는 반드시 검증된 이야기가 있습니다.
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
