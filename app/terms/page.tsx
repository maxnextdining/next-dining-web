import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "넥스트다이닝 홈페이지 이용약관",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">이용약관</h1>
        <p className="text-stone-600 leading-relaxed">
          이용약관 내용이 준비 중입니다.
        </p>
      </div>
    </main>
  );
}
