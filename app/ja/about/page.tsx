import { fetchBrandInfo, fetchPageContent } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import AboutPageContent from "@/components/pages/AboutPageContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "ネクストダイニングは봉우리 한정식、370年の伝統 진가와、長崎の職人 분지로、九州1位の 다이센스시など検証された外食ブランドを韓国で運営するプレミアム外食グループです。",
  openGraph: {
    title: "会社概要 | NEXT DINING",
    description: "検証された職人のブランドを韓国で運営しています。ネクストダイニング企業概要",
  },
  alternates: {
    canonical: "https://next-dining.com/ja/about",
    languages: {
      ko: "https://next-dining.com/about",
      ja: "https://next-dining.com/ja/about",
    },
  },
};

export default async function JaAboutPage() {
  const [sheetBrandInfoList, cmsContent] = await Promise.all([
    fetchBrandInfo('ja'),
    fetchPageContent('ja'),
  ]);

  const originLineMap: Record<string, string> = {};
  for (const info of sheetBrandInfoList) {
    if (info.originLine) originLineMap[info.brandId] = info.originLine;
  }

  return (
    <AboutPageContent
      lang="ja"
      originLineMap={originLineMap}
      content={cmsContent ?? {}}
    />
  );
}
