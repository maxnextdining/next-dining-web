import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "새소식",
  description:
    "넥스트다이닝 브랜드 뉴스 및 새소식. 신규 오픈, 시즌 메뉴, 이벤트 등 최신 소식을 전합니다.",
  openGraph: {
    title: "새소식 | NEXT DINING",
    description: "넥스트다이닝 브랜드 뉴스 — 신규 오픈, 시즌 메뉴, 이벤트 소식",
  },
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

const CATEGORY_STYLES: Record<string, string> = {
  "신규 오픈": "bg-[#C8A96E]/10 text-[#C8A96E] border-[#C8A96E]/20",
  "브랜드 소식": "bg-white/5 text-[#EDEDED] border-white/10",
  "회사 소식": "bg-white/5 text-[#8A8A8A] border-white/10",
};

export default function HappeningsPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* 헤더 */}
      <section className="pt-20">
        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C8A96E] uppercase mb-5 font-body">
            Happenings
          </p>
          <h1 className="text-4xl sm:text-5xl font-display leading-tight max-w-2xl mb-6 text-[#EDEDED]">
            넥스트다이닝<br />새소식
          </h1>
          <p className="text-[#8A8A8A] max-w-xl leading-relaxed text-lg font-body">
            신규 오픈 소식부터 시즌 메뉴, 브랜드 이야기까지.
            넥스트다이닝의 최신 소식을 전합니다.
          </p>
        </ScrollReveal>
      </section>

      {/* 뉴스 목록 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          {NEWS_ITEMS.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 60}>
              <article className="rounded-2xl border border-white/5 hover:border-[#C8A96E]/30 transition-all p-7 bg-[#141414] h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium font-body ${
                      CATEGORY_STYLES[item.category] ?? "bg-white/5 text-[#8A8A8A] border-white/10"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-[#8A8A8A] font-body">{item.brand}</span>
                </div>
                <h2 className="font-display text-[#EDEDED] text-xl mb-3 leading-snug">
                  {item.title}
                </h2>
                <p className="text-sm text-[#8A8A8A] leading-relaxed mb-4 font-body">{item.excerpt}</p>
                <p className="text-xs text-[#8A8A8A]/50 font-body">{item.date}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 뉴스레터 / 알림 CTA */}
      <section className="border-t border-white/5 py-20">
        <ScrollReveal className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C8A96E] text-xs tracking-[0.2em] uppercase font-body mb-4">소식 받기</p>
          <h2 className="text-2xl font-display text-[#EDEDED] mb-4">
            새로운 브랜드와 오픈 소식을<br />가장 먼저 받아보세요
          </h2>
          <p className="text-[#8A8A8A] text-sm mb-8 font-body">
            신규 오픈, 시즌 메뉴, 특별 이벤트 소식을 이메일로 보내드립니다.
          </p>
          <a
            href="mailto:hello@next-dining.com?subject=뉴스레터 구독 신청"
            className="cta-primary inline-block bg-[#C8A96E] text-[#0A0A0A] px-8 py-3 rounded-full font-semibold text-sm hover:bg-[#E8D5B0] transition-colors font-body"
          >
            이메일로 구독 신청하기
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}
