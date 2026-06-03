import { fetchBrandInfo, fetchPageContent } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import BrandsPageContent from "@/components/pages/BrandsPageContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ブランド — NEXT DINING",
  description:
    "ネクストダイニングの10のプレミアム飲食ブランドをご覧ください。봉우리한정식、진가와、분지로、다이센스시、타쿠미나가사키、카페르상스など、それぞれの哲学と物語で韓国の外食水準を高めるブランドです。",
  openGraph: {
    title: "ブランド | NEXT DINING",
    description: "ネクストダイニングの10のプレミアム飲食ブランドポートフォリオ",
  },
  alternates: {
    canonical: "https://next-dining.com/jp/brands",
    languages: {
      ko: "https://next-dining.com/brands",
      ja: "https://next-dining.com/jp/brands",
    },
  },
};

export default async function JaBrandsPage() {
  const [sheetBrandInfoList, content] = await Promise.all([
    fetchBrandInfo('ja'),
    fetchPageContent('ja'),
  ]);
  const sheetBrandInfoMap: Record<string, { tagline: string; description: string }> = {};
  for (const info of sheetBrandInfoList) {
    sheetBrandInfoMap[info.brandId] = { tagline: info.tagline, description: info.description };
  }

  return (
    <BrandsPageContent
      lang="ja"
      sheetBrandInfoMap={sheetBrandInfoMap}
      headerHeading={content?.brands?.header?.heading ?? "10の独創的なブランド"}
      headerSubtitle={content?.brands?.header?.subtitle ?? "それぞれの哲学と物語で韓国の外食水準を高めます"}
      partnershipHeading={content?.brands?.partnership?.heading ?? "ブランド出店・提携のお問い合わせ"}
      partnershipSubtitle={content?.brands?.partnership?.subtitle ?? "ネクストダイニングと共に成長するパートナーを探しています。出店、提携、フランチャイズなど様々な協力方法についていつでもお問い合わせください。"}
    />
  );
}
