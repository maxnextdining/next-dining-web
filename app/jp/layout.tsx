import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://next-dining.com"),
  title: {
    default: "NEXT DINING — ネクストダイニング",
    template: "%s | NEXT DINING",
  },
  description:
    "ネクストダイニングはBONGWOORI、JINKAWA、BUNJIRO、DAISEN SUSHIなど10のプレミアム飲食ブランドを運営するマルチブランドグループです。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://next-dining.com/jp",
    siteName: "NEXT DINING",
    title: "NEXT DINING — ネクストダイニング",
    description: "10のプレミアム飲食ブランド、直営店舗をソウル・ニューヨークで展開",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "NEXT DINING" }],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://next-dining.com/jp",
    languages: {
      ko: "https://next-dining.com",
      ja: "https://next-dining.com/jp",
    },
  },
};

/**
 * /ja 세그먼트 레이아웃 — 루트 layout이 경로(x-pathname)로 lang을 판별해
 * html lang·Header·Footer를 일본어로 렌더하므로, 여기서는 metadata만 덮어쓰고
 * children을 그대로 통과시킨다 (중첩 <html>/<body> 금지).
 */
export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
