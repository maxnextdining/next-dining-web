# NEXT DINING Design System

## Brand Identity
- **Company**: NEXT DINING Corp. (넥스트다이닝) — Premium multi-brand restaurant group
- **Concept**: "The company stays invisible. Each brand shines on its own."
- **Tone**: Sophisticated, artisan-crafted, editorial magazine feel
- **Industry**: Premium F&B — Korean fine dining, Japanese artisan cuisine, NYC cocktail lounge

## Typography
- **Primary Font**: Noto Sans KR (400, 500, 600, 700)
- **Headings**: Bold, tight tracking (-0.02em), large scale (5xl~8xl for hero)
- **Body**: 15px, relaxed line-height (1.7), stone-600
- **Labels**: 10-11px, uppercase, letter-spacing 0.2em, stone-400

## Color Palette
### Base
- Background: #ffffff (white)
- Surface: #fafaf9 (stone-50)
- Text Primary: #1c1917 (stone-900)
- Text Secondary: #78716c (stone-500)
- Text Muted: #a8a29e (stone-400)
- Border: #f5f5f4 (stone-100)

### Brand Accent Colors (each brand has a unique signature color)
- Bongwoori (봉우리 한정식): #8B6914 — warm gold
- Bongwoori Soban (봉우리소반): #A0522D — copper
- Jinkawa (진가와): #1B2A4A — deep navy
- Bunjiro (분지로): #5C4033 — walnut brown
- Takumi Nagasaki (타쿠미나가사키): #2A6B6B — ocean teal
- Daisen Sushi (다이센스시): #2D3436 — slate charcoal
- Cafe Le Sens (카페 르상스): #6B705C — sage olive
- Jinjin Mandu (진진만두): #B91C1C — crimson red
- Menya Always (멘야올웨이즈): #C2410C — burnt orange
- NOFLEX NYC: #5B21B6 — electric violet

## Layout Principles
- Max width: 1280px (max-w-7xl)
- Side padding: 16/24/32px (responsive)
- Section padding: 96px vertical (py-24)
- Grid: 1/2/3 columns responsive
- Card border-radius: 16px (rounded-2xl)
- Button border-radius: 12px (rounded-xl)

## Visual Effects
- **Scroll animations**: Fade-up on scroll (IntersectionObserver)
- **Card hover**: translateY(-6px) + elevated shadow
- **Hero**: Animated gradient background + noise texture overlay
- **Glass effect**: rgba(255,255,255,0.05) + backdrop-blur(12px)
- **Brand gradient**: Each brand card has a gradient from brand color to lighter shade
- **Section divider**: Linear gradient transparent → stone-300 → transparent

## Component Patterns
- **Hero Section**: Full viewport height, dark background, large heading with gradient text accent
- **Brand Card**: Gradient background with brand initial letter overlay, info below
- **Story Section**: Alternating left/right layout with image + text
- **CTA Banner**: Dark background (stone-900 or brand color), rounded-3xl
- **Location Card**: White card with status badge, address, phone, reservation button
- **FAQ**: Accordion-style cards on light background

## Tech Stack
- Next.js 16 (App Router, SSG)
- React 19
- Tailwind CSS 4
- TypeScript 5
- Deployed on Vercel

## Important Notes
- All text is in Korean (한국어)
- No real images yet — use gradient placeholders with brand colors
- 10 restaurant brands, 15+ locations across Seoul, Suwon, Busan, Yeoju, NYC
- Mobile-first responsive design
- Schema.org JSON-LD for SEO
