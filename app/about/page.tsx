import { fetchBrandInfo, fetchPageContent } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import AboutPageContent from "@/components/pages/AboutPageContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "넥스트다이닝은 이하연 김치 명인의 봉우리, 370년 전통 진가와, 나가사키 장인 분지로, 큐슈 1위 다이센스시 등 검증된 외식 브랜드를 한국에서 운영하는 프리미엄 외식 그룹입니다.",
  openGraph: {
    title: "회사 소개 | NEXT DINING",
    description: "검증된 장인의 브랜드를 한국에서 운영합니다. 넥스트다이닝 기업 소개",
  },
  alternates: {
    canonical: "https://next-dining.com/about",
    languages: {
      ko: "https://next-dining.com/about",
      ja: "https://next-dining.com/jp/about",
    },
  },
};

export default async function AboutPage() {
  const [sheetBrandInfoList, cmsContent] = await Promise.all([
    fetchBrandInfo('ko'),
    fetchPageContent('ko'),
  ]);

  const originLineMap: Record<string, string> = {};
  for (const info of sheetBrandInfoList) {
    if (info.originLine) originLineMap[info.brandId] = info.originLine;
  }

  return (
    <AboutPageContent
      lang="ko"
      originLineMap={originLineMap}
      content={cmsContent ?? {}}
    />
  );
}
