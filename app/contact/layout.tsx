import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "예약 및 문의",
  description:
    "넥스트다이닝 브랜드 예약 및 제휴·입점 문의. 캐치테이블, 네이버 예약, Resy를 통해 봉우리 한정식, 진가와, 분지로, 다이센스시, NOFLEX NYC를 예약하세요.",
  openGraph: {
    title: "예약 및 문의 | NEXT DINING",
    description: "넥스트다이닝 10개 브랜드 예약 안내 및 제휴·입점 문의",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
