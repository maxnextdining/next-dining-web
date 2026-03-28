# next-dining.com — Application Harness

## Project Identity
- **소유**: 넥스트다이닝 (next-dining.com) 공식 웹사이트
- **스택**: Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4 (App Router)
- **배포**: Vercel (자동 배포, main 브랜치)
- **CMS**: Google Sheets (ISR 1시간) + Google Drive Assets

## Constitution — 이 프로젝트에서 반드시 지켜야 할 것
1. **운영 중 서비스**: 모든 변경은 프로덕션 영향을 전제로 판단
2. **서버 컴포넌트 우선**: 'use client'는 인터랙션이 필요한 곳만
3. **ISR 패턴 유지**: revalidate: 3600 (메뉴·콘텐츠), 정적 페이지는 빌드 타임
4. **SEO 보호**: 메타 태그, JSON-LD, sitemap 변경 시 반드시 검증
5. **CMS 연동**: 메뉴 데이터는 Google Sheets → CSV fetch → fallback to hardcoded
6. **브랜드 데이터**: lib/brands.ts가 Single Source of Truth (10개 브랜드)

## Key Files
- `lib/brands.ts` — 브랜드 마스터 데이터 (format, category, stores 등)
- `lib/menu-sheets.ts` — Google Sheets CMS 연동 모듈
- `app/about/page.tsx` — 회사 소개 (브랜드 포트폴리오 섹션)
- `app/brands/[id]/page.tsx` — 브랜드 상세 (ISR 메뉴 데이터)
- `app/layout.tsx` — 루트 레이아웃 (네비게이션, 푸터)

## CMS (Google Sheets)
- Sheet ID: 1d_c97pg1fn5MWJV0d460BW-NYwV1hXK5XlMdABBpcQM
- 탭: 메뉴, 페이지_콘텐츠, 브랜드_기본정보, 브랜드_스토리, 매장정보, 채용공고, 새소식, 이미지_매핑, 사용안내
- 이미지: 공유 드라이브 > 11. 홈페이지 제작 > Assets

## Verification — 변경 후 필수 확인
1. `npm run build` 성공
2. TypeScript 에러 없음
3. 영향 받는 페이지 목시 확인 (빌드 로그에서 라우트 체크)
4. 메타 태그/JSON-LD 변경 시 구조 검증
5. 모바일 반응형 깨짐 여부 (Tailwind breakpoint 확인)

## Execution Pattern
- S/M 작업: Coder 위임 → Reviewer 검증 → 보고
- 빌드 실패 시: Coder가 직접 수정 후 재검증
- git commit은 메인 에이전트만 수행 (호상님 컨펌 후)
