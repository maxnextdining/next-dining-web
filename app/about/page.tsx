import Link from "next/link";
import Image from "next/image";
import { brands } from "@/lib/brands";
import type { BrandCategory, BrandFormat } from "@/lib/brands";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "넥스트다이닝은 이하연 김치 명인의 봉우리, 370년 전통 진가와, 나가사키 장인 분지로, 큐슈 1위 다이센스시 등 검증된 외식 브랜드를 한국에서 운영하는 프리미엄 외식 그룹입니다.",
  openGraph: {
    title: "회사 소개 | NEXT DINING",
    description: "검증된 장인의 브랜드를 한국에서 운영합니다. 넥스트다이닝 기업 소개",
  },
};

const CATEGORY_LABEL: Record<BrandCategory, string> = {
  korean: "한식",
  japanese: "일식",
  cafe: "카페·라운지",
  american: "양식·글로벌",
};

const CATEGORY_ORDER: BrandCategory[] = ["korean", "japanese", "cafe", "american"];

const CATEGORY_COLOR: Record<BrandCategory, string> = {
  korean: "text-[#C8A96E]",
  japanese: "text-[#6B8CAE]",
  cafe: "text-[#9B8DC8]",
  american: "text-[#6BAE8C]",
};

const FORMAT_LABEL: Record<BrandFormat, string> = {
  dining: "다이닝",
  casual: "캐주얼",
  foodcourt: "푸드코트",
  lounge: "카페라운지",
  pub: "펍·라운지",
};

const FORMAT_COLOR: Record<BrandFormat, string> = {
  dining: "bg-white/10 text-[#EDEDED]",
  casual: "bg-[#C8A96E]/15 text-[#C8A96E]",
  foodcourt: "bg-[#6B8CAE]/15 text-[#6B8CAE]",
  lounge: "bg-[#9B8DC8]/15 text-[#9B8DC8]",
  pub: "bg-[#6BAE8C]/15 text-[#6BAE8C]",
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
    <div style={{ background: "#0A0A0A", color: "#EDEDED" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-32 pb-20" style={{ background: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#C8A96E" }}
            >
              ABOUT US
            </p>
          </ScrollReveal>

          <TextReveal
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl mb-6"
            mode="line"
            delay={100}
            staggerDelay={120}
          >
            {"다음 세대를 여는\n글로벌 외식 문화 기업"}
          </TextReveal>

          <ScrollReveal direction="up" delay={300}>
            <p className="max-w-xl leading-relaxed text-lg mb-4 font-body" style={{ color: "#8A8A8A" }}>
              넥스트다이닝은 수십 년, 수백 년 역사를 가진 장인의 브랜드를 발굴하고
              한국과 해외에서 직영 운영하는 프리미엄 외식 그룹입니다.
            </p>
            <p className="text-sm font-body" style={{ color: "#8A8A8A" }}>
              대표이사 장경훈 · 정호상 &nbsp;|&nbsp; 서울시 용산구 대사관로 35, 사운즈 한남 B1
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      {/* ── Philosophy / What We Do ──────────────────────── */}
      <section className="py-20" style={{ background: "#0F0F0F" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="left">
            <div className="max-w-3xl">
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                style={{ color: "#C8A96E" }}
              >
                What We Do
              </p>
              <h2 className="font-display text-3xl font-bold mb-8" style={{ color: "#EDEDED" }}>
                검증된 장인의 브랜드를<br />한국에서 운영합니다
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div
              className="max-w-3xl space-y-6 leading-relaxed text-[15px] border-l-2 pl-8 font-body"
              style={{ color: "#8A8A8A", borderColor: "#C8A96E33" }}
            >
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
          </ScrollReveal>
        </div>
      </section>

      {/* ── Brand Portfolio ───────────────────────────────── */}
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                  style={{ color: "#C8A96E" }}
                >
                  Brand Portfolio
                </p>
                <h2 className="font-display text-3xl font-bold" style={{ color: "#EDEDED" }}>
                  10개 브랜드, 4개 업태
                </h2>
              </div>
              <Link
                href="/brands"
                className="hidden sm:inline-block text-sm transition-colors"
                style={{ color: "#8A8A8A" }}
              >
                전체 보기 →
              </Link>
            </div>
          </ScrollReveal>

          {CATEGORY_ORDER.map((cat) => {
            const catBrands = brands.filter((b) => b.category === cat);
            if (catBrands.length === 0) return null;
            return (
              <ScrollReveal key={cat} direction="up" delay={80}>
                <div className="mb-12 last:mb-0">
                  <h3
                    className={`text-lg font-bold mb-5 flex items-center gap-3 ${CATEGORY_COLOR[cat]}`}
                  >
                    {CATEGORY_LABEL[cat]}
                    <span className="text-sm font-normal" style={{ color: "#8A8A8A" }}>
                      {catBrands.length}개 브랜드
                    </span>
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {catBrands.map((brand) => {
                      const activeCount = brand.locations.filter((l) => l.status === "active").length;
                      return (
                        <Link
                          key={brand.id}
                          href={`/brands/${brand.id}`}
                          className="group rounded-2xl p-6 flex gap-5 transition-all border"
                          style={{
                            background: "#141414",
                            borderColor: "rgba(255,255,255,0.05)",
                          }}
                        >
                          <div
                            className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center p-2"
                            style={{ background: "#1A1A1A" }}
                          >
                            <Image
                              src={brand.logo}
                              alt={`${brand.name} 로고`}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain brightness-0 invert"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <h4 className="font-bold" style={{ color: "#EDEDED" }}>
                                {brand.name}
                              </h4>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${FORMAT_COLOR[brand.format]}`}
                              >
                                {FORMAT_LABEL[brand.format]}
                              </span>
                            </div>
                            <p className="text-xs mb-2 font-body" style={{ color: "#8A8A8A" }}>
                              {ORIGIN_LINE[brand.id] ?? brand.tagline}
                            </p>
                            <div className="flex items-center gap-3 text-xs" style={{ color: "#8A8A8A" }}>
                              {activeCount > 0 && <span>{activeCount}개 매장</span>}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/brands"
              className="text-sm transition-colors"
              style={{ color: "#8A8A8A" }}
            >
              전체 브랜드 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* ── For Partners / Stats ─────────────────────────── */}
      <section className="py-20" style={{ background: "#0F0F0F" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-12">
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                style={{ color: "#C8A96E" }}
              >
                For Partners
              </p>
              <h2 className="font-display text-3xl font-bold mb-6" style={{ color: "#EDEDED" }}>
                입점·제휴를 검토하고 계신가요?
              </h2>
              <p className="leading-relaxed font-body" style={{ color: "#8A8A8A" }}>
                넥스트다이닝은 롯데월드몰, 신세계아울렛, 아이파크몰, 사운즈한남 등 국내 주요 상업시설에 입점 운영 중이며,
                뉴욕 맨해튼에 해외 직영점을 운영하고 있습니다.
                일식·한식·양식·카페 등 다업태 포트폴리오에서 귀사 공간에 최적화된 브랜드를 제안드립니다.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { value: 10, suffix: "개", label: "프리미엄 브랜드", sub: "일식·한식·양식·카페" },
              { value: 19, suffix: "", label: "전국 직영 매장", sub: "서울·수원·부산·여주·뉴욕" },
              { value: 350, suffix: "억", label: "연 매출 규모", sub: "2025년 기준, 전 매장 직영" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} direction="scale" delay={i * 100}>
                <div
                  className="glass-dark rounded-2xl p-7 text-center"
                  style={{ border: "1px solid rgba(200,169,110,0.15)" }}
                >
                  <p className="text-4xl font-bold mb-2" style={{ color: "#C8A96E" }}>
                    {s.label === "연 매출 규모" && "~"}
                    <AnimatedCounter value={s.value} suffix={s.suffix} duration={1800} />
                  </p>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#EDEDED" }}>
                    {s.label}
                  </p>
                  <p className="text-xs font-body" style={{ color: "#8A8A8A" }}>
                    {s.sub}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="cta-primary inline-block px-8 py-3 rounded-full font-semibold text-sm text-center bg-[#C8A96E] text-[#0A0A0A] hover:bg-[#E8D5B0]"
              >
                입점·제휴 문의하기
              </Link>
              <Link
                href="/brands"
                className="cta-outline inline-block px-8 py-3 rounded-full font-semibold text-sm text-center border border-white/15 text-[#8A8A8A] hover:text-[#EDEDED]"
              >
                브랜드 포트폴리오 보기
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#C8A96E" }}
            >
              Vision &amp; Philosophy
            </p>
            <h2 className="font-display text-3xl font-bold mb-12" style={{ color: "#EDEDED" }}>
              4대 핵심 가치
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Originality",
                desc: "검증된 장인의 전통과 오리지널리티를 발굴하고 보존합니다",
                icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
              },
              {
                title: "Premium Quality",
                desc: "최상의 식재료와 조리법으로 타협 없는 품질을 추구합니다",
                icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
              },
              {
                title: "고객 중심 혁신",
                desc: "고객 경험을 최우선에 두고 서비스와 공간을 설계합니다",
                icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
              },
              {
                title: "운영 전문성",
                desc: "데이터 기반 시스템으로 다업태 직영 매장을 안정적으로 운영합니다",
                icon: "M12 20V10M18 20V4M6 20v-4",
              },
            ].map((v, i) => (
              <ScrollReveal key={v.title} direction="up" delay={i * 80}>
                <div
                  className="rounded-2xl p-7 h-full border transition-colors"
                  style={{
                    background: "#141414",
                    borderColor: "rgba(200,169,110,0.12)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                    style={{ background: "rgba(200,169,110,0.12)" }}
                  >
                    <svg
                      className="w-5 h-5"
                      style={{ color: "#C8A96E" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={v.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#EDEDED" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8A8A8A" }}>
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers CTA ──────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #0F0F0F 0%, #141414 100%)",
          borderTop: "1px solid rgba(200,169,110,0.15)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <p className="text-sm mb-3 font-body" style={{ color: "#8A8A8A" }}>
              넥스트다이닝과 함께하고 싶으신가요?
            </p>
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "#EDEDED" }}>
              팀 이야기가 궁금하다면 채용 페이지를 확인하세요
            </h2>
            <Link
              href="/careers"
              className="cta-outline inline-block px-8 py-3 rounded-full font-semibold text-sm border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0A0A0A]"
            >
              채용 안내 보기
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
