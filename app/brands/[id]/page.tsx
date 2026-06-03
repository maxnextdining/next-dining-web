import { notFound } from "next/navigation";
import { brands, getBrandById } from "@/lib/brands";
import { fetchBrandMenu } from "@/lib/menu-sheets";
import { fetchBrandInfoById, fetchBrandStories } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import BrandDetailContent from "@/components/pages/BrandDetailContent";

/** ISR: 1시간마다 재생성 — Google Sheets 메뉴 반영 */
export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return brands.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const brand = getBrandById(id);
  if (!brand) return {};

  const sheetBrandInfo = await fetchBrandInfoById(id, 'ko');
  const description = sheetBrandInfo?.description || brand.description;
  const tagline = sheetBrandInfo?.tagline || brand.tagline;

  const locationNames = brand.locations
    .filter((l) => l.status === "active")
    .map((l) => l.name)
    .join(", ");

  return {
    title: `${brand.name} (${brand.nameEn})`,
    description: `${description} 운영 지점: ${locationNames || "오픈 준비 중"}`,
    keywords: brand.keywords,
    openGraph: {
      title: `${brand.name} | NEXT DINING`,
      description: tagline,
      images: [{ url: brand.image, width: 1200, height: 630, alt: brand.name }],
    },
    alternates: {
      canonical: `https://next-dining.com/brands/${id}`,
      languages: {
        ko: `https://next-dining.com/brands/${id}`,
        ja: `https://next-dining.com/jp/brands/${id}`,
      },
    },
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { id } = await params;
  const brand = getBrandById(id);
  if (!brand) notFound();

  const [sheetBrandInfo, sheetStories, sheetMenu] = await Promise.all([
    fetchBrandInfoById(id, 'ko'),
    fetchBrandStories('ko'),
    fetchBrandMenu(id),
  ]);

  const sheetStory = sheetStories[id];

  const brandInfo = {
    tagline: sheetBrandInfo?.tagline || brand.tagline,
    description: sheetBrandInfo?.description || brand.description,
    story: sheetStory?.storyShort || brand.story,
  };

  const elements = sheetStory ? {
    originStory: sheetStory.originStory || brand.storyElements?.originStory,
    chefOrArtisan: sheetStory.chefOrArtisan || brand.storyElements?.chefOrArtisan,
    masterArtisan: sheetStory.masterArtisan || brand.storyElements?.masterArtisan,
    ingredientPhilosophy: sheetStory.ingredientPhilosophy || brand.storyElements?.ingredientPhilosophy,
    signatureMenu: sheetStory.signatureMenu || brand.storyElements?.signatureMenu,
    spaceExperience: sheetStory.spaceExperience || brand.storyElements?.spaceExperience,
  } : brand.storyElements;

  const activeLocations = brand.locations.filter((l) => l.status === "active");

  const CATEGORY_LABEL_KO: Record<string, string> = {
    japanese: "일식",
    korean: "한식",
    american: "양식",
    cafe: "카페",
  };

  const menuItems: { name: string; price: string; photo?: string }[] =
    sheetMenu.length > 0
      ? sheetMenu.map((m, i) => ({
          name: m.menuName,
          price: m.price,
          photo: brand.menuHighlights?.[i]?.photo,
        }))
      : (brand.menuHighlights ?? []);

  const jsonLd =
    activeLocations.length > 0
      ? activeLocations.map((loc) => ({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: brand.name,
          alternateName: brand.nameEn,
          description: brandInfo.description,
          servesCuisine: brand.cuisine || CATEGORY_LABEL_KO[brand.category],
          priceRange: brand.priceRange,
          ...(loc.phone && { telephone: loc.phone }),
          ...(loc.hours && { openingHours: loc.hours }),
          address: {
            "@type": "PostalAddress",
            streetAddress: loc.address,
            addressLocality: loc.address.startsWith("서울")
              ? "서울"
              : loc.address.startsWith("경기")
              ? "경기"
              : loc.address.startsWith("부산")
              ? "부산"
              : loc.address.split(" ")[0],
            addressCountry:
              loc.address.includes("NY") ||
              loc.address.includes("New York") ||
              loc.address.includes("Manhattan")
                ? "US"
                : "KR",
          },
          url: `https://next-dining.com/brands/${brand.id}`,
          ...(menuItems.length > 0 && {
            hasMenu: {
              "@type": "Menu",
              hasMenuSection: {
                "@type": "MenuSection",
                name: "대표 메뉴",
                hasMenuItem: menuItems.map((item) => ({
                  "@type": "MenuItem",
                  name: item.name,
                  offers: { "@type": "Offer", price: item.price, priceCurrency: "KRW" },
                })),
              },
            },
          }),
          parentOrganization: {
            "@type": "Organization",
            name: "넥스트다이닝 (Next Dining Corp)",
            url: "https://next-dining.com",
          },
        }))
      : null;

  return (
    <BrandDetailContent
      lang="ko"
      brandId={id}
      brandInfo={brandInfo}
      elements={elements}
      menuItems={menuItems}
      jsonLd={jsonLd}
    />
  );
}
