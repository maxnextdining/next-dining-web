import type { Metadata } from "next";
import { fetchPageContent } from "@/lib/sheets-cms";
import ContactClient from "./ContactClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "예약·문의",
  description: "넥스트다이닝 브랜드별 예약 및 제휴·입점 문의.",
  openGraph: {
    title: "예약·문의 | NEXT DINING",
    description: "브랜드별 예약 또는 제휴·입점 문의를 선택해 주세요.",
  },
};

export default async function ContactPage() {
  const content = await fetchPageContent();
  const c = content?.contact;

  const hero = {
    heading: c?.hero?.heading ?? "예약·문의",
    subtitle: c?.hero?.subtitle ?? "브랜드별 예약 또는 제휴·입점 문의를 선택해 주세요.",
  };
  const emails = {
    partnership: c?.emails?.partnership ?? "communication@next-dining.com",
    hr: c?.emails?.hr ?? "hr@next-dining.com",
    general: c?.emails?.general ?? "QnA@next-dining.com",
  };

  return <ContactClient hero={hero} emails={emails} />;
}
