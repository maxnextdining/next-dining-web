import { notFound } from "next/navigation";
import { brands, getBrandById } from "@/lib/brands";
import { fetchBrandMenu } from "@/lib/menu-sheets";
import { fetchBrandInfoById, fetchBrandStories, fetchBrandInfo, fetchStoreInfo } from "@/lib/sheets-cms";
import type { Metadata } from "next";
import BrandDetailContent from "@/components/pages/BrandDetailContent";

/** ISR: 1시간마다 재생성 */
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

  const sheetBrandInfo = await fetchBrandInfoById(id, 'ja');
  const description = sheetBrandInfo?.description || brand.description;
  const tagline = sheetBrandInfo?.tagline || brand.tagline;

  const locationNames = brand.locations
    .filter((l) => l.status === "active")
    .map((l) => l.name)
    .join(", ");

  return {
    title: `${brand.nameEn}`,
    description: `${description} 店舗: ${locationNames || "オープン準備中"}`,
    keywords: brand.keywordsJa ?? brand.keywords,
    openGraph: {
      title: `${brand.nameEn} | NEXT DINING`,
      description: tagline,
      images: [{ url: brand.image, width: 1200, height: 630, alt: brand.nameEn }],
    },
    alternates: {
      canonical: `https://next-dining.com/ja/brands/${id}`,
      languages: {
        ko: `https://next-dining.com/brands/${id}`,
        ja: `https://next-dining.com/ja/brands/${id}`,
      },
    },
  };
}

export default async function JaBrandDetailPage({ params }: Props) {
  const { id } = await params;
  const brand = getBrandById(id);
  if (!brand) notFound();

  const [sheetBrandInfo, sheetStories, sheetMenu, allBrandInfoJa, storeInfoJa] = await Promise.all([
    fetchBrandInfoById(id, 'ja'),
    fetchBrandStories('ja'),
    fetchBrandMenu(id, 'ja'),
    fetchBrandInfo('ja'),
    fetchStoreInfo('ja'),
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

  // 관련 브랜드 카드 tagline_ja 맵 (brandId → tagline_ja)
  const relatedTaglineMap: Record<string, string> = {};
  for (const info of allBrandInfoJa) {
    if (info.tagline) {
      relatedTaglineMap[info.brandId] = info.tagline;
    }
  }

  // 매장 이름·영업시간 일본어 덮어쓰기 맵 (한국어 store_name으로 매칭)
  // sheets-cms fetchStoreInfo('ja'): storeName = store_name_ja 우선, hours = hours_ja 우선
  // brand.locations[].name = 한국어 원본 → koName으로 매칭
  const brandStoresJa = storeInfoJa.filter((s) => s.brandId === id);
  // 시트의 store_name 컬럼(한국어)과 매칭하기 위해 ko 버전도 fetch
  const storeInfoKo = await fetchStoreInfo('ko');
  const brandStoresKo = storeInfoKo.filter((s) => s.brandId === id);

  const jaStoreOverrides = brand.locations.map((loc) => {
    // ko 시트에서 동일 brand_id + 동일 순서로 매칭 (store_name ko가 brand.locations[].name과 일치 가정)
    const koIdx = brandStoresKo.findIndex((s) => s.storeName === loc.name);
    const jaStore = koIdx >= 0 ? brandStoresJa[koIdx] : undefined;
    return {
      koName: loc.name,
      jaName: jaStore?.storeName || loc.name,
      jaHours: jaStore?.hours || loc.hours || '',
    };
  });

  const CATEGORY_LABEL_JA: Record<string, string> = {
    japanese: "和食",
    korean: "韓食",
    american: "洋食",
    cafe: "カフェ",
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
          name: brand.nameEn,
          alternateName: brand.name,
          description: brandInfo.description,
          servesCuisine: brand.cuisineJa || CATEGORY_LABEL_JA[brand.category],
          priceRange: brand.priceRange,
          ...(loc.phone && { telephone: loc.phone }),
          ...(loc.hours && { openingHours: loc.hours }),
          address: {
            "@type": "PostalAddress",
            streetAddress: loc.address,
            addressLocality: loc.address.startsWith("서울")
              ? "Seoul"
              : loc.address.startsWith("경기")
              ? "Gyeonggi"
              : loc.address.startsWith("부산")
              ? "Busan"
              : loc.address.split(" ")[0],
            addressCountry:
              loc.address.includes("NY") ||
              loc.address.includes("New York") ||
              loc.address.includes("Manhattan")
                ? "US"
                : "KR",
          },
          url: `https://next-dining.com/ja/brands/${brand.id}`,
          ...(menuItems.length > 0 && {
            hasMenu: {
              "@type": "Menu",
              hasMenuSection: {
                "@type": "MenuSection",
                name: "代表メニュー",
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
            name: "ネクストダイニング (Next Dining Corp)",
            url: "https://next-dining.com/ja",
          },
        }))
      : null;

  return (
    <BrandDetailContent
      lang="ja"
      brandId={id}
      brandInfo={brandInfo}
      elements={elements}
      menuItems={menuItems}
      jsonLd={jsonLd}
      relatedTaglineMap={relatedTaglineMap}
      jaStoreOverrides={jaStoreOverrides}
    />
  );
}
