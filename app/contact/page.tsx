'use client';

import Link from "next/link";
import { useState } from "react";
import { brands } from "@/lib/brands";

const TABS = [
  { key: 'reservation', label: '예약', icon: '📅' },
  { key: 'partnership', label: '제휴·입점', icon: '🤝' },
] as const;

type TabKey = typeof TABS[number]['key'];

const CONTACT_TYPES = [
  {
    title: "입점·제휴 제안",
    icon: "🏢",
    desc: "백화점·아울렛·복합몰 등 입점 제안, 광고, 사업 제휴·협업 문의.",
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

// brands.ts의 reservationLinks + locations 기반으로 자동 생성
const BRAND_RESERVATIONS = brands
  .filter((b) => b.locations.some((l) => l.status === 'active'))
  .map((brand) => ({
    brandId: brand.id,
    locations: brand.locations
      .filter((loc) => loc.status === 'active')
      .map((loc) => {
        const link = brand.reservationLinks?.find(
          (r) => r.location === loc.name || (!r.location && brand.reservationLinks!.length === 1)
        );
        return {
          name: loc.name,
          reservationUrl: link?.url,
          note: link?.note,
        };
      }),
  }));

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('reservation');

  return (
    <div>
      {/* 헤더 */}
      <section className="bg-stone-950 text-white pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase mb-5 font-headline">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mb-6 font-headline">
            예약·문의
          </h1>
          <p className="text-stone-400 max-w-xl leading-relaxed text-lg font-body">
            브랜드별 예약 또는 제휴·입점 문의를 선택해 주세요.
          </p>
        </div>
      </section>

      {/* 탭 네비게이션 */}
      <div className="sticky top-16 lg:top-20 z-40 bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.key
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 예약 탭 */}
      {activeTab === 'reservation' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4 font-headline">
            Reservation
          </p>
          <h2 className="text-3xl font-bold mb-4 font-headline">브랜드별 예약</h2>
          <p className="text-stone-500 mb-12 font-body">
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
                      <span className="ml-2 text-xs text-stone-400 font-headline">{brand.nameEn}</span>
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
                            예약하기 →
                          </a>
                        ) : (
                          <span className="shrink-0 text-xs text-stone-400 bg-stone-50 px-4 py-2 rounded-lg border border-stone-200">
                            {loc.note || "현장 대기"}
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
      )}

      {/* 제휴·입점 탭 */}
      {activeTab === 'partnership' && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4 font-headline">
              Partnership
            </p>
            <h2 className="text-3xl font-bold mb-4 font-headline">제휴·입점 문의</h2>
            <p className="text-stone-500 mb-12 font-body">
              넥스트다이닝은 롯데월드몰, 신세계아울렛, 아이파크몰, 사운즈한남 등 국내 주요 상업시설에 입점 운영 중입니다.
            </p>

            {/* 입점 실적 요약 */}
            <div className="grid sm:grid-cols-3 gap-4 mb-16">
              {[
                { value: "9개", label: "프리미엄 브랜드", sub: "일식·한식·양식·카페" },
                { value: "19", label: "전국·해외 직영 매장", sub: "서울·수원·부산·여주·뉴욕" },
                { value: "~350억", label: "연 매출 규모", sub: "2024년 기준, 전 매장 직영" },
              ].map((s) => (
                <div key={s.label} className="bg-stone-50 rounded-2xl p-6 border border-stone-100 text-center">
                  <p className="text-3xl font-bold text-stone-900 mb-1 font-headline">{s.value}</p>
                  <p className="text-sm font-semibold text-stone-700 mb-1">{s.label}</p>
                  <p className="text-xs text-stone-400">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* 문의 유형 */}
            <div className="grid sm:grid-cols-3 gap-6">
              {CONTACT_TYPES.map((ct) => (
                <div
                  key={ct.title}
                  className="bg-white rounded-2xl border border-stone-100 p-7 hover:border-stone-300 hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-4">{ct.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{ct.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4 font-body">{ct.desc}</p>
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
      )}
    </div>
  );
}
