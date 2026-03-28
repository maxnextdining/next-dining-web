'use client';

import Link from "next/link";
import { useState } from "react";
import { brands } from "@/lib/brands";
import ScrollReveal from "@/components/ScrollReveal";

const TABS = [
  { key: 'reservation', label: '예약' },
  { key: 'partnership', label: '제휴·입점' },
] as const;

type TabKey = typeof TABS[number]['key'];

const CONTACT_TYPES = [
  {
    title: "입점·제휴 제안",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    desc: "백화점·아울렛·복합몰 등 입점 제안, 광고, 사업 제휴·협업 문의.",
    email: "communication@next-dining.com",
    note: "회사 소개 및 제안 내용 포함",
  },
  {
    title: "채용 문의",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    desc: "채용 관련 문의는 채용 페이지를 먼저 확인해 주세요.",
    email: "hr@next-dining.com",
    note: "채용 페이지 확인 후 지원",
    link: "/careers",
    linkLabel: "채용 페이지 바로가기",
  },
  {
    title: "그 외 문의",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    desc: "기타 일반 문의, 고객 의견, 건의사항 등.",
    email: "QnA@next-dining.com",
    note: "문의 내용을 상세히 적어주세요",
  },
];

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
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* 헤더 */}
      <section className="pt-20">
        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C8A96E] uppercase mb-5 font-body">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-display leading-tight max-w-2xl mb-6 text-[#EDEDED]">
            예약·문의
          </h1>
          <p className="text-[#8A8A8A] max-w-xl leading-relaxed text-lg font-body">
            브랜드별 예약 또는 제휴·입점 문의를 선택해 주세요.
          </p>
        </ScrollReveal>
      </section>

      {/* 탭 네비게이션 */}
      <div className="sticky top-16 lg:top-20 z-40 bg-[#0A0A0A] border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-medium transition-all border-b-2 font-body ${
                  activeTab === tab.key
                    ? 'border-[#C8A96E] text-[#C8A96E]'
                    : 'border-transparent text-[#8A8A8A] hover:text-[#EDEDED]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 예약 탭 */}
      {activeTab === 'reservation' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-widest text-[#C8A96E] uppercase mb-4 font-body">
              Reservation
            </p>
            <h2 className="text-3xl font-display mb-4 text-[#EDEDED]">브랜드별 예약</h2>
            <p className="text-[#8A8A8A] mb-12 font-body">
              예약 가능한 지점은 예약 버튼을 클릭하면 외부 예약 페이지로 이동합니다.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {BRAND_RESERVATIONS.map((br, idx) => {
              const brand = brands.find((b) => b.id === br.brandId);
              if (!brand) return null;

              return (
                <ScrollReveal key={br.brandId} delay={idx * 60}>
                  <div className="rounded-2xl border border-white/5 overflow-hidden bg-[#141414]">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
                      <div>
                        <Link
                          href={`/brands/${brand.id}`}
                          className="font-semibold text-[#EDEDED] hover:text-[#C8A96E] transition-colors font-body"
                        >
                          {brand.name}
                        </Link>
                        <span className="ml-2 text-xs text-[#8A8A8A] font-body">{brand.nameEn}</span>
                      </div>
                      {brand.priceRange && (
                        <span className="text-xs text-[#8A8A8A] font-body">{brand.priceRange}</span>
                      )}
                    </div>
                    <div className="divide-y divide-white/5">
                      {br.locations.map((loc) => (
                        <div
                          key={loc.name}
                          className="px-6 py-4 flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-[#EDEDED] text-sm font-body">{loc.name}</p>
                            {loc.note && (
                              <p className="text-xs text-[#8A8A8A] mt-0.5 font-body">{loc.note}</p>
                            )}
                          </div>
                          {loc.reservationUrl ? (
                            <a
                              href={loc.reservationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 bg-[#C8A96E] text-[#0A0A0A] px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#d4b87a] transition-colors font-body"
                            >
                              예약하기 →
                            </a>
                          ) : (
                            <span className="shrink-0 text-xs text-[#8A8A8A] bg-white/5 px-4 py-2 rounded-lg border border-white/10 font-body">
                              {loc.note || "현장 대기"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      )}

      {/* 제휴·입점 탭 */}
      {activeTab === 'partnership' && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-widest text-[#C8A96E] uppercase mb-4 font-body">
                Partnership
              </p>
              <h2 className="text-3xl font-display mb-4 text-[#EDEDED]">제휴·입점 문의</h2>
              <p className="text-[#8A8A8A] mb-12 font-body">
                넥스트다이닝은 롯데월드몰, 신세계아울렛, 아이파크몰, 사운즈한남 등 국내 주요 상업시설에 입점 운영 중입니다.
              </p>
            </ScrollReveal>

            {/* 입점 실적 요약 */}
            <ScrollReveal stagger className="grid sm:grid-cols-3 gap-4 mb-16">
              {[
                { value: "10개", label: "프리미엄 브랜드", sub: "일식·한식·양식·카페" },
                { value: "19", label: "전국·해외 직영 매장", sub: "서울·수원·부산·여주·뉴욕" },
                { value: "~350억", label: "연 매출 규모", sub: "2025년 기준, 전 매장 직영" },
              ].map((s) => (
                <div key={s.label} className="reveal bg-[#141414] rounded-2xl p-6 border border-white/5 text-center">
                  <p className="text-3xl font-display text-[#C8A96E] mb-1">{s.value}</p>
                  <p className="text-sm font-semibold text-[#EDEDED] mb-1 font-body">{s.label}</p>
                  <p className="text-xs text-[#8A8A8A] font-body">{s.sub}</p>
                </div>
              ))}
            </ScrollReveal>

            {/* 문의 유형 */}
            <ScrollReveal stagger className="grid sm:grid-cols-3 gap-6">
              {CONTACT_TYPES.map((ct) => (
                <div
                  key={ct.title}
                  className="reveal bg-[#141414] rounded-2xl border border-white/5 p-7 hover:border-[#C8A96E]/30 transition-all"
                >
                  <div className="text-[#C8A96E] mb-4">{ct.icon}</div>
                  <h3 className="font-semibold text-[#EDEDED] mb-2 font-body">{ct.title}</h3>
                  <p className="text-sm text-[#8A8A8A] leading-relaxed mb-4 font-body">{ct.desc}</p>
                  <p className="text-xs text-[#8A8A8A]/70 mb-3 font-body">보내실 내용: {ct.note}</p>
                  <a
                    href={`mailto:${ct.email}`}
                    className="inline-block text-sm text-[#C8A96E] font-medium hover:text-[#d4b87a] underline underline-offset-2 transition-colors font-body"
                  >
                    {ct.email}
                  </a>
                  {ct.link && (
                    <Link
                      href={ct.link}
                      className="block mt-3 text-xs text-[#8A8A8A] hover:text-[#EDEDED] transition-colors font-body"
                    >
                      {ct.linkLabel} →
                    </Link>
                  )}
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  );
}
