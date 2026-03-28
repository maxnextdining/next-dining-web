# Next Dining Design System Guide

## Colors
- Primary: #C8A96E (gold) — CTA, accent, section labels
- Primary Hover: #E8D5B0
- Secondary: #6B8CAE (blue) — minimal use, sub-accent only
- Background Dark: #0A0A0A
- Background Elevated: #0F0F0F
- Surface Card: #141414
- Text Primary: #EDEDED
- Text Muted: #8A8A8A
- Light Section: #F7F5F0
- Light Section Text: #1A1A1A
- Category Korean: #C8A96E
- Category Japanese: #6B8CAE
- Category American: #6BAE8C
- Category Cafe: #9B8DC8
- Rule: maximum 2 accent colors per page (gold + one category color)

## Typography
- Font: Pretendard Variable (all weights, no serif, no italic)
- Headline h1: text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold
- Headline h2: text-3xl md:text-4xl font-bold
- Headline h3: text-lg or text-2xl font-bold
- Body: text-sm or text-base, leading-relaxed
- Section Label: text-xs font-semibold tracking-[0.25em] uppercase text-[#C8A96E]
- Emphasis: font-bold or font-extrabold + color change (NEVER italic)
- Korean text: word-break: keep-all (set globally on body)

## Spacing
- Section vertical padding: py-24 (standard), py-32 (hero/major)
- Container: max-w-7xl mx-auto
- Horizontal padding: px-4 sm:px-6 lg:px-8 (responsive standard)
- Card internal padding: p-6 or p-7

## Buttons
- Primary CTA: cta-primary class, bg-[#C8A96E] text-[#0A0A0A] hover:bg-[#E8D5B0] rounded-full font-semibold
- Outline CTA: cta-outline class, border border-[#C8A96E] text-[#C8A96E] rounded-full
- Both include hover:scale(1.02) and active:scale(0.98)
- Standard size: px-8 py-3 text-sm
- Large size: px-10 py-4 text-sm (hero only)
- Header size: px-5 py-2 text-sm
- Border radius: ALWAYS rounded-full for buttons (never rounded-xl)

## Cards
- Background: bg-[#141414]
- Border: border border-white/5
- Hover: hover:border-[#C8A96E]/30 transition-colors
- Radius: rounded-2xl (standard), rounded-xl (brand image cards only)
- Brand card specific: brand-card class with translateY(-12px) hover

## Glass Effects
- glass-dark: bg rgba(10,10,10,0.7) + backdrop-blur-xl + border white/6 + inset shadow
- glass-light: bg rgba(247,245,240,0.8) + backdrop-blur-xl

## Animation
- Easing: cubic-bezier(0.16, 1, 0.3, 1) — spring feel (NEVER linear or ease-in-out)
- Scroll reveal: IntersectionObserver based (never window scroll listener)
- Transitions: transform and opacity only (never top/left/width/height)
- iOS: use min-h-[100dvh] not min-h-screen

## Do NOT
- Use DM Serif Display or any serif font
- Use italic for emphasis
- Use colors not defined above
- Use rounded-xl for buttons
- Use inline style={{}} for standard colors (use Tailwind classes)
- Add <style> blocks inside JSX (use globals.css or Tailwind)
- Mix tracking values on section labels
