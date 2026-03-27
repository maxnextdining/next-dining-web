import Link from "next/link";
import { brands } from "@/lib/brands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "브랜드",
  description:
    "넥스트다이닝의 10개 프리미엄 외식 브랜드 — 봉우리 한정식, 진가와, 분지로, 다이센스시, 타쿠미나가사키, 카페르상스 등. 서울 한남동, 강남, 명동, 잠실, 부산 각 지점 안내.",
};

const CATEGORY_LABEL: Record<string, string> = {
  japanese: "일식",
  korean: "한식",
  american: "양식",
  cafe: "카페",
};

const TABS = [
  { key: "all", label: "전체" },
  { key: "japanese", label: "일식" },
  { key: "korean", label: "한식" },
  { key: "american", label: "양식" },
  { key: "cafe", label: "카페" },
];

export default function BrandsPage() {
  const japanese = brands.filter((b) => b.category === "japanese");
  const korean = brands.filter((b) => b.category === "korean");
  const american = brands.filter((b) => b.category === "american");
  const cafe = brands.filter((b) => b.category === "cafe");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-28">
      {/* 헤더 */}
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">Our Restaurants</p>
        <h1 className="text-4xl font-bold mb-4">10개의 브랜드, 각자의 이야기</h1>
        <p className="text-stone-500 max-w-2xl leading-relaxed">
          넥스트다이닝의 각 브랜드는 독립된 철학과 세계관을 가집니다.
          정통 일식부터 프리미엄 한정식, 세련된 카페까지 — 모두 본질을 먼저 생각합니다.
        </p>
      </div>

      {/* 일식 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3">
          일식
          <span className="text-sm font-normal text-stone-400">{japanese.length}개 브랜드</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {japanese.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* 한식 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3">
          한식
          <span className="text-sm font-normal text-stone-400">{korean.length}개 브랜드</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {korean.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* 양식 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3">
          양식
          <span className="text-sm font-normal text-stone-400">{american.length}개 브랜드</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {american.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* 카페 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3">
          카페
          <span className="text-sm font-normal text-stone-400">{cafe.length}개 브랜드</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cafe.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  const activeLocations = brand.locations.filter((l) => l.status === "active");
  const hasComingSoon = brand.locations.some((l) => l.status === "coming-soon");

  return (
    <Link
      href={`/brands/${brand.id}`}
      className="group block rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-300 hover:shadow-lg transition-all"
    >
      {/* 이미지 */}
      <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${brand.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="text-xs bg-white/80 backdrop-blur px-2 py-1 rounded-full text-stone-600 font-medium">
            {CATEGORY_LABEL[brand.category]}
            {brand.priceRange && ` · ${brand.priceRange}`}
          </span>
        </div>
        {hasComingSoon && (
          <div className="absolute top-3 right-3">
            <span className="text-xs bg-amber-400/90 px-2 py-1 rounded-full text-amber-900 font-medium">
              신규 오픈 예정
            </span>
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="p-5">
        <p className="text-xs text-stone-400 font-medium tracking-wider mb-1">{brand.nameEn}</p>
        <h3 className="font-bold text-stone-900 text-lg mb-2">{brand.name}</h3>
        <p className="text-sm text-stone-500 mb-4 line-clamp-2">{brand.description}</p>

        {activeLocations.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {activeLocations.map((loc) => (
              <span
                key={loc.name}
                className="text-xs bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-full text-stone-600"
              >
                {loc.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-amber-600 font-medium">입점 준비 중</span>
        )}
      </div>
    </Link>
  );
}
