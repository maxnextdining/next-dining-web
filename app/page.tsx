import type { Metadata } from "next";
import { fetchPageContent, fetchBrandInfo } from "@/lib/sheets-cms";
import HomePageContent from "@/components/pages/HomePageContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NEXT DINING — 넥스트다이닝",
  description:
    "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시 등 10개 프리미엄 외식 브랜드를 운영합니다. 서울 한남동, 강남, 명동, 잠실, 부산, 뉴욕 등 전국·해외 21개 직영 매장.",
  alternates: {
    canonical: "https://next-dining.com",
    languages: {
      ko: "https://next-dining.com",
      ja: "https://next-dining.com/jp",
    },
  },
};

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "넥스트다이닝 (Next Dining Corp)",
    alternateName: "NEXT DINING",
    url: "https://next-dining.com",
    description:
      "봉우리 한정식, 진가와, 분지로, 다이센스시 등 10개 프리미엄 외식 브랜드 21개 직영 매장을 운영하는 한국 멀티 브랜드 외식 그룹",
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
      acceptedAnswer: { "@type": "Answer", text: item.a },
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
    a: "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시, NOFLEX NYC 등 10개 프리미엄 외식 브랜드를 운영하는 멀티 브랜드 외식 그룹입니다. 서울·수원·부산·여주·뉴욕 등 전국·해외 21개 직영 매장을 운영하며, 검증된 장인의 브랜드를 발굴·운영하는 것이 핵심 역량입니다.",
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
    q: "뉴욕에 있는 넥스트다이닝 브랜드는?",
    a: "NOFLEX NYC는 뉴욕 맨해튼 5번가(286 5th Avenue)에 위치한 미디어 아트 레스토랑 & 칵테일 바입니다. 72피트 LED 월에 투사되는 몰입형 디지털 아트와 함께 대담한 칵테일과 모던 다이닝을 즐길 수 있습니다.",
  },
];

export default async function HomePage() {
  const [content, sheetBrandInfoList] = await Promise.all([
    fetchPageContent('ko'),
    fetchBrandInfo('ko'),
  ]);
  const sheetBrandInfoMap: Record<string, { tagline: string }> = {};
  for (const info of sheetBrandInfoList) {
    sheetBrandInfoMap[info.brandId] = { tagline: info.tagline };
  }

  const hero = content?.home?.hero;
  const stats = content?.home?.stats;
  const philosophy = content?.home?.philosophy;
  const recruit = content?.home?.recruit;

  const faqItems = (() => {
    const faq = content?.home?.faq;
    if (!faq) return FAQ_ITEMS;
    const items: { q: string; a: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const q = faq[`q${i}`];
      const a = faq[`a${i}`];
      if (q && a) items.push({ q, a });
    }
    return items.length > 0 ? items : FAQ_ITEMS;
  })();

  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd items={faqItems} />
      <HomePageContent
        lang="ko"
        sheetBrandInfoMap={sheetBrandInfoMap}
        heroHeading1={hero?.heading_1 || "다음 세대를 여는"}
        heroHeading2={hero?.heading_2 || "글로벌 외식 문화기업"}
        heroSubtitle={hero?.subtitle || "장인의 철학을 담은 브랜드로 고객들에게 수준높은 맛과 외식 경험을 제공합니다."}
        ctaPrimary={hero?.cta_primary || "브랜드 보기"}
        ctaSecondary={hero?.cta_secondary || "문의하기"}
        stat1Value={parseInt(stats?.stat_1_value ?? "") || 10}
        stat1Label={stats?.stat_1_label || "브랜드"}
        stat2Value={parseInt(stats?.stat_2_value ?? "") || 21}
        stat2Label={stats?.stat_2_label || "직영 매장"}
        stat3Value={parseInt(stats?.stat_3_value ?? "") || 5}
        stat3Label={stats?.stat_3_label || "도시"}
        philosophyQuote={philosophy?.quote || "우리는 장인 정신을 가지고 우리가 제공하는 음식과 서비스가 최상의 품질을 유지할 수 있도록 정진합니다."}
        recruitHeading={recruit?.heading || "넥스트다이닝과 함께"}
        recruitHeading2={recruit?.heading2 || "성장할 분을 찾습니다"}
        recruitDescription={recruit?.description || "요리사, 서비스 스태프, 경영지원팀까지.\n좋은 음식과 좋은 공간을 만들고 싶은 분들의 지원을 기다립니다."}
        recruitCta={recruit?.cta || "채용 공고 보기"}
        faqItems={faqItems}
      />
    </>
  );
}
