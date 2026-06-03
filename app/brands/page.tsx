import { fetchBrandInfo, fetchPageContent } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import BrandsPageContent from "@/components/pages/BrandsPageContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "브랜드 — NEXT DINING",
  description:
    "넥스트다이닝의 10개 프리미엄 외식 브랜드를 만나보세요. 봉우리 한정식, 진가와, 분지로, 다이센스시, 타쿠미나가사키, 카페르상스 등 각자의 철학과 이야기로 한국 외식의 수준을 높이는 브랜드들입니다.",
  openGraph: {
    title: "브랜드 | NEXT DINING",
    description: "넥스트다이닝의 10개 프리미엄 외식 브랜드 포트폴리오",
  },
  alternates: {
    canonical: "https://next-dining.com/brands",
    languages: {
      ko: "https://next-dining.com/brands",
      ja: "https://next-dining.com/jp/brands",
    },
  },
};

export default async function BrandsPage() {
  const [sheetBrandInfoList, content] = await Promise.all([
    fetchBrandInfo('ko'),
    fetchPageContent('ko'),
  ]);
  const sheetBrandInfoMap: Record<string, { tagline: string; description: string }> = {};
  for (const info of sheetBrandInfoList) {
    sheetBrandInfoMap[info.brandId] = { tagline: info.tagline, description: info.description };
  }

  return (
    <BrandsPageContent
      lang="ko"
      sheetBrandInfoMap={sheetBrandInfoMap}
      headerHeading={content?.brands?.header?.heading ?? "10개의 독창적인 브랜드"}
      headerSubtitle={content?.brands?.header?.subtitle ?? "각자의 철학과 이야기로 한국 외식의 수준을 높입니다"}
      partnershipHeading={content?.brands?.partnership?.heading ?? "브랜드 입점·제휴 문의"}
      partnershipSubtitle={content?.brands?.partnership?.subtitle ?? "넥스트다이닝과 함께 성장할 파트너를 찾습니다. 입점, 제휴, 프랜차이즈 등 다양한 협력 방식에 대해 언제든지 문의해주세요."}
    />
  );
}
