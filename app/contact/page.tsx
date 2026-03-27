import Link from "next/link";
import type { Metadata } from "next";
import { brands } from "@/lib/brands";

export const metadata: Metadata = {
  title: "문의·예약",
  description:
    "넥스트다이닝 브랜드별 예약·단체 문의, 입점 제안, 제휴·협업, 채용 문의. 각 브랜드 예약 페이지 및 담당 이메일 안내.",
};

const CONTACT_TYPES = [
  {
    title: "광고·입점 제안",
    icon: "🤝",
    desc: "넥스트다이닝 브랜드 입점 제안, 광고, 사업 제휴·협업 문의.",
    email: "communication@next-dining.com",
    note: "회사 소개 및 제안 내용 포함",
  },
  {
    title: "채용 문의",
    icon: "💼",
    desc: "채용 관련 문의는 채용 페이지를 먼저 확인해 주세요.",
    email: "hr@next-dining.com",
    note: "채용 페이지 확인 후 지원",
    link: "/careers",
    linkLabel: "채용 페이지 바로가기",
  },
  {
    title: "그 외 문의",
    icon: "💬",
    desc: "기타 일반 문의, 고객 의견, 건의사항 등.",
    email: "QnA@next-dining.com",
    note: "문의 내용을 상세히 적어주세요",
  },
];

// 브랜드별 예약 링크 (캐치테이블 등 외부 예약 페이지)
const BRAND_RESERVATIONS: {
  brandId: string;
  locations: {
    name: string;
    reservationUrl?: string;
    reservationPlatform?: string;
    note?: string;
  }[];
}[] = [
  {
    brandId: "bongwoori",
    locations: [
      { name: "역삼점", reservationUrl: "https://app.catchtable.co.kr/ct/shop/bongwoori_yeoksam", reservationPlatform: "캐치테이블", note: "코스 예약 권장 (최소 하루 전)" },
      { name: "을지로점", reservationUrl: "https://app.catchtable.co.kr/ct/shop/bongwoori_euljiro", reservationPlatform: "캐치테이블", note: "코스 예약 권장" },
    ],
  },
  {
    brandId: "daisen",
    locations: [
      { name: "사운즈한남점 (한국본점)", reservationUrl: "https://app.catchtable.co.kr/ct/shop/daisen_hannam", reservationPlatform: "캐치테이블", note: "사전 예약 필수 (프라이빗 룸 운영)" },
    ],
  },
  {
    brandId: "jinkawa",
    locations: [
      { name: "역삼점", reservationUrl: "https://app.catchtable.co.kr/ct/shop/jinkawa_yeoksam", reservationPlatform: "캐치테이블" },
      { name: "잠실롯데월드몰점", note: "현장 대기" },
      { name: "부산본점", note: "전화 예약" },
    ],
  },
  {
    brandId: "bunjiro",
    locations: [
      { name: "명동점 (한국본점)", reservationUrl: "https://app.catchtable.co.kr/ct/shop/bunjiro_myeongdong", reservationPlatform: "캐치테이블" },
      { name: "사운즈한남점", reservationUrl: "https://app.catchtable.co.kr/ct/shop/bunjiro_hannam", reservationPlatform: "캐치테이블" },
      { name: "수원점", note: "현장 대기" },
      { name: "롯데월드몰점", note: "현장 대기" },
    ],
  },
  {
    brandId: "takumi-nagasaki",
    locations: [
      { name: "고속터미널점", note: "현장 대기" },
      { name: "용산아이파크몰점", note: "현장 대기" },
    ],
  },
  {
    brandId: "bongwoori-soban",
    locations: [
      { name: "여주신세계아울렛점", note: "현장 대기" },
    ],
  },
  {
    brandId: "jinjin-mandu",
    locations: [
      { name: "시청점", note: "현장 방문" },
    ],
  },
  {
    brandId: "cafe-le-sens",
    locations: [
      { name: "사운즈한남점", note: "현장 방문" },
    ],
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* 헤더 */}
      <section className="bg-stone-950 text-white pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase mb-5">
            Contact & Reservation
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mb-6">
            예약·문의
          </h1>
          <p className="text-stone-400 max-w-xl leading-relaxed text-lg">
            각 브랜드 지점별 예약 페이지에서 바로 예약하시거나,
            문의 유형에 맞는 이메일로 연락해 주세요.
          </p>
        </div>
      </section>

      {/* 브랜드별 예약 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
          Reservation
        </p>
        <h2 className="text-3xl font-bold mb-4">브랜드별 예약</h2>
        <p className="text-stone-500 mb-12">
          예약 가능한 지점은 예약 버튼을 클릭하면 외부 예약 페이지로 이동합니다.
        </p>

        <div className="space-y-8">
          {BRAND_RESERVATIONS.map((br) => {
            const brand = brands.find((b) => b.id === br.brandId);
            if (!brand) return null;

            return (
              <div key={br.brandId} className="rounded-2xl border border-stone-100 overflow-hidden">
                <div className="bg-stone-50 px-6 py-4 flex items-center justify-between">
                  <div>
                    <Link
                      href={`/brands/${brand.id}`}
                      className="font-bold text-stone-900 hover:text-stone-600 transition-colors"
                    >
                      {brand.name}
                    </Link>
                    <span className="ml-2 text-xs text-stone-400">{brand.nameEn}</span>
                  </div>
                  {brand.priceRange && (
                    <span className="text-xs text-stone-400">{brand.priceRange}</span>
                  )}
                </div>
                <div className="divide-y divide-stone-100">
                  {br.locations.map((loc) => (
                    <div
                      key={loc.name}
                      className="px-6 py-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-stone-900 text-sm">{loc.name}</p>
                        {loc.note && (
                          <p className="text-xs text-stone-400 mt-0.5">{loc.note}</p>
                        )}
                      </div>
                      {loc.reservationUrl ? (
                        <a
                          href={loc.reservationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 bg-stone-900 text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
                        >
                          {loc.reservationPlatform || "예약하기"} →
                        </a>
                      ) : (
                        <span className="shrink-0 text-xs text-stone-400 bg-stone-50 px-4 py-2 rounded-lg border border-stone-200">
                          {loc.note || "현장 방문"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 문의 유형 */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl font-bold mb-12">문의하기</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {CONTACT_TYPES.map((ct) => (
              <div
                key={ct.title}
                className="bg-white rounded-2xl border border-stone-100 p-7 hover:border-stone-300 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">{ct.icon}</div>
                <h3 className="font-bold text-stone-900 mb-2">{ct.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-4">{ct.desc}</p>
                <p className="text-xs text-stone-400 mb-3">보내실 내용: {ct.note}</p>
                <a
                  href={`mailto:${ct.email}`}
                  className="inline-block text-sm text-stone-700 font-medium hover:text-stone-900 underline underline-offset-2 transition-colors"
                >
                  {ct.email}
                </a>
                {ct.link && (
                  <Link
                    href={ct.link}
                    className="block mt-3 text-xs text-stone-500 hover:text-stone-700 transition-colors"
                  >
                    {ct.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
