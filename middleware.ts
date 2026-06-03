import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 현재 요청 경로를 x-pathname 요청 헤더에 주입한다.
 * 루트 app/layout.tsx가 headers()로 이 값을 읽어 ko/ja 언어를 판별한다.
 * (서버 컴포넌트 루트 레이아웃은 경로를 직접 알 수 없으므로 필요)
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // 정적 자산·이미지·api는 제외하고 페이지 경로에만 적용
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|.*\\..*).*)",
  ],
};
