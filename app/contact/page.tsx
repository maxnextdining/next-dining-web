import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의",
  description:
    "넥스트다이닝 예약·단체 문의, 입점 제안, 제휴·협업 문의. 각 브랜드 예약 및 기업 케이터링 문의를 받습니다.",
};

const CONTACT_TYPES = [
  {
    title: "예약·단체 문의",
    icon: "🍽️",
    desc: "봉우리 한정식, 다이센스시 등 예약 필요 매장의 예약 및 단체 이용 문의.",
    email: "reservation@next-dining.com",
    note: "희망 일시, 인원, 브랜드명 포함",
  },
  {
    title: "입점·제휴 제안",
    icon: "🤝",
    desc: "넥스트다이닝 브랜드 입점 제안 또는 사업 제휴·협업 문의.",
    email: "biz@next-dining.com",
    note: "회사 소개 및 제안 내용 포함",
  },
  {
    title: "미디어·PR 문의",
    icon: "📷",
    desc: "취재, 인터뷰, 광고·협찬, 인플루언서 콜라보 문의.",
    email: "pr@next-dining.com",
    note: "매체명 또는 채널 정보 포함",
  },
  {
    title: "채용 문의",
    icon: "💼",
    desc: "채용 관련 문의는 채용 페이지를 먼저 확인해 주세요.",
    email: "careers@next-dining.com",
    note: "채용 페이지 확인 후 지원",
  },
];

const BRAND_CONTACTS = [
  {
    brand: "봉우리 한정식",
    locations: ["역삼점", "을지로점"],
    note: "코스 예약 권장 (최소 하루 전)",
  },
  {
    brand: "다이센스시",
    locations: ["한남점 (한국본점)"],
    note: "오마카세 사전 예약 필수 (카운터 7석)",
  },
  {
    brand: "진가와",
    locations: ["역삼점", "잠실롯데월드몰점", "부산본점"],
    note: "방문 전 예약 권장",
  },
  {
    brand: "분지로",
    locations: ["명동점 (한국본점)", "사운즈한남점", "수원점", "롯데월드몰점"],
    note: "일부 지점 대기 가능",
  },
  {
    brand: "타쿠미나가사키",
    locations: ["고속터미널점", "용산아이파크몰점"],
    note: "",
  },
  {
    brand: "봉우리 소반",
    locations: ["여주신세계아울렛점"],
    note: "",
  },
  {
    brand: "진진만두",
    locations: ["시청점"],
    note: "",
  },
  {
    brand: "카페 르상스",
    locations: ["한남점"],
    note: "",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* 헤더 */}
      <section className="bg-stone-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase mb-5">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mb-6">
            문의·예약
          </h1>
          <p className="text-stone-400 max-w-xl leading-relaxed text-lg">
            예약, 단체 문의, 입점 제안, 협업 등 모든 문의는 아래 이메일로 연락해 주세요.
          </p>
        </div>
      </section>

      {/* 문의 유형 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
          문의 유형
        </p>
        <h2 className="text-3xl font-bold mb-12">어떤 문의인가요?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_TYPES.map((ct) => (
            <div
              key={ct.title}
              className="rounded-2xl border border-stone-100 p-6 hover:border-stone-300 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-4">{ct.icon}</div>
              <h3 className="font-bold text-stone-900 mb-2">{ct.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">{ct.desc}</p>
              <p className="text-xs text-stone-400 mb-2">보내실 내용: {ct.note}</p>
              <a
                href={`mailto:${ct.email}`}
                className="text-sm text-stone-700 font-medium hover:text-stone-900 underline underline-offset-2 transition-colors"
              >
                {ct.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 브랜드별 지점 안내 */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
            지점 안내
          </p>
          <h2 className="text-3xl font-bold mb-12">브랜드별 운영 지점</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRAND_CONTACTS.map((bc) => (
              <div
                key={bc.brand}
                className="bg-white rounded-2xl p-5 border border-stone-100"
              >
                <h3 className="font-bold text-stone-900 mb-3">{bc.brand}</h3>
                <div className="space-y-1 mb-3">
                  {bc.locations.map((loc) => (
                    <p key={loc} className="text-sm text-stone-600">
                      · {loc}
                    </p>
                  ))}
                </div>
                {bc.note && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                    {bc.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 일반 문의 */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">그 외 문의</h2>
        <p className="text-stone-500 leading-relaxed mb-8">
          위 분류에 해당되지 않는 일반 문의는 아래 대표 이메일로 연락해 주세요.
        </p>
        <a
          href="mailto:hello@next-dining.com"
          className="inline-block bg-stone-900 text-white px-10 py-4 rounded-xl font-semibold text-sm hover:bg-stone-800 transition-colors"
        >
          hello@next-dining.com
        </a>
      </section>
    </div>
  );
}
