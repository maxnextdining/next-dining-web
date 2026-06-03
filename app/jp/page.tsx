import type { Metadata } from "next";
import { fetchPageContent, fetchBrandInfo } from "@/lib/sheets-cms";
import HomePageContent from "@/components/pages/HomePageContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NEXT DINING — ネクストダイニング",
  description:
    "ネクストダイニングは봉우리한정식、진가와、분지로、다이센스시など10のプレミアム飲食ブランドを運営しています。ソウル漢南洞、江南、明洞、蚕室、釜山、ニューヨークなど国内外21の直営店舗。",
  alternates: {
    canonical: "https://next-dining.com/jp",
    languages: {
      ko: "https://next-dining.com",
      ja: "https://next-dining.com/jp",
    },
  },
};

const FAQ_ITEMS_JA = [
  {
    q: "ネクストダイニングはどんな会社ですか？",
    a: "ネクストダイニングは봉우리한정식、진가와、분지로、다이센스시、NOFLEX NYCなど10のプレミアム飲食ブランドを運営するマルチブランドグループです。ソウル・水原・釜山・驪州・ニューヨークなど国内外21の直営店舗を展開しています。",
  },
  {
    q: "漢南洞でデートにおすすめのレストランは？",
    a: "분지로サウンズ漢南店と다이센스시サウンズ漢南店をおすすめします。분지로は長崎の職人によるプレミアムとんかつを、다이센스시はプライベートルームでプレミアムお寿司をご提供します。",
  },
  {
    q: "ソウルで本格的な日本のとんかつを食べるなら？",
    a: "분지로は日本長崎の職人・高田祐治氏と協力して生まれたとんかつ専門店です。明洞韓国本店をはじめ、サウンズ漢南、水原、ロッテワールドモールでお楽しみいただけます。",
  },
];

export default async function JaHomePage() {
  const [content, sheetBrandInfoList] = await Promise.all([
    fetchPageContent('ja'),
    fetchBrandInfo('ja'),
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
    if (!faq) return FAQ_ITEMS_JA;
    const items: { q: string; a: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const q = faq[`q${i}`];
      const a = faq[`a${i}`];
      if (q && a) items.push({ q, a });
    }
    return items.length > 0 ? items : FAQ_ITEMS_JA;
  })();

  return (
    <HomePageContent
      lang="ja"
      sheetBrandInfoMap={sheetBrandInfoMap}
      heroHeading1={hero?.heading_1 || "次の世代を切り開く"}
      heroHeading2={hero?.heading_2 || "グローバル外食文化企業"}
      heroSubtitle={hero?.subtitle || "職人の哲学を宿したブランドで、お客様に最高の味と外食体験をお届けします。"}
      ctaPrimary={hero?.cta_primary || "ブランドを見る"}
      ctaSecondary={hero?.cta_secondary || "お問い合わせ"}
      stat1Value={parseInt(stats?.stat_1_value ?? "") || 10}
      stat1Label={stats?.stat_1_label || "ブランド"}
      stat2Value={parseInt(stats?.stat_2_value ?? "") || 21}
      stat2Label={stats?.stat_2_label || "直営店舗"}
      stat3Value={parseInt(stats?.stat_3_value ?? "") || 5}
      stat3Label={stats?.stat_3_label || "都市"}
      philosophyQuote={philosophy?.quote || "私たちは職人の精神を持ち、提供する料理とサービスが最高の品質を維持できるよう精進します。"}
      recruitHeading={recruit?.heading || "ネクストダイニングと共に"}
      recruitHeading2={recruit?.heading2 || "成長する仲間を求めています"}
      recruitDescription={recruit?.description || "料理人、サービススタッフ、経営サポートチームまで。\n良い料理と良い空間を作りたい方のご応募をお待ちしています。"}
      recruitCta={recruit?.cta || "採用情報を見る"}
      faqItems={faqItems}
    />
  );
}
