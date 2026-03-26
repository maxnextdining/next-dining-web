import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://next-dining.com"),
  title: {
    default: "NEXT DINING — 넥스트다이닝",
    template: "%s | NEXT DINING",
  },
  description:
    "넥스트다이닝은 봉우리 한정식, 진가와, 분지로, 다이센스시 등 10개 프리미엄 외식 브랜드를 운영하는 멀티 브랜드 그룹입니다. 서울과 전국 15개 매장에서 정통 일식·한식의 진수를 선보입니다.",
  keywords: [
    "넥스트다이닝", "Next Dining", "봉우리 한정식", "진가와", "분지로", "다이센스시",
    "타쿠미나가사키", "카페르상스", "서울 맛집", "한남동 맛집", "강남 일식", "프리미엄 외식",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://next-dining.com",
    siteName: "NEXT DINING",
    title: "NEXT DINING — 넥스트다이닝",
    description: "10개 프리미엄 외식 브랜드, 서울과 전국 15개 매장",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "NEXT DINING" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} bg-white text-stone-900 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
