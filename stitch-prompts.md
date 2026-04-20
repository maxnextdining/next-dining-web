# Google Stitch 프롬프트 모음 — NEXT DINING 홈페이지

> **사용법**: 각 프롬프트를 stitch.withgoogle.com에 복사-붙여넣기하세요.
> DESIGN.md 파일을 먼저 Stitch에 업로드하면 디자인 일관성이 유지됩니다.
> Export 시 **React + Tailwind CSS** 형식으로 내보내주세요.

---

## 0. 전체 디자인 시스템 설정 (가장 먼저 실행)

```
I'm building a premium restaurant group website for "NEXT DINING" (넥스트다이닝), a Korean multi-brand F&B company operating 10 restaurant brands across Seoul, Busan, and NYC.

Design system requirements:
- Sophisticated editorial magazine aesthetic, like Monocle or Kinfolk
- Dark hero sections with animated gradients
- Clean white content sections with generous whitespace
- Typography: Large bold headings (up to 8xl), small uppercase tracking labels
- Color: Base is stone/warm gray palette. Each of the 10 brands has a unique accent color (gold, navy, brown, teal, charcoal, sage, crimson, orange, violet)
- Cards with subtle hover lift animation and brand-colored gradient backgrounds
- Scroll reveal animations (fade-up)
- Glass morphism effects for overlays
- Noise texture on dark sections
- Korean language (한국어) for all content
- Mobile-first responsive, max-width 1280px

The vibe is: "The company stays invisible. Each brand shines with its own story."

Please generate a design system with these specifications as a starting point.
```

---

## 1. 홈페이지 — 히어로 섹션

```
Design a full-viewport hero section for a premium restaurant group website.

Specifications:
- Full height (90vh minimum), dark background with subtle animated gradient (dark navy to deep charcoal)
- Noise/grain texture overlay at very low opacity
- Decorative blurred circles (soft light) in corners
- Top-left: small uppercase label "NEXT DINING CORP." in muted gray, letter-spacing 0.35em
- Main heading in Korean: "검증된 장인의 맛을" (line 1) + "새로운 기준으로" (line 2, with gold gradient text effect)
- Font size: 5.5rem on desktop, 3rem on mobile
- Subtext below in muted gray: "봉우리 한정식부터 나가사키 장인 돈카츠, 뉴욕 맨해튼까지. 10개 브랜드가 각자의 철학과 이야기로 한국 외식의 수준을 높입니다."
- Two CTA buttons: "브랜드 보기" (solid white, rounded-xl) and "입점 문의" (glass/frosted border)
- Bottom stats row: "10 브랜드" / "15+ 직영 매장" / "4 도시" — large numbers, small uppercase labels
- Everything enters with staggered fade-up animation

Style: Think luxury hotel website meets editorial magazine. No images, pure typography and atmosphere.
```

---

## 2. 홈페이지 — 브랜드 카드 그리드

```
Design a brand showcase section for a restaurant group website. It displays restaurant brands organized by cuisine category.

Layout:
- Section heading with small uppercase English label + large Korean category name + thin accent line below
- 3-column grid on desktop, 1 column on mobile
- Each card represents one restaurant brand

Card design:
- Top: 4:3 aspect ratio area with a rich gradient background (each brand has a unique color — e.g., gold for Korean fine dining, deep navy for Japanese soba, walnut brown for tonkatsu, violet for NYC lounge)
- Inside the gradient: a large, semi-transparent single letter (the brand's English initial) as decorative element
- Small glass-effect badge showing price range (₩₩₩) in top-left corner
- Optional "신규 오픈 예정" badge in amber in top-right

Card info below the image:
- Tiny uppercase English brand name (10px, tracking wide)
- Bold Korean brand name (20px)
- Tagline in muted gray (14px, 2-line clamp)
- Origin story excerpt (12px, separated by thin border-top)
- Location pills (small rounded tags showing branch names)

Interaction: Cards lift up 6px on hover with elevated shadow. Gradient area scales slightly (1.08x).

Show 3 categories:
1. "한식 / Korean" — 3 brands
2. "일식 / Japanese" — 5 brands
3. "카페 / 라운지 / Cafe & Lounge" — 2 brands

Use warm, sophisticated colors. No stock photos — gradient + typography only.
```

---

## 3. 브랜드 상세 페이지 — 히어로

```
Design a brand detail page hero for a single restaurant brand within a multi-brand restaurant group.

Hero section:
- 75vh minimum height, brand's signature color as gradient background (e.g., deep navy #1B2A4A fading to black)
- Noise texture overlay
- Decorative radial gradient circle in top-right corner (brand color, low opacity)
- Gradient overlay from bottom (black/60%) for text readability
- Content aligned to bottom-left:
  - Back link: "← 레스토랑 전체 보기" in muted white
  - Category badge: glass-effect pill showing "일식"
  - Price range: "₩₩₩" and cuisine type "/ 소바" in muted white
  - English name: small uppercase, wide tracking, 40% white opacity
  - Korean name: 7-8rem bold white heading
  - Tagline: 2xl, light weight, 70% white opacity

Below the hero, "About" section:
- Clean white background, generous padding (96px)
- Description paragraph in 18px stone-700
- Blockquote with left border in brand accent color, italic text
- Optional "공식 웹사이트 방문 →" button in brand accent color

The overall feel: each brand page should feel like its own world, with the brand's color dominating the atmosphere.
```

---

## 4. 브랜드 상세 — 스토리 교차 섹션

```
Design an alternating story section for a restaurant brand page. This tells the brand's story in 5 chapters.

Each chapter has:
- Left: Image/visual area (4:3, rounded-2xl) with a subtle brand-colored gradient tint and large "01"~"05" number watermark
- Right: Text content with small uppercase English section title, bold Korean heading, thin accent line in brand color, then body text

Chapters alternate: odd chapters have image-left/text-right, even chapters flip to image-right/text-left.

The 5 story sections are:
1. "Origin Story / 탄생 이야기" — brand's historical background
2. "The Artisan / 장인의 길" — chef or artisan story
3. "Ingredients / 식재료 철학" — ingredient sourcing philosophy
4. "Signature / 시그니처" — signature menu description
5. "Space & Experience / 공간 경험" — restaurant atmosphere

Background alternates between white and very light gray (stone-50) per section.
Each section enters viewport with slide-from-left or slide-from-right animation depending on layout direction.
Generous vertical padding (112px per section).

Style: Clean, editorial, like a food magazine feature article. No photos — use gradient placeholders with the story number as large decorative typography.
```

---

## 5. 브랜드 상세 — 메뉴 & 가격 + 지점 안내

```
Design two connected sections for a restaurant brand page: Menu & Locations.

SECTION 1: Menu & Price
- Section label "Menu & Price" uppercase, heading "대표 메뉴" in bold
- Thin accent line below heading
- 3-column grid of menu item cards
- Each card: white background, rounded-2xl, subtle border, padding 24px
  - Left: bold menu item name in stone-900
  - Right: price in brand accent color (e.g., "16,000원~29,000원")
  - Hover: slight border darken + subtle shadow
- Footer note: "* 가격은 매장 및 시기에 따라 변동될 수 있습니다." in tiny muted text

SECTION 2: Location Guide (on light gray background)
- Two-column layout: left 5/12 with heading + CTA, right 7/12 with location cards
- Left side: "Locations" label, "지점 안내" heading, accent line, description, CTA button in brand color
- Right side: stacked location cards, each with:
  - Branch name (bold, 18px) + status badge ("운영 중" in green, "오픈 예정" in amber)
  - Address, phone number (clickable), business hours
  - "캐치테이블 예약 →" button in brand accent color (only for active locations with reservations)
  - Cards enter with staggered animation

Clean, functional, information-dense but not cluttered.
```

---

## 6. 채용 페이지

```
Design a careers/recruitment page for a premium restaurant group.

Hero: Dark gradient background (similar to homepage), heading "넥스트다이닝과 함께할 사람을 찾습니다" in large white type.

Open Positions section:
- Cards for each position showing: job title, brand name, location, employment type (정규직/아르바이트), brief description
- Cards have left accent border in the respective brand's color
- Filter or category tabs at top (optional)

Benefits section: "복리후생" heading
- Grid of 9 benefit cards with icons:
  1. 일본 현지 연수 (Japan training)
  2. 메뉴 시식 지원 (Menu tasting)
  3. 브랜드 할인 (Brand discount)
  4. 경조사 지원 (Life events support)
  5. 장기근속 수당 (Loyalty bonus)
  6. 성과 인센티브 (Performance incentive)
  7. 주택자금 지원 (Housing assistance)
  8. 4대보험·퇴직연금 (Insurance & pension)
  9. 육아 지원 (Childcare support)

Bottom CTA: Dark card with "지원하기" button and email (hr@next-dining.com)

Korean language throughout. Premium but warm — convey "we invest in our people."
```

---

## 7. 문의 페이지

```
Design a contact page for a multi-brand restaurant group with reservation and business inquiry sections.

Top section: "문의하기 / Contact" hero with brief intro text on dark background.

Two-column layout below:
LEFT: Business inquiry form
- Fields: 이름, 이메일, 문의 유형 (드롭다운: 입점제안/광고제휴/기타), 메시지
- Submit button in stone-900
- Below form: Direct email contacts
  - 사업 제휴: communication@next-dining.com
  - 채용 문의: hr@next-dining.com

RIGHT: Reservation guide by brand
- Expandable/accordion cards for each brand
- Each shows branch locations with reservation platform (캐치테이블/Resy) and direct links
- Brand accent color as left border or icon color

Bottom: Full-width map or location summary showing all 15+ locations

Korean language. Professional but approachable.
```

---

## 8. 회사 소개 페이지

```
Design an About page for a premium restaurant group. Key principle: "The company stays in the background. The brands are the stars."

Hero: "브랜드가 주인공입니다" as main heading, with subtext about discovering artisan brands and bringing them to Korea.

Philosophy section: Three pillars displayed as large cards or columns:
1. "발굴" (Discovery) — Finding proven artisan brands
2. "이식" (Transplant) — Bringing authentic recipes and techniques to Korea
3. "운영" (Operation) — Professional multi-brand management

Brand timeline: Horizontal or vertical timeline showing brand launches:
- 봉우리 한정식 (Korean fine dining)
- 진가와 (370-year Nagasaki soba)
- 분지로 (Nagasaki tonkatsu artisan)
- 다이센스시 (Kyushu sushi)
- NOFLEX NYC (Manhattan media art lounge)
- etc.

Each timeline entry has: brand name, brand color dot, brief origin line, year.

Team philosophy section: Brief quote-style text about the founding vision. No individual photos — keep it brand-focused.

Footer CTA: Link to careers page.

Elegant, minimal, editorial. Let the brand stories speak for the company.
```

---

## 9. Header & Footer

```
Design a website header and footer for a premium restaurant group.

HEADER:
- Sticky, white background with subtle blur (bg-white/95 backdrop-blur)
- Thin bottom border (stone-100)
- Height: 64px
- Left: Logo image placeholder (140px wide)
- Center: Navigation links — 브랜드, 회사 소개, 새소식, 채용, 문의 (stone-600, hover to stone-900)
- Right: "입점 문의" CTA button (stone-900 bg, white text, rounded-lg)
- Mobile: Hamburger menu that slides down with full-width links

FOOTER:
- Dark background (stone-900), light text (stone-300)
- 4-column grid:
  - Col 1-2: Company name/logo, brief tagline, legal info (대표이사, 주소)
  - Col 3: "Restaurants" — list of all 10 brand links
  - Col 4: "Company" — 회사 소개, 새소식, 채용 안내, 문의하기
- Bottom bar: Copyright + next-dining.com
- Clean, no clutter. Generous spacing.

Korean language. Minimal, premium aesthetic.
```

---

## 사용 팁

1. **순서**: 먼저 프롬프트 #0으로 디자인 시스템을 설정한 뒤, 각 페이지를 생성하세요.
2. **DESIGN.md**: 프로젝트 루트의 `DESIGN.md` 파일을 Stitch에 업로드하면 브랜드 컬러와 디자인 규칙이 자동 적용됩니다.
3. **반복 생성**: 마음에 안 드는 부분은 "이 섹션의 카드를 더 크게" 등 자연어로 수정 요청하세요.
4. **Export**: React + Tailwind CSS로 내보내시면, 제가 바로 Next.js 프로젝트에 통합합니다.
5. **음성**: Stitch는 음성 명령도 지원합니다. "Make the hero taller" 같은 실시간 수정이 가능합니다.
