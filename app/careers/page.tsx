import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { fetchCareers } from "@/lib/sheets-cms";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "채용",
  description:
    "넥스트다이닝과 함께 성장할 인재를 찾습니다. 홀·주방·본사(경영지원, 마케팅, 기획) 등 다양한 포지션. 좋은 음식과 좋은 공간을 만들고 싶은 분의 지원을 기다립니다.",
  openGraph: {
    title: "채용 | NEXT DINING",
    description: "넥스트다이닝과 함께 성장할 인재를 찾습니다. 홀·주방·본사 포지션",
  },
};

const FALLBACK_POSITIONS = [
  {
    category: "홀 서비스",
    positions: [
      {
        title: "홀 매니저",
        brand: "봉우리 한정식",
        location: "역삼 / 을지로",
        type: "정규직",
        description: "프리미엄 한정식 홀 서비스 총괄. 게스트 경험을 설계하고 팀을 이끕니다.",
      },
      {
        title: "서빙 스태프",
        brand: "다이센스시",
        location: "한남동",
        type: "정규직",
        description: "프라이빗 룸을 갖춘 프리미엄 스시 레스토랑의 세심한 서비스를 함께 만들 분을 찾습니다.",
      },
      {
        title: "홀 스태프",
        brand: "분지로",
        location: "명동 / 한남 / 수원 / 잠실",
        type: "정규직·아르바이트",
        description: "고객 응대 및 홀 운영 전반. 브랜드 스토리를 함께 전달해 주실 분을 모십니다.",
      },
    ],
  },
  {
    category: "주방",
    positions: [
      {
        title: "소바 장인 (수련생 포함)",
        brand: "진가와",
        location: "역삼 / 잠실 / 부산",
        type: "정규직",
        description: "370년 전통 수연면 기법 습득 의지가 있는 분. 일본 연수 기회 제공.",
      },
      {
        title: "주방 보조 / 조리 스태프",
        brand: "봉우리 소반 / 진진만두",
        location: "여주 / 시청",
        type: "정규직",
        description: "식재료 손질, 조리 보조, 주방 위생 관리 등 주방 운영 전반.",
      },
    ],
  },
  {
    category: "본사",
    positions: [
      {
        title: "마케팅 담당자",
        brand: "넥스트다이닝 본사",
        location: "서울 (본사)",
        type: "정규직",
        description:
          "SNS, 콘텐츠, 매체 운영. 각 브랜드의 고유한 세계관을 온라인 콘텐츠로 풀어낼 분을 찾습니다.",
      },
      {
        title: "경영지원 / 재무회계",
        brand: "넥스트다이닝 본사",
        location: "서울 (본사)",
        type: "정규직",
        description: "다브랜드 외식 그룹의 재무·회계·인사 지원 업무.",
      },
      {
        title: "브랜드 기획 / 신사업",
        brand: "넥스트다이닝 본사",
        location: "서울 (본사)",
        type: "정규직",
        description:
          "국내외 브랜드 발굴 및 신규 출점 기획. 외식 트렌드에 관심 있고 실행력 있는 분.",
      },
    ],
  },
];

const VALUES = [
  {
    title: "본질을 먼저",
    desc: "화려한 포장보다 음식의 깊이를 먼저 생각합니다. 모든 업무는 '고객의 경험이 더 나아지는가'로 판단합니다.",
  },
  {
    title: "함께 성장",
    desc: "직원이 행복해야 고객의 경험도 따뜻해집니다. 개인의 성장이 브랜드의 성장으로 이어지는 환경을 만듭니다.",
  },
  {
    title: "장기적 안목",
    desc: "단기 성과보다 지속 가능한 브랜드를 추구합니다. 검증된 장인과 협력하듯, 사람과의 관계도 길게 봅니다.",
  },
  {
    title: "이야기를 만드는 사람",
    desc: "모든 브랜드 뒤에는 이야기가 있습니다. 그 이야기를 이해하고 전달하는 데서 일의 의미를 찾는 분을 원합니다.",
  },
];

const BENEFITS = [
  { icon: "✈️", title: "일본 현지 연수", desc: "나가사키·큐슈 장인 브랜드 본사 방문 및 기술 연수 기회 제공 (주방 직군)." },
  { icon: "🎁", title: "경조사 지원", desc: "경조금 지급 및 경조 휴가 제공. 명절 선물/상여 지원." },
  { icon: "⭐", title: "장기근속 보상", desc: "근속 연수에 따른 장기근속수당 및 포상, 추가 리프레시 휴가 부여." },
  { icon: "👶", title: "육아 지원", desc: "출산휴가, 육아휴직 보장. 산전·산후 휴가 제도 운영." },
  { icon: "📚", title: "자기개발 지원", desc: "외식업 관련 자격증·교육 비용 지원. 조리사 면허, 소믈리에 등 취득 장려." },
  { icon: "💳", title: "직원 할인", desc: "자사 전 브랜드(10개) 매장 직원 할인 혜택. 가족 동반 시에도 적용." },
];

type PositionGroup = {
  category: string;
  positions: {
    title: string;
    brand: string;
    location: string;
    type: string;
    description: string;
  }[];
};

function JobPostingJsonLd({ positions }: { positions: PositionGroup[] }) {
  const postings = positions.flatMap((group) =>
    group.positions.map((pos) => ({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: pos.title,
      description: pos.description,
      datePosted: "2026-03-01",
      employmentType: pos.type.includes("정규직") ? "FULL_TIME" : "PART_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "넥스트다이닝 (Next Dining Corp)",
        sameAs: "https://next-dining.com",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: pos.location,
          addressCountry: "KR",
        },
      },
      industry: "외식업 (Food & Beverage)",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "대한민국",
      },
    }))
  );
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(postings) }}
    />
  );
}

export default async function CareersPage() {
  const sheetData = await fetchCareers();
  const positions =
    sheetData.length > 0
      ? sheetData.map((group) => ({
          category: group.category,
          positions: group.positions.map((p) => ({
            title: p.position,
            brand: p.brand,
            location: p.location,
            type: p.type,
            description: p.description,
          })),
        }))
      : FALLBACK_POSITIONS;

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "#EDEDED" }}>
      <JobPostingJsonLd positions={positions} />

      {/* Hero */}
      <section style={{ backgroundColor: "#0A0A0A" }} className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: "#C8A96E" }}
            >
              JOIN US
            </p>
          </ScrollReveal>
          <TextReveal
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8 max-w-3xl"
            mode="line"
            delay={100}
            staggerDelay={100}
          >
            {"좋은 음식과 공간을\n함께 만들 분을 찾습니다"}
          </TextReveal>
          <ScrollReveal direction="up" delay={300}>
            <p className="max-w-xl leading-relaxed text-lg" style={{ color: "#8A8A8A" }}>
              넥스트다이닝은 10개 프리미엄 외식 브랜드를 운영하며 한국 외식의 기준을 높이고 있습니다.
              음식, 서비스, 공간, 경영 — 각자의 자리에서 최고를 지향하는 분들과 함께합니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Company Story */}
      <section style={{ backgroundColor: "#0F0F0F" }} className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                  style={{ color: "#C8A96E" }}
                >
                  OUR STORY
                </p>
                <h2 className="font-display text-3xl sm:text-4xl mb-8" style={{ color: "#EDEDED" }}>
                  우리의 이야기
                </h2>
                <div className="space-y-5 leading-relaxed text-[15px]" style={{ color: "#8A8A8A" }}>
                  <p>
                    넥스트다이닝은 이미 검증된 장인의 브랜드를 한국에서 운영하는 프리미엄 외식
                    그룹입니다. 직접 브랜드를 만들기보다, 수십 년 혹은 수백 년의 역사와 철학을
                    가진 이야기를 발굴해 한국 식탁에 올려놓습니다.
                  </p>
                  <p>
                    봉우리 한정식, 진가와, 분지로, 다이센스시 — 각 브랜드 뒤에는 반드시 검증된
                    사람의 이야기가 있습니다. 우리의 역할은 그 본질을 훼손하지 않으면서 한국
                    고객이 최고의 경험을 할 수 있는 공간과 서비스를 만드는 것입니다.
                  </p>
                  <p>
                    현재 전국·해외 19개 직영 매장, 연 매출 약 350억 규모로 운영되며 미국 법인
                    (USA Inc.)도 함께 운영 중입니다.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: "#C8A96E" }}>
                    <AnimatedCounter value={10} suffix="개" />
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#8A8A8A" }}>
                    운영 브랜드
                  </p>
                </div>
                <div className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: "#C8A96E" }}>
                    <AnimatedCounter value={19} />
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#8A8A8A" }}>
                    직영 매장
                  </p>
                </div>
                <div className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: "#C8A96E" }}>
                    ~<AnimatedCounter value={350} suffix="억" />
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#8A8A8A" }}>
                    연 매출 (2025년 기준)
                  </p>
                </div>
                <div className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: "#C8A96E" }}>
                    USA
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#8A8A8A" }}>
                    해외 법인
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Culture Values */}
      <section style={{ backgroundColor: "#0A0A0A" }} className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-14">
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: "#C8A96E" }}
              >
                Culture
              </p>
              <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "#EDEDED" }}>
                넥스트다이닝이 일하는 방식
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} direction="up" delay={i * 80}>
                <div
                  className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-6 h-full"
                  style={{ borderTop: "2px solid #C8A96E" }}
                >
                  <h3 className="font-semibold mb-3 text-base" style={{ color: "#EDEDED" }}>
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

      {/* Benefits */}
      <section style={{ backgroundColor: "#0F0F0F" }} className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-14">
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: "#C8A96E" }}
              >
                Benefits
              </p>
              <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "#EDEDED" }}>
                함께하면 드리는 것들
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} direction="up" delay={i * 50}>
                <div className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-6 h-full">
                  <span className="text-2xl mb-3 block">{b.icon}</span>
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: "#EDEDED" }}>
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8A8A8A" }}>
                    {b.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ backgroundColor: "#0A0A0A" }} className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-14">
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: "#C8A96E" }}
              >
                Open Positions
              </p>
              <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{ color: "#EDEDED" }}>
                현재 채용 중인 포지션
              </h2>
              <p className="text-sm" style={{ color: "#8A8A8A" }}>
                아래 포지션 외에도 열정 있는 분이라면 언제든 문의해 주세요.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-14">
            {positions.map((group) => (
              <div key={group.category}>
                <ScrollReveal direction="up">
                  <h3
                    className="text-base font-semibold mb-5 pb-4"
                    style={{
                      color: "#EDEDED",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {group.category}
                  </h3>
                </ScrollReveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.positions.map((pos, i) => (
                    <ScrollReveal key={pos.title + pos.brand} direction="up" delay={i * 70}>
                      <div className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-6 h-full">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-xs mb-1" style={{ color: "#8A8A8A" }}>
                              {pos.brand}
                            </p>
                            <h4 className="font-semibold text-sm" style={{ color: "#EDEDED" }}>
                              {pos.title}
                            </h4>
                          </div>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full shrink-0 ml-2"
                            style={{
                              backgroundColor: "rgba(200,169,110,0.1)",
                              color: "#C8A96E",
                              border: "1px solid rgba(200,169,110,0.2)",
                            }}
                          >
                            {pos.type}
                          </span>
                        </div>
                        <p className="text-xs mb-3" style={{ color: "#8A8A8A" }}>
                          📍 {pos.location}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#8A8A8A" }}>
                          {pos.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section style={{ backgroundColor: "#0F0F0F" }} className="py-24">
        <div
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <ScrollReveal direction="up">
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#C8A96E" }}
            >
              지원하기
            </p>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "#EDEDED" }}>
              함께 시작해볼까요?
            </h2>
            <p className="leading-relaxed mb-12 text-sm" style={{ color: "#8A8A8A" }}>
              관심 있는 포지션과 간단한 자기소개를 아래 이메일로 보내주세요.
              담당자가 검토 후 연락드립니다.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div className="bg-[#141414] border border-white/5 hover:border-[#C8A96E]/30 transition-colors rounded-2xl p-8 text-left space-y-4 mb-10">
              <p className="font-semibold text-sm mb-4" style={{ color: "#EDEDED" }}>
                이메일 지원 시 포함 내용
              </p>
              {[
                "지원 포지션 및 브랜드",
                "간략한 이력 (경력 요약 또는 이력서 첨부)",
                "지원 동기 (3~5줄 이내)",
                "연락처 및 가능한 시작 일정",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-semibold"
                    style={{
                      backgroundColor: "rgba(200,169,110,0.15)",
                      color: "#C8A96E",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm" style={{ color: "#8A8A8A" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <a
              href="mailto:hr@next-dining.com"
              className="cta-primary inline-block px-10 py-4 rounded-full font-semibold text-sm bg-[#C8A96E] text-[#0A0A0A] hover:bg-[#E8D5B0]"
            >
              hr@next-dining.com 으로 지원하기
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
