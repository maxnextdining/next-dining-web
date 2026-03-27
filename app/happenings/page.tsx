import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "새소식",
  description:
    "넥스트다이닝 브랜드 뉴스 및 새소식. 신규 오픈, 시즌 메뉴, 이벤트 등 최신 소식을 전합니다.",
};

const NEWS_ITEMS = [
  {
    date: "2026.03",
    category: "회사 소식",
    title: "넥스트다이닝 공식 홈페이지 리뉴얼 오픈",
    brand: "넥스트다이닝",
    excerpt:
      "넥스트다이닝이 10개 브랜드의 스토리텔링을 강화한 새로운 공식 홈페이지를 오픈했습니다. 각 브랜드의 탄생 배경, 장인 이야기, 식재료 철학을 더 깊이 전달합니다.",
  },
  {
    date: "2026.02",
    category: "신규 오픈",
    title: "NOFLEX NYC, 뉴욕 맨해튼 5th Ave 정식 오픈",
    brand: "NOFLEX NYC",
    excerpt:
      "넥스트다이닝의 첫 해외 직영 브랜드 NOFLEX NYC가 맨해튼 286 5th Avenue에 정식 오픈했습니다. 72피트 LED 월의 미디어 아트 레스토랑 & 칵테일 바로 뉴욕 다이닝씬에 새로운 카테고리를 제시합니다.",
  },
  {
    date: "2026.01",
    category: "신규 오픈",
    title: "분지로 잠실롯데백화점점 오픈 예정",
    brand: "분지로",
    excerpt:
      "나가사키 장인 타카다 유지의 돈카츠 브랜드 분지로가 잠실 롯데백화점에 신규 오픈을 준비 중입니다. 명동·한남·수원·롯데월드몰에 이어 다섯 번째 지점이 될 예정입니다.",
  },
  {
    date: "2025.12",
    category: "브랜드 소식",
    title: "다이센스시, 큐슈 본사 와카타케마루와 메뉴 협업 강화",
    brand: "다이센스시",
    excerpt:
      "한남동 프라이빗 룸 다이센스시가 큐슈 본사 와카타케마루와의 협업을 강화합니다. 계절별 큐슈산 생선 직입고 스케줄을 확대하여 더 풍성한 스시 경험을 제공합니다.",
  },
  {
    date: "2025.11",
    category: "신규 오픈",
    title: "진가와 부산 본점 오픈",
    brand: "진가와",
    excerpt:
      "370년 전통 나가사키 수연면 브랜드 진가와가 부산에 진출했습니다. 서울 역삼점, 잠실롯데월드몰점에 이어 세 번째 지점으로, 부산 지역 고객들도 정통 수연면을 만날 수 있게 되었습니다.",
  },
  {
    date: "2025.09",
    category: "회사 소식",
    title: "넥스트다이닝, 미국 법인(USA Inc.) 설립 및 뉴욕 진출 확정",
    brand: "넥스트다이닝",
    excerpt:
      "넥스트다이닝이 미국 법인을 설립하고 뉴욕 맨해튼에 첫 해외 직영 매장 NOFLEX NYC 오픈을 확정했습니다. K-다이닝의 글로벌 확장이 본격화됩니다.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "신규 오픈": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "브랜드 소식": "bg-sky-50 text-sky-700 border-sky-200",
  "회사 소식": "bg-stone-50 text-stone-600 border-stone-200",
};

export default function HappeningsPage() {
  return (
    <div>
      {/* 헤더 */}
      <section className="bg-stone-950 text-white pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase mb-5">
            Happenings
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mb-6">
            넥스트다이닝<br />새소식
          </h1>
          <p className="text-stone-400 max-w-xl leading-relaxed text-lg">
            신규 오픈 소식부터 시즌 메뉴, 브랜드 이야기까지.
            넥스트다이닝의 최신 소식을 전합니다.
          </p>
        </div>
      </section>

      {/* 뉴스 목록 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {NEWS_ITEMS.map((item, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all p-7"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                    CATEGORY_COLORS[item.category] ?? "bg-stone-50 text-stone-500 border-stone-200"
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-stone-400">{item.brand}</span>
              </div>
              <h2 className="font-bold text-stone-900 text-lg mb-3 leading-snug">
                {item.title}
              </h2>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">{item.excerpt}</p>
              <p className="text-xs text-stone-300">{item.date}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 뉴스레터 / 알림 CTA */}
      <section className="bg-stone-900 text-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-stone-400 text-sm mb-3">소식 받기</p>
          <h2 className="text-2xl font-bold mb-4">
            새로운 브랜드와 오픈 소식을<br />가장 먼저 받아보세요
          </h2>
          <p className="text-stone-400 text-sm mb-8">
            신규 오픈, 시즌 메뉴, 특별 이벤트 소식을 이메일로 보내드립니다.
          </p>
          <a
            href="mailto:hello@next-dining.com?subject=뉴스레터 구독 신청"
            className="inline-block bg-white text-stone-900 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-stone-100 transition-colors"
          >
            이메일로 구독 신청하기
          </a>
        </div>
      </section>
    </div>
  );
}
