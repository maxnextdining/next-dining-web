import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "예약·문의",
  description:
    "넥스트다이닝 브랜드별 예약 및 제휴·입점 문의. 봉우리 한정식, 진가와, 분지로, 다이센스시 등 예약과 사업 제휴 안내.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
