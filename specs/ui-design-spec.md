# Aesthetica — UI Design Specification

**Version:** 1.0 — March 2026
**Author:** UI Design
**Stack:** Next.js 15 · Tailwind CSS · shadcn/ui · Lucide Icons

---

## 1. Brand Identity

### 1.1 Aesthetic Concept

Aesthetica is a **warm editorial luxury** — the feeling of opening a beautifully printed beauty textbook inside a sunlit studio. It is the opposite of Milady's dated orange-on-white clinical utility and the opposite of Canvas's cold institutional gray. Aesthetica feels like a premium skincare brand decided to build an LMS: intentional, skin-forward, empowering, and quietly confident.

The visual language draws from **editorial beauty publishing** (think Vogue, Allure, Byrdie) fused with **modern SaaS clarity**. Warm champagne tones ground the palette. A deep plum provides authority and premium depth. A soft rose-gold accent signals beauty industry credibility without being saccharine. The result is a platform that students *want* to open every morning — not one they feel obligated to log into.

### 1.2 Brand Voice in Visual Terms

| Dimension | Aesthetica Is | Aesthetica Is NOT |
|-----------|--------------|-------------------|
| Tone | Warm, empowering, premium | Cold, clinical, institutional |
| Personality | Confident mentor | Bureaucratic system |
| Feel | Beauty editorial | Generic LMS |
| Texture | Soft, tactile, organic | Hard, flat, corporate |
| Energy | Calm focus | Urgent/overwhelming |

### 1.3 Logo Direction

The wordmark uses **Cormorant Garamond** (the display typeface) in Regular weight, all lowercase: `aesthetica`. The "a" ligature can optionally be replaced with a custom mark — a stylized double-curve suggesting both a letter and a facial contour line. The tagline "Learn to glow." sets in the body typeface at caption scale, tracked +0.15em, in the muted foreground color.

**Do not** use a generic beauty icon (lips, sparkles, scissors). The brand mark should feel editorial, not clipart.

---

## 2. Color System

### 2.1 Palette Rationale

The palette is built around **warm neutrals anchored by deep plum and rose**. This is a deliberate departure from every competitor:

- **Milady CIMA**: Orange-dominant, dated
- **Pivot Point**: Generic blue-gray
- **Canvas/Blackboard**: Cold institutional gray-white

Aesthetica's palette reads as premium beauty brand first, learning platform second.

### 2.2 Full Color Palette

#### Brand Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Plum** | `#3D1A4B` | `280 47% 20%` | Primary brand, CTAs, sidebar active states |
| **Plum Light** | `#5C2D72` | `280 43% 31%` | Hover states, secondary headings |
| **Rose** | `#C4748A` | `345 36% 61%` | Accent, highlights, achievement badges |
| **Rose Light** | `#E8B4C0` | `345 45% 81%` | Accent backgrounds, soft highlights |
| **Champagne** | `#F5ECD7` | `38 62% 90%` | Surface tints, card backgrounds |
| **Champagne Deep** | `#E8D5B0` | `38 52% 80%` | Borders on champagne surfaces |
| **Sage** | `#7A9E8A` | `152 16% 55%` | Success states, progress, completion |
| **Sage Light** | `#C4D9CC` | `152 22% 81%` | Success backgrounds |

#### Semantic / System Colors

| Token | Light Mode Hex | Dark Mode Hex | Usage |
|-------|---------------|---------------|-------|
| `--color-error` | `#C0392B` | `#E57373` | Validation errors, destructive actions |
| `--color-error-bg` | `#FDECEA` | `#3D1A1A` | Error state backgrounds |
| `--color-warning` | `#B7791F` | `#F6AD55` | Warnings, incomplete states |
| `--color-warning-bg` | `#FFFBEB` | `#2D2010` | Warning backgrounds |
| `--color-success` | `#276749` | `#68D391` | Completion, passing grades |
| `--color-success-bg` | `#F0FFF4` | `#1A2D22` | Success backgrounds |

### 2.3 Light Mode Token Map

```css
:root {
  /* ─── Brand ─────────────────────────────────────────── */
  --primary:             280 47% 20%;   /* #3D1A4B Plum */
  --primary-foreground:  0 0% 100%;     /* White */
  --primary-hover:       280 43% 31%;   /* #5C2D72 Plum Light */

  --secondary:           345 36% 61%;   /* #C4748A Rose */
  --secondary-foreground: 0 0% 100%;
  --secondary-hover:     345 40% 55%;

  --accent:              38 62% 90%;    /* #F5ECD7 Champagne */
  --accent-foreground:   280 47% 20%;   /* Plum on champagne */

  /* ─── Surfaces ──────────────────────────────────────── */
  --background:          30 25% 97%;    /* #F9F6F1 Warm off-white */
  --foreground:          280 20% 12%;   /* #1C1120 Near-black with plum cast */

  --card:                0 0% 100%;     /* Pure white */
  --card-foreground:     280 20% 12%;

  --muted:               38 30% 94%;    /* #F2EDE4 Warm gray */
  --muted-foreground:    280 10% 45%;   /* #6B6070 Warm gray text */

  --surface-raised:      38 50% 96%;    /* Slightly warm elevated surface */
  --surface-overlay:     280 47% 20% / 0.06; /* Plum tint overlay */

  /* ─── UI Chrome ─────────────────────────────────────── */
  --border:              38 30% 86%;    /* #DDD4C4 Warm border */
  --border-strong:       38 25% 75%;    /* Stronger warm border */
  --input:               38 30% 86%;
  --ring:                280 47% 20%;   /* Focus ring = primary */

  /* ─── Sidebar (App) ─────────────────────────────────── */
  --sidebar-background:  280 35% 14%;   /* #261030 Deep plum sidebar */
  --sidebar-foreground:  38 40% 88%;    /* Warm champagne text */
  --sidebar-muted:       280 20% 30%;   /* Muted sidebar items */
  --sidebar-active:      345 36% 61%;   /* Rose active state */
  --sidebar-border:      280 30% 22%;

  /* ─── Semantic ──────────────────────────────────────── */
  --destructive:         0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --success:             152 44% 28%;
  --success-foreground:  0 0% 100%;
  --warning:             38 92% 40%;
  --warning-foreground:  0 0% 100%;

  /* ─── Radius ────────────────────────────────────────── */
  --radius:              0.625rem;      /* 10px — rounded but not pill */
  --radius-sm:           0.375rem;      /* 6px */
  --radius-lg:           1rem;          /* 16px */
  --radius-xl:           1.5rem;        /* 24px — cards, modals */
  --radius-full:         9999px;        /* Pills, badges, avatars */
}
```

### 2.4 Dark Mode Token Map

```css
.dark {
  --background:          280 30% 7%;    /* #0F0A14 Deep plum-black */
  --foreground:          38 40% 92%;    /* #F0E8D8 Warm cream */

  --card:                280 25% 11%;   /* #160E1E Elevated dark surface */
  --card-foreground:     38 40% 92%;

  --muted:               280 20% 16%;   /* #211528 Muted dark */
  --muted-foreground:    280 10% 60%;   /* #9A8FA3 Muted text */

  --surface-raised:      280 22% 14%;

  --border:              280 20% 22%;   /* #2E1F3A Dark border */
  --border-strong:       280 20% 30%;
  --input:               280 20% 22%;

  --primary:             280 55% 65%;   /* #B87FD4 Lighter plum for dark mode */
  --primary-foreground:  280 47% 8%;    /* Dark text on light primary */
  --primary-hover:       280 55% 72%;

  --secondary:           345 40% 70%;   /* #D4899A Lighter rose */
  --secondary-foreground: 345 20% 10%;

  --accent:              38 35% 22%;    /* Dark champagne tint */
  --accent-foreground:   38 50% 85%;

  --sidebar-background:  280 35% 6%;    /* Nearly black plum */
  --sidebar-foreground:  38 35% 82%;
  --sidebar-muted:       280 15% 35%;
  --sidebar-active:      345 40% 70%;
  --sidebar-border:      280 25% 14%;

  --ring:                280 55% 65%;
}
```

### 2.5 WCAG Contrast Ratios

| Combination | Ratio | Pass Level |
|-------------|-------|-----------|
| `--foreground` on `--background` (light) | 14.2:1 | AAA |
| `--primary-foreground` on `--primary` (light) | 11.8:1 | AAA |
| `--muted-foreground` on `--muted` (light) | 5.1:1 | AA |
| `--foreground` on `--background` (dark) | 13.6:1 | AAA |
| Rose `#C4748A` on white | 3.2:1 | AA Large only — never use for body text |
| Plum `#3D1A4B` on champagne `#F5ECD7` | 9.4:1 | AAA |

> **Rule:** Rose is an accent color only. Never use it for body text or interactive labels. Always pair it with plum or dark foreground for text.

---

## 3. Typography System

### 3.1 Typeface Selection

#### Display: **Cormorant Garamond**
- **Google Fonts**: `https://fonts.google.com/specimen/Cormorant+Garamond`
- **License**: Open Font License (free, commercial use)
- **Weights to load**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) + Italics for 300, 400, 600
- **Why**: Cormorant Garamond is the 2026 choice for premium beauty editorial. It has extreme high-contrast thick-thin strokes, elegant ball terminals, and a historical depth that Playfair Display (now overused) no longer provides. At 48px+ it is breathtaking. It signals luxury without trying. It is used by high-end skincare brands (La Mer, Tatcha) and beauty editorial. It differentiates Aesthetica immediately from every competitor.
- **Use at**: Display, H1, H2, pull quotes, marketing hero text, course titles
- **Do NOT use at**: Below 24px, UI labels, form elements, navigation items

#### Body: **DM Sans**
- **Google Fonts**: `https://fonts.google.com/specimen/DM+Sans`
- **License**: Open Font License (free, commercial use)
- **Weights to load**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Why**: DM Sans is a humanist geometric sans-serif with a warm, approachable personality — significantly more distinctive than Inter while being equally readable. It has a slightly higher x-height than Inter, making it excellent for mobile reading. Its optical size behavior is excellent. It pairs beautifully with Cormorant Garamond because both have humanist roots but occupy completely different registers. DM Sans is used by premium digital products (Linear, Loom, Notion) but is not yet overused in the beauty/education space.
- **Use at**: All body text, UI labels, navigation, form elements, captions, data
- **Weights in use**: 400 for body, 500 for UI labels, 600 for subheadings and emphasis

#### Mono: **DM Mono**
- **Google Fonts**: `https://fonts.google.com/specimen/DM+Mono`
- **Weights**: 400, 500
- **Use at**: Code snippets (if any), data tables, timestamps, quiz answer keys

### 3.2 Type Scale

All values use `rem` with a 16px base. Line heights and letter-spacing are specified for each level.

```css
:root {
  /* ─── Font Families ─────────────────────────────────── */
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-body:    'DM Sans', 'system-ui', sans-serif;
  --font-mono:    'DM Mono', 'ui-monospace', monospace;

  /* ─── Type Scale ────────────────────────────────────── */

  /* Display — hero headlines, marketing splash */
  --text-display-2xl: 4.5rem;    /* 72px — hero only */
  --text-display-xl:  3.75rem;   /* 60px — section hero */
  --text-display-lg:  3rem;      /* 48px — page titles */

  /* Headings */
  --text-h1:  2.25rem;   /* 36px */
  --text-h2:  1.875rem;  /* 30px */
  --text-h3:  1.5rem;    /* 24px */
  --text-h4:  1.25rem;   /* 20px */

  /* Body */
  --text-body-lg:  1.125rem;  /* 18px */
  --text-body:     1rem;      /* 16px */
  --text-body-sm:  0.875rem;  /* 14px */

  /* Utility */
  --text-caption:  0.8125rem;  /* 13px */
  --text-label:    0.75rem;    /* 12px */
  --text-overline: 0.6875rem;  /* 11px — uppercase tracked labels */

  /* ─── Line Heights ──────────────────────────────────── */
  --leading-display:  1.1;    /* Tight for large display text */
  --leading-heading:  1.2;    /* Headings */
  --leading-snug:     1.35;   /* Subheadings */
  --leading-body:     1.65;   /* Body text — generous for readability */
  --leading-ui:       1.4;    /* UI elements */

  /* ─── Letter Spacing ────────────────────────────────── */
  --tracking-tighter: -0.03em;   /* Display sizes */
  --tracking-tight:   -0.01em;   /* H1, H2 */
  --tracking-normal:   0em;      /* Body */
  --tracking-wide:    +0.05em;   /* Labels, captions */
  --tracking-wider:   +0.12em;   /* Overlines, uppercase badges */
  --tracking-widest:  +0.2em;    /* All-caps UI labels */
}
```

### 3.3 Type Style Specifications

```
Display 2XL  — Cormorant Garamond 300, 72px/1.05, -0.03em — marketing hero only
Display XL   — Cormorant Garamond 400, 60px/1.08, -0.02em — section heroes
Display LG   — Cormorant Garamond 500, 48px/1.1,  -0.02em — page titles
H1           — Cormorant Garamond 600, 36px/1.2,  -0.01em
H2           — Cormorant Garamond 600, 30px/1.25, -0.01em
H3           — DM Sans 600,            24px/1.35,  0em
H4           — DM Sans 600,            20px/1.4,   0em
Body LG      — DM Sans 400,            18px/1.65,  0em
Body         — DM Sans 400,            16px/1.65,  0em
Body SM      — DM Sans 400,            14px/1.6,   0em
Caption      — DM Sans 400,            13px/1.5,  +0.01em
Label        — DM Sans 500,            12px/1.4,  +0.05em
Overline     — DM Sans 500,            11px/1.4,  +0.2em  UPPERCASE
```

> **Rule**: H1 and H2 use Cormorant Garamond. H3 and below use DM Sans. This creates a clear editorial/functional hierarchy. Never use Cormorant Garamond for UI chrome, labels, or navigation.

### 3.4 Next.js Font Loading

```typescript
// lib/fonts.ts
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'

export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

export const fontBody = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

export const fontMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})
```

---

## 4. Visual Language & Design Principles

### 4.1 Overall Aesthetic Direction

**Warm Editorial Luxury.** Every screen should feel like it was designed by someone who reads Allure, uses Tatcha, and takes their craft seriously. The interface is never cold, never clinical, never generic. It has texture — not literal texture, but visual warmth through color, typography weight contrast, and intentional white space.

### 4.2 Spacing System

Base unit: **4px (0.25rem)**. All spacing values are multiples of 4.

```
4px   = space-1   — Icon padding, micro gaps
8px   = space-2   — Tight component gaps
12px  = space-3   — Input padding, badge padding
16px  = space-4   — Standard component padding
20px  = space-5   — Card padding (mobile)
24px  = space-6   — Card padding (desktop), section gaps
32px  = space-8   — Section internal spacing
40px  = space-10  — Large component gaps
48px  = space-12  — Section padding (mobile)
64px  = space-16  — Section padding (desktop)
80px  = space-20  — Major section breaks
96px  = space-24  — Hero padding
128px = space-32  — Marketing section vertical rhythm
```

**Principle**: The app UI uses tighter spacing (space-4 to space-6). Marketing pages use generous spacing (space-16 to space-32). Never compress marketing pages — white space is a luxury signal.

### 4.3 Border Radius Strategy

Aesthetica uses a **soft-rounded** strategy. Not sharp (too corporate), not pill-everything (too playful). The radius increases with component size.

```
Micro (badges, tags):        4px  — var(--radius-sm)
Default (buttons, inputs):   10px — var(--radius)
Cards (course, lesson):      16px — var(--radius-lg)
Modals, drawers, large cards: 24px — var(--radius-xl)
Avatars, progress rings:     9999px — var(--radius-full)
```

### 4.4 Shadow / Elevation System

Shadows use warm-tinted drop shadows (plum-cast, not gray) to maintain palette coherence.

```css
:root {
  /* Warm plum-cast shadows */
  --shadow-xs:  0 1px 2px 0 hsl(280 30% 10% / 0.05);
  --shadow-sm:  0 1px 3px 0 hsl(280 30% 10% / 0.08),
                0 1px 2px -1px hsl(280 30% 10% / 0.06);
  --shadow-md:  0 4px 6px -1px hsl(280 30% 10% / 0.08),
                0 2px 4px -2px hsl(280 30% 10% / 0.05);
  --shadow-lg:  0 10px 15px -3px hsl(280 30% 10% / 0.10),
                0 4px 6px -4px hsl(280 30% 10% / 0.06);
  --shadow-xl:  0 20px 25px -5px hsl(280 30% 10% / 0.12),
                0 8px 10px -6px hsl(280 30% 10% / 0.06);

  /* Glow effect for CTAs and active states */
  --shadow-glow-primary: 0 0 0 3px hsl(280 47% 20% / 0.15);
  --shadow-glow-rose:    0 0 0 3px hsl(345 36% 61% / 0.20);
}
```

**Elevation levels:**
- `xs` — Subtle card lift, table rows on hover
- `sm` — Default card state
- `md` — Hovered cards, dropdowns
- `lg` — Modals, popovers
- `xl` — Drawers, full-screen overlays

### 4.5 Imagery Style

**Photography direction:**
- Warm, natural light — golden hour, studio soft-box
- Skin-forward: close-up skin texture, hands applying product, facial treatments
- Diverse representation: all skin tones, ages 18–35, predominantly female but inclusive
- **Never** use cold blue-tinted stock photography
- **Never** use cheesy "students at computers" stock imagery
- Prefer: real esthetics students in clinical settings, close-up technique shots, product flatlay

**Illustration / Iconography:**
- Use **Lucide React** exclusively for all UI icons
- Icon size: 16px (sm), 20px (default), 24px (lg) — always use `strokeWidth={1.5}` for elegance
- No filled icons — always stroke style for consistency with the premium feel
- For empty states and onboarding: use simple line illustrations in the brand palette (plum + rose + champagne)
- For achievement badges: custom SVG badge shapes with Lucide icons inside

**Gradients:**
- Use sparingly and intentionally
- Primary gradient: `linear-gradient(135deg, #3D1A4B 0%, #5C2D72 100%)` — plum depth
- Accent gradient: `linear-gradient(135deg, #C4748A 0%, #E8B4C0 100%)` — rose bloom
- Surface gradient: `linear-gradient(180deg, #F9F6F1 0%, #F5ECD7 100%)` — champagne wash
- **Never** use rainbow gradients, neon gradients, or purple-to-pink gradients

**Patterns / Textures:**
- Subtle noise texture overlay (3% opacity) on hero sections for tactile depth
- Thin line botanical motifs (single-weight SVG) as decorative elements on marketing pages
- No heavy textures, no gradients with more than 2 stops

### 4.6 Motion Philosophy

**Principle: Calm, purposeful motion.** Aesthetica is a focused learning environment. Animations should feel like a deep breath — smooth, unhurried, intentional.

```css
:root {
  /* Durations */
  --duration-instant:  100ms;  /* Micro feedback (checkbox check) */
  --duration-fast:     150ms;  /* Button hover, focus ring */
  --duration-normal:   250ms;  /* Most transitions */
  --duration-slow:     400ms;  /* Page transitions, modals */
  --duration-slower:   600ms;  /* Hero animations, onboarding */

  /* Easings */
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);    /* Elements entering */
  --ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1.0);  /* Elements leaving */
  --ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1);    /* Repositioning */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful spring — use for badges, achievements only */
  --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Default smooth */
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-fast:    0ms;
    --duration-normal:  0ms;
    --duration-slow:    0ms;
    --duration-slower:  0ms;
  }
}
```

**Animation patterns to use:**
- Fade + translateY(8px) for cards and content entering viewport
- Fade alone for overlays and modals
- Width animation for progress bars (ease-out, 600ms)
- Scale(0.95) → scale(1) for button press feedback
- Spring bounce only for achievement unlocks and completion celebrations

**Never use:**
- Spinning loaders on content (use skeleton screens instead)
- Bounce animations on navigation
- Parallax on the app dashboard (only on marketing pages, subtly)

---

## 5. Component Styling Guidelines

### 5.1 Buttons

#### Primary Button
```
Background:    hsl(var(--primary))           — Deep plum #3D1A4B
Text:          hsl(var(--primary-foreground)) — White
Border:        none
Border-radius: var(--radius)                  — 10px
Height:        40px (default), 36px (sm), 48px (lg)
Padding:       0 20px (default), 0 16px (sm), 0 24px (lg)
Font:          DM Sans 500, 14px, tracking +0.01em
Hover:         background → hsl(var(--primary-hover)) — #5C2D72, shadow-sm
Active:        scale(0.98), background darken 8%
Focus-visible: ring 2px + ring-offset 2px, ring = hsl(var(--ring))
Disabled:      opacity-40, cursor-not-allowed
Transition:    background 150ms ease-out, transform 100ms ease-out
```

#### Secondary Button
```
Background:    hsl(var(--secondary))          — Rose #C4748A
Text:          white
Border:        none
Hover:         background darken 8%, shadow-sm
Use for:       Secondary CTAs, "Start Lesson", "View Certificate"
```

#### Outline Button
```
Background:    transparent
Text:          hsl(var(--primary))
Border:        1.5px solid hsl(var(--primary))
Hover:         background → hsl(var(--primary) / 0.06)
Use for:       Tertiary actions, "Cancel", "View Details"
```

#### Ghost Button
```
Background:    transparent
Text:          hsl(var(--foreground))
Border:        none
Hover:         background → hsl(var(--muted))
Use for:       Navigation actions, icon buttons, "Back"
```

#### Destructive Button
```
Background:    hsl(var(--destructive))        — #C0392B
Text:          white
Hover:         background darken 10%
Use for:       Delete actions, unenroll, remove student
Always:        Require confirmation modal before executing
```

#### Icon Button
```
Size:          36px × 36px (default), 28px × 28px (sm)
Border-radius: var(--radius)
Icon:          Lucide, 18px, strokeWidth 1.5
Hover:         background → hsl(var(--muted))
```

### 5.2 Cards

#### Course Card (Marketing + Student Dashboard)
```
Background:    hsl(var(--card))
Border:        1px solid hsl(var(--border))
Border-radius: var(--radius-xl)               — 24px
Shadow:        var(--shadow-sm)
Hover:         shadow → var(--shadow-md), translateY(-2px)
Transition:    200ms ease-out

Layout:
  - Thumbnail: 16:9 ratio, border-radius top 24px, overflow hidden
  - Thumbnail overlay: gradient from transparent to hsl(var(--primary) / 0.3) on hover
  - Body: padding 20px
  - Category badge: top-left of thumbnail, pill shape
  - Title: H4 (DM Sans 600, 20px) — max 2 lines, line-clamp
  - Instructor: Caption + avatar (28px circle)
  - Progress bar: only on enrolled courses (bottom of card)
  - Footer: hours count + lesson count + price/enrolled status

Thumbnail placeholder:
  - Gradient: champagne to rose-light
  - Centered Lucide icon (BookOpen, 32px, plum)
```

#### Lesson Card (Inside Course View)
```
Background:    hsl(var(--card))
Border:        1px solid hsl(var(--border))
Border-radius: var(--radius-lg)               — 16px
Shadow:        none (flat in list context)
Hover:         background → hsl(var(--muted)), border-color → hsl(var(--border-strong))

Layout (horizontal):
  - Left: lesson number (Cormorant Garamond 600, 24px, plum) — 48px wide
  - Center: title (DM Sans 500, 16px) + duration (caption, muted)
  - Right: status icon (CheckCircle2 for complete, PlayCircle for current, Lock for locked)
  - Completed: title color → muted-foreground, left number → sage

Active lesson:
  - Border-left: 3px solid hsl(var(--secondary))  — Rose accent
  - Background: hsl(var(--accent))                 — Champagne tint
```

#### Progress Card (Dashboard Widget)
```
Background:    linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-hover)) 100%)
Text:          white
Border-radius: var(--radius-xl)
Padding:       24px
Shadow:        var(--shadow-lg)

Content:
  - Large percentage (Cormorant Garamond 700, 48px)
  - Label (DM Sans 400, 14px, white/70)
  - Circular progress ring (SVG, 80px)
  - Sub-stats row: lessons completed, hours logged
```

#### Stat Card (Instructor/Admin)
```
Background:    hsl(var(--card))
Border:        1px solid hsl(var(--border))
Border-radius: var(--radius-lg)
Padding:       20px 24px
Shadow:        var(--shadow-xs)

Content:
  - Icon: Lucide 20px, in a 40px × 40px rounded-lg container
    - Icon container bg: hsl(var(--accent)) for neutral, sage-light for success
  - Value: H2 (Cormorant Garamond 600, 30px)
  - Label: Caption, muted-foreground
  - Trend: small badge (↑ 12%) in success or destructive color
```

### 5.3 Navigation

#### App Sidebar (Authenticated)
```
Width:         240px (expanded), 64px (collapsed)
Background:    hsl(var(--sidebar-background))   — Deep plum #261030
Transition:    width 250ms ease-inout

Header:
  - Logo: Aesthetica wordmark, champagne color, 20px Cormorant Garamond
  - Collapse toggle: ghost icon button, right-aligned

Nav Items:
  - Height: 44px
  - Padding: 0 12px
  - Border-radius: var(--radius)
  - Icon: Lucide 20px, strokeWidth 1.5, sidebar-muted color
  - Label: DM Sans 500, 14px, sidebar-foreground
  - Hover: background → hsl(var(--sidebar-muted))
  - Active: background → hsl(var(--secondary) / 0.15), 
            icon + text → hsl(var(--sidebar-active))  — Rose
            left border: 3px solid hsl(var(--sidebar-active))

Section labels:
  - DM Sans 500, 11px, UPPERCASE, tracking +0.2em
  - Color: sidebar-muted
  - Margin-top: 24px

Bottom section:
  - User avatar + name + role badge
  - Settings and logout icons
```

#### Marketing Top Navigation
```
Background:    transparent (scrolled: hsl(var(--background) / 0.92) + backdrop-blur-md)
Height:        72px
Border-bottom: 1px solid transparent (scrolled: hsl(var(--border)))
Transition:    background 200ms, border 200ms

Logo:          Left-aligned, Cormorant Garamond wordmark
Nav links:     Center, DM Sans 500, 15px, foreground
               Hover: color → hsl(var(--primary))
               Active: color → hsl(var(--primary)), underline 2px rose
CTA buttons:   Right — "Log In" (ghost) + "Get Started" (primary)

Mobile:        Hamburger → Sheet drawer from right
               Sheet: full-height, background hsl(var(--sidebar-background))
               Links: large, DM Sans 500, 18px, champagne
```

### 5.4 Forms

#### Text Input
```
Height:        44px
Background:    hsl(var(--background))
Border:        1.5px solid hsl(var(--border))
Border-radius: var(--radius)
Padding:       0 14px
Font:          DM Sans 400, 15px
Color:         hsl(var(--foreground))
Placeholder:   hsl(var(--muted-foreground))

Focus:
  border-color: hsl(var(--primary))
  box-shadow:   0 0 0 3px hsl(var(--primary) / 0.12)
  outline:      none

Error state:
  border-color: hsl(var(--destructive))
  box-shadow:   0 0 0 3px hsl(var(--destructive) / 0.10)

Disabled:
  background:   hsl(var(--muted))
  opacity:      0.6
  cursor:       not-allowed

With icon (left):
  padding-left: 40px
  Icon: Lucide 16px, muted-foreground, absolute left 12px
```

#### Select
```
Same dimensions as Text Input
Right icon:    ChevronDown (Lucide 16px), muted-foreground
Dropdown:      border-radius var(--radius-lg), shadow-lg
               Item height: 40px, padding 0 12px
               Hover: background hsl(var(--muted))
               Selected: background hsl(var(--accent)), 
                         text hsl(var(--primary)), 
                         CheckIcon right
```

#### Checkbox
```
Size:          18px × 18px
Border:        1.5px solid hsl(var(--border-strong))
Border-radius: 4px
Checked:       background hsl(var(--primary)), border hsl(var(--primary))
               Check icon: white, Lucide Check 12px
Hover:         border-color hsl(var(--primary))
Focus:         ring 2px, ring-offset 2px
Label:         DM Sans 400, 14px, margin-left 8px
```

#### Radio
```
Size:          18px × 18px
Border-radius: full (circle)
Checked:       outer ring hsl(var(--primary)), inner dot 8px hsl(var(--primary))
Transition:    scale spring 150ms on check
```

#### Form Labels
```
Font:          DM Sans 500, 13px
Color:         hsl(var(--foreground))
Margin-bottom: 6px
Required mark: rose color (*), margin-left 2px

Helper text:   DM Sans 400, 12px, muted-foreground, margin-top 4px
Error text:    DM Sans 400, 12px, destructive color, margin-top 4px
               Prepend: AlertCircle Lucide icon 12px
```

### 5.5 Video Player Container

```
Container:
  border-radius: var(--radius-xl)
  overflow:      hidden
  background:    #000
  aspect-ratio:  16/9
  shadow:        var(--shadow-xl)
  position:      relative

Custom controls bar (bottom):
  background:    linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)
  height:        56px
  padding:       0 16px
  position:      absolute, bottom 0

  Progress scrubber:
    height:      3px → 5px on hover
    background:  hsl(var(--muted) / 0.4)
    filled:      hsl(var(--secondary))  — Rose
    thumb:       12px circle, rose, appears on hover
    transition:  height 150ms ease-out

  Controls: Play/Pause, Skip±10s, Volume, Speed, Fullscreen
  Icons: Lucide, 20px, white, strokeWidth 1.5
  Time: DM Mono 400, 13px, white/80

Chapter markers:
  Small rose dots on the scrubber at chapter timestamps
  Tooltip on hover: chapter title, DM Sans 400, 12px

Loading state:
  Skeleton shimmer in champagne tones
  Centered Lucide Loader2 icon, spinning, rose color
```

### 5.6 Progress Bars & Completion Indicators

#### Linear Progress Bar
```
Track:         hsl(var(--muted)), height 6px, border-radius full
Fill:          hsl(var(--secondary)) for in-progress (rose)
               hsl(var(--success)) for completed (sage)
Transition:    width 600ms ease-out

Label above:   DM Sans 500, 13px — "Module 3 of 8"
Percentage:    DM Sans 600, 13px, primary — right-aligned
```

#### Circular Progress Ring
```
SVG-based, stroke-dasharray animation
Track stroke:  hsl(var(--muted))
Fill stroke:   hsl(var(--secondary)) gradient → hsl(var(--primary))
Stroke-width:  6px (small: 80px), 8px (large: 120px)
Center text:   Cormorant Garamond 600, percentage value
               DM Sans 400, 11px, "complete" label
```

#### Lesson Completion Checkmark
```
Size:          24px circle
Incomplete:    border 1.5px hsl(var(--border-strong)), transparent bg
In-progress:   border 1.5px hsl(var(--secondary)), bg hsl(var(--secondary) / 0.1)
               Half-filled arc animation
Complete:      bg hsl(var(--success)), CheckIcon white 14px
               Entry animation: scale spring from 0.5 → 1.0, 300ms
```

#### Hour Tracker (Virginia State Compliance)
```
This is a critical UI element for VA state licensing.
Display prominently in student dashboard.

Card layout:
  - Large hour count: Cormorant Garamond 700, 48px, primary
  - "/ 260 hours required" in DM Sans 400, 16px, muted
  - Segmented progress bar showing theory vs. practical hours
  - Theory: plum fill
  - Practical: rose fill
  - Warning threshold at 80%: warning color pulse animation
  - Completion: celebration animation (confetti in brand colors)
```

### 5.7 Badges & Achievement Indicators

#### Category Badge (Course Cards)
```
Height:        24px
Padding:       0 10px
Border-radius: var(--radius-full)
Font:          DM Sans 600, 11px, UPPERCASE, tracking +0.1em
Background:    hsl(var(--accent))
Color:         hsl(var(--primary))
Border:        1px solid hsl(var(--champagne-deep))
```

#### Status Badge
```
Variants:
  enrolled:    bg sage-light, text sage-dark, "Enrolled"
  in-progress: bg rose-light, text rose-dark, "In Progress"
  completed:   bg sage-light, text success, CheckIcon + "Complete"
  locked:      bg muted, text muted-foreground, LockIcon + "Locked"
  new:         bg primary, text white, "New"

Height:        22px
Padding:       0 8px
Border-radius: var(--radius-full)
Font:          DM Sans 600, 11px
Icon:          Lucide 12px, left of text, gap 4px
```

#### Achievement Badge (Gamification)
```
Shape:         Hexagonal SVG or shield SVG (custom, not emoji)
Size:          64px × 64px (display), 40px × 40px (inline)
Background:    Gradient — plum to rose for earned, muted for locked
Icon inside:   Lucide 24px, white (earned) or muted-foreground (locked)
Border:        2px, earned: rose, locked: border-strong
Shadow:        earned: var(--shadow-glow-rose)

Unlock animation:
  scale(0) → scale(1.1) → scale(1), spring 400ms
  Followed by: subtle shimmer sweep animation
  Confetti burst: 12 particles in brand colors, 600ms

Labels:
  Title: DM Sans 600, 12px
  Description: DM Sans 400, 11px, muted
```

### 5.8 Modals & Drawers

#### Modal (Dialog)
```
Overlay:       hsl(var(--primary) / 0.4) + backdrop-blur-sm
               — Warm plum tint, not cold gray

Container:
  background:  hsl(var(--card))
  border-radius: var(--radius-xl)           — 24px
  shadow:      var(--shadow-xl)
  max-width:   480px (sm), 640px (md), 800px (lg)
  padding:     32px

Header:
  title:       H3 (DM Sans 600, 24px)
  close button: ghost icon, X (Lucide), top-right
  optional:    subtitle in muted-foreground, body-sm

Footer:
  border-top:  1px solid hsl(var(--border))
  padding-top: 20px
  actions:     right-aligned, gap 8px
  order:       Cancel (outline) → Confirm (primary)

Entry animation:
  overlay:    fade in 200ms
  container:  fade + scale(0.96) → scale(1), 250ms ease-out
Exit:
  container:  fade + scale(1) → scale(0.96), 200ms ease-in
  overlay:    fade out 200ms
```

#### Drawer (Side Sheet)
```
Side:          Right (default), Bottom (mobile confirmation)
Width:         400px (sm), 520px (md)
Background:    hsl(var(--card))
Shadow:        var(--shadow-xl)
Border-radius: 24px 0 0 24px (right drawer)
               24px 24px 0 0 (bottom sheet)

Header:
  padding:     24px 24px 16px
  title:       H3, DM Sans 600
  close:       X icon, ghost button

Content:
  padding:     0 24px
  overflow-y:  auto
  scrollbar:   thin, plum-tinted thumb

Entry animation:
  translateX(100%) → translateX(0), 300ms ease-out (right)
  translateY(100%) → translateY(0), 300ms ease-out (bottom)
```

---

## 6. Marketing Pages Visual Direction

### 6.1 Overall Feel

**Warm editorial luxury meets modern SaaS clarity.** The marketing site should feel like the intersection of a premium beauty brand's website and a modern product landing page. Think: Tatcha.com's warmth + Linear.app's clarity.

**Key principles:**
- Generous white space — never cramped
- Large Cormorant Garamond display headlines
- Full-bleed champagne/warm sections alternating with white
- Photography is the hero — no generic illustrations
- One strong CTA per section

### 6.2 Hero Section

```
Layout:        Two-column, 55/45 split (text left, visual right)
               Mobile: stacked, visual below

Background:    hsl(var(--background)) — warm off-white
               Optional: subtle noise texture overlay at 2% opacity

Left column:
  Overline:    DM Sans 500, 11px, UPPERCASE, +0.2em tracking, rose color
               "Virginia State-Qualified Esthetics Education"
  Headline:    Cormorant Garamond 300, 72px/1.05, -0.03em
               "Learn to glow."
               Second line: Cormorant Garamond 600 italic — brand name emphasis
  Subhead:     DM Sans 400, 18px/1.65, muted-foreground
               2–3 sentences max
  CTAs:        Primary "Start Learning" + Ghost "See Curriculum"
               Gap: 12px, flex-row
  Social proof: 5-star rating + "Trusted by 2,400+ VA students"
               DM Sans 400, 14px, muted

Right column:
  Main image:  Rounded-xl (24px), warm-lit esthetics student
  Floating card: Course completion card, shadow-xl, slight rotation (-2deg)
               Positioned bottom-left, overlapping main image
  Accent dot:  Rose-colored circle, 12px, top-right of image

Entry animation:
  Left: fade + translateX(-20px), 600ms ease-out
  Right: fade + translateX(20px), 700ms ease-out, 100ms delay
  Floating card: fade + translateY(10px), 800ms ease-out, 200ms delay
```

### 6.3 Feature Sections

**Section 1 — "Built for Virginia"** (State compliance focus)
```
Background:    hsl(var(--accent)) — Champagne wash
Layout:        Centered, max-width 800px
Headline:      Cormorant Garamond 500, 48px — centered
Feature grid:  3-column, icon cards
               Icon: Lucide 24px in 48px plum-tinted circle
               Title: DM Sans 600, 18px
               Body: DM Sans 400, 15px, muted
```

**Section 2 — "How It Works"** (3-step process)
```
Background:    white
Layout:        Horizontal steps with connecting line
Step numbers:  Cormorant Garamond 700, 64px, plum/10 opacity — decorative
Step title:    DM Sans 600, 20px
Step body:     DM Sans 400, 15px, muted
Connector:     1px dashed hsl(var(--border)), between steps
```

**Section 3 — Course Showcase**
```
Background:    hsl(var(--background))
Headline:      Cormorant Garamond 600, 36px
Layout:        Horizontal scroll on mobile, 3-column grid on desktop
Cards:         Course cards (spec above)
CTA:           "Browse All Courses" — outline button, centered below grid
```

**Section 4 — Testimonials**
```
Background:    hsl(var(--primary)) — Deep plum
Text:          Champagne/white
Layout:        Large single quote, centered, with student photo
Quote:         Cormorant Garamond 300 italic, 32px/1.4
Attribution:   DM Sans 500, 14px, rose color
Navigation:    Dot indicators, rose active
```

**Section 5 — Pricing**
```
Background:    white
Headline:      Cormorant Garamond 600, 36px, centered
Cards:         2–3 pricing tiers
               Recommended tier: border 2px solid hsl(var(--secondary)), 
                                  shadow-lg, slight scale(1.02)
               "Most Popular" badge: rose pill, top-center
Price:         Cormorant Garamond 700, 48px, primary
Period:        DM Sans 400, 16px, muted
Features list: CheckCircle2 icon (sage), DM Sans 400, 14px
CTA:           Primary button, full-width
```

### 6.4 Footer
```
Background:    hsl(280 35% 10%)  — Near-black plum
Text:          Champagne/muted
Logo:          Cormorant Garamond wordmark, champagne
Layout:        4-column grid (logo+tagline, links, links, contact)
Links:         DM Sans 400, 14px, sidebar-muted → hover sidebar-foreground
Bottom bar:    1px border-top sidebar-border, copyright + legal links
```

---

## 7. App UI Principles

### 7.1 What Makes Aesthetica's App Modern

The authenticated app experience must feel like a **premium productivity tool designed for beauty professionals** — not a repurposed academic LMS. Here is what differentiates it from Milady CIMA and Canvas:

| Dimension | Milady CIMA / Canvas | Aesthetica |
|-----------|---------------------|------------|
| Color | Orange/gray institutional | Warm plum + champagne |
| Typography | System fonts, small, cramped | Cormorant + DM Sans, generous |
| Navigation | Horizontal tabs, nested menus | Clean left sidebar, flat hierarchy |
| Progress | Percentage text only | Visual rings, bars, celebration |
| Video | Basic HTML5 player | Custom-styled, chapter-aware |
| Feedback | Alert boxes | Toast notifications, inline validation |
| Empty states | "No data found" text | Illustrated, encouraging, actionable |
| Loading | Spinners | Skeleton screens in brand palette |

### 7.2 Dashboard Layout

```
Layout:        Fixed sidebar (240px) + main content area
               Mobile: bottom tab bar (5 items max) + drawer

Main content:
  max-width:   1200px (centered in content area)
  padding:     32px 40px (desktop), 16px (mobile)

Page header:
  Greeting:    "Good morning, [Name]." — Cormorant Garamond 500, 30px
  Date/context: DM Sans 400, 14px, muted
  Quick actions: right-aligned icon buttons

Content grid:
  Dashboard:   Bento-style — mixed card sizes on a 12-column grid
               Large progress card (4 col), stat cards (2 col each),
               course list (8 col), announcements (4 col)
```

### 7.3 Course View Layout

```
Layout:        Left panel (course outline, 320px) + main video/content area
               Mobile: outline collapses to bottom sheet

Video area:
  Full-width in content area, 16:9
  Below video: lesson title (H2, Cormorant), instructor info, description

Outline panel:
  background:  hsl(var(--muted))
  border-right: 1px solid hsl(var(--border))
  Module headers: DM Sans 600, 13px, UPPERCASE, tracked
  Lesson items:  spec above (lesson card)
  Progress:      module-level progress bar, thin, rose
```

### 7.4 Quiz / Assessment UI

```
Question card:
  background:  hsl(var(--card))
  border-radius: var(--radius-xl)
  shadow:      var(--shadow-md)
  padding:     32px

Question number: Overline style, rose color
Question text:   H3 (DM Sans 600, 24px)
Answer options:  Radio cards — full-width, 56px height, 
                 border 1.5px, rounded-lg
                 Selected: border hsl(var(--primary)), 
                           bg hsl(var(--accent))
                 Correct (revealed): border success, bg success-bg,
                                     CheckCircle2 icon right
                 Incorrect (revealed): border destructive, bg error-bg,
                                       XCircle icon right

Progress bar:    Top of page, thin, rose, "Question 4 of 20"
Timer (if timed): Top-right, DM Mono, warning color when <30s
Submit button:   Primary, full-width on mobile, right-aligned desktop
```

### 7.5 Toast Notifications

```
Position:      Bottom-right (desktop), bottom-center (mobile)
Width:         360px
Border-radius: var(--radius-lg)
Shadow:        var(--shadow-lg)
Padding:       16px

Variants:
  default:   bg card, border border
  success:   bg success-bg, border success, icon CheckCircle2 sage
  error:     bg error-bg, border destructive, icon AlertCircle
  warning:   bg warning-bg, border warning, icon AlertTriangle

Title:         DM Sans 600, 14px
Body:          DM Sans 400, 13px, muted-foreground
Close:         X icon, ghost, 20px, top-right
Action link:   DM Sans 500, 13px, primary color, underline

Entry:         translateY(100%) → translateY(0), 250ms ease-out
Exit:          fade + translateX(20px), 200ms ease-in
Stack:         Multiple toasts stack with 8px gap, older ones scale down
```

### 7.6 Empty States

```
Container:     Centered in available space, max-width 400px
Illustration:  Simple line SVG in brand palette (plum + rose + champagne)
               60px × 60px, centered
Title:         DM Sans 600, 18px, centered
Body:          DM Sans 400, 14px, muted-foreground, centered, max-width 280px
CTA:           Primary or outline button, centered

Examples:
  No courses enrolled:  BookOpen illustration, "Start your journey"
  No grades yet:        BarChart2, "Complete a quiz to see your grades"
  No students (instructor): Users, "Share your enrollment link"
```

### 7.7 Skeleton Loading Screens

```
Color:         hsl(var(--muted)) base, hsl(var(--border)) shimmer
Animation:     shimmer sweep, 1.5s linear infinite
               background: linear-gradient(90deg, 
                 hsl(var(--muted)) 25%, 
                 hsl(var(--border)) 50%, 
                 hsl(var(--muted)) 75%)
               background-size: 200% 100%

Course card skeleton:
  - 16:9 rectangle (thumbnail)
  - 3 lines (title, instructor, meta)
  - Progress bar strip

Dashboard skeleton:
  - Match exact layout of real content
  - Never use a generic spinner on page load
```

---

## 8. Dark Mode Approach

### 8.1 Philosophy

Dark mode on Aesthetica is **not an inverted light mode**. It is a distinct visual experience — a **deep plum night** that feels like studying in a candlelit studio. The sidebar, which is already dark plum in light mode, becomes nearly black. The content area shifts to a rich dark surface that maintains warmth through the plum-cast backgrounds.

### 8.2 Mode Switching

```typescript
// Use next-themes for system preference + manual toggle
// Toggle: Moon/Sun Lucide icons, ghost button in sidebar footer
// Transition: 200ms ease-inout on background-color, color, border-color
// CSS: transition: background-color 200ms, color 200ms, border-color 200ms;
// Apply to: html element, not individual components
```

### 8.3 Dark Mode Specific Rules

1. **Images**: Add a subtle `brightness(0.9)` filter to photography in dark mode — raw bright images feel jarring on dark backgrounds

2. **Shadows**: Reduce shadow opacity by 50% in dark mode — shadows are less visible and can look muddy. Use subtle glows instead:
   ```css
   .dark .card { box-shadow: 0 0 0 1px hsl(var(--border)); }
   ```

3. **Gradients**: The champagne gradient surfaces become deep plum gradient surfaces in dark mode. Never use light gradients on dark backgrounds.

4. **Progress bars**: Rose fill remains rose in dark mode (it pops well on dark). Sage fill lightens slightly.

5. **Cormorant Garamond in dark mode**: The thin strokes of Cormorant Garamond render beautifully on dark backgrounds at display sizes. Slightly increase font-weight by one step for H1/H2 in dark mode to compensate for perceived thinning:
   ```css
   .dark h1, .dark h2 { font-weight: 600; } /* vs 500 in light */
   ```

6. **Focus rings**: Use `hsl(var(--ring) / 0.5)` in dark mode — the full-opacity plum ring is too harsh on dark backgrounds.

7. **Sidebar in dark mode**: The sidebar barely changes — it was already dark. Slightly lighten the active state rose for better contrast.

---

## 9. Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border:      'hsl(var(--border))',
        'border-strong': 'hsl(var(--border-strong))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover:      'hsl(var(--primary-hover))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          DEFAULT:    'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT:    'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        sidebar: {
          background: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          muted:      'hsl(var(--sidebar-muted))',
          active:     'hsl(var(--sidebar-active))',
          border:     'hsl(var(--sidebar-border))',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem',     { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h1':          ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'h2':          ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h3':          ['1.5rem',   { lineHeight: '1.35', letterSpacing: '0em'     }],
        'h4':          ['1.25rem',  { lineHeight: '1.4',  letterSpacing: '0em'     }],
        'body-lg':     ['1.125rem', { lineHeight: '1.65', letterSpacing: '0em'     }],
        'body':        ['1rem',     { lineHeight: '1.65', letterSpacing: '0em'     }],
        'body-sm':     ['0.875rem', { lineHeight: '1.6',  letterSpacing: '0em'     }],
        'caption':     ['0.8125rem',{ lineHeight: '1.5',  letterSpacing: '0.01em'  }],
        'label':       ['0.75rem',  { lineHeight: '1.4',  letterSpacing: '0.05em'  }],
        'overline':    ['0.6875rem',{ lineHeight: '1.4',  letterSpacing: '0.2em'   }],
      },
      borderRadius: {
        sm:   'var(--radius-sm)',   /* 6px  */
        DEFAULT: 'var(--radius)',   /* 10px */
        lg:   'var(--radius-lg)',   /* 16px */
        xl:   'var(--radius-xl)',   /* 24px */
        full: 'var(--radius-full)', /* 9999px */
      },
      boxShadow: {
        xs:           'var(--shadow-xs)',
        sm:           'var(--shadow-sm)',
        md:           'var(--shadow-md)',
        lg:           'var(--shadow-lg)',
        xl:           'var(--shadow-xl)',
        'glow-primary': 'var(--shadow-glow-primary)',
        'glow-rose':    'var(--shadow-glow-rose)',
      },
      spacing: {
        '18': '4.5rem',   /* 72px */
        '22': '5.5rem',   /* 88px */
        '26': '6.5rem',   /* 104px */
        '30': '7.5rem',   /* 120px */
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-bottom': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'progress-fill': {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--progress-value)' },
        },
        'badge-pop': {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '60%':  { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'fade-up':        'fade-up 0.5s cubic-bezier(0.0, 0.0, 0.2, 1)',
        'fade-in':        'fade-in 0.25s ease-out',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.0, 0.0, 0.2, 1)',
        'slide-in-bottom':'slide-in-bottom 0.3s cubic-bezier(0.0, 0.0, 0.2, 1)',
        'shimmer':        'shimmer 2s linear infinite',
        'badge-pop':      'badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-ring':     'pulse-ring 1.5s ease-out infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

---

## 10. shadcn/ui Theme Configuration

```css
/* globals.css — paste at top, after @tailwind directives */

@layer base {
  :root {
    --background:          30 25% 97%;
    --foreground:          280 20% 12%;
    --card:                0 0% 100%;
    --card-foreground:     280 20% 12%;
    --popover:             0 0% 100%;
    --popover-foreground:  280 20% 12%;
    --primary:             280 47% 20%;
    --primary-foreground:  0 0% 100%;
    --secondary:           345 36% 61%;
    --secondary-foreground: 0 0% 100%;
    --muted:               38 30% 94%;
    --muted-foreground:    280 10% 45%;
    --accent:              38 62% 90%;
    --accent-foreground:   280 47% 20%;
    --destructive:         0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border:              38 30% 86%;
    --input:               38 30% 86%;
    --ring:                280 47% 20%;
    --radius:              0.625rem;

    /* Extended tokens */
    --border-strong:       38 25% 75%;
    --surface-raised:      38 50% 96%;
    --primary-hover:       280 43% 31%;
    --success:             152 44% 28%;
    --success-foreground:  0 0% 100%;
    --warning:             38 92% 40%;
    --warning-foreground:  0 0% 100%;
    --radius-sm:           0.375rem;
    --radius-lg:           1rem;
    --radius-xl:           1.5rem;
    --radius-full:         9999px;
    --sidebar-background:  280 35% 14%;
    --sidebar-foreground:  38 40% 88%;
    --sidebar-muted:       280 20% 30%;
    --sidebar-active:      345 36% 61%;
    --sidebar-border:      280 30% 22%;
    --shadow-xs:           0 1px 2px 0 hsl(280 30% 10% / 0.05);
    --shadow-sm:           0 1px 3px 0 hsl(280 30% 10% / 0.08), 0 1px 2px -1px hsl(280 30% 10% / 0.06);
    --shadow-md:           0 4px 6px -1px hsl(280 30% 10% / 0.08), 0 2px 4px -2px hsl(280 30% 10% / 0.05);
    --shadow-lg:           0 10px 15px -3px hsl(280 30% 10% / 0.10), 0 4px 6px -4px hsl(280 30% 10% / 0.06);
    --shadow-xl:           0 20px 25px -5px hsl(280 30% 10% / 0.12), 0 8px 10px -6px hsl(280 30% 10% / 0.06);
    --shadow-glow-primary: 0 0 0 3px hsl(280 47% 20% / 0.15);
    --shadow-glow-rose:    0 0 0 3px hsl(345 36% 61% / 0.20);
  }

  .dark {
    --background:          280 30% 7%;
    --foreground:          38 40% 92%;
    --card:                280 25% 11%;
    --card-foreground:     38 40% 92%;
    --popover:             280 25% 11%;
    --popover-foreground:  38 40% 92%;
    --primary:             280 55% 65%;
    --primary-foreground:  280 47% 8%;
    --secondary:           345 40% 70%;
    --secondary-foreground: 345 20% 10%;
    --muted:               280 20% 16%;
    --muted-foreground:    280 10% 60%;
    --accent:              38 35% 22%;
    --accent-foreground:   38 50% 85%;
    --destructive:         0 62% 60%;
    --destructive-foreground: 0 0% 100%;
    --border:              280 20% 22%;
    --input:               280 20% 22%;
    --ring:                280 55% 65%;
    --border-strong:       280 20% 30%;
    --surface-raised:      280 22% 14%;
    --primary-hover:       280 55% 72%;
    --success:             152 40% 55%;
    --sidebar-background:  280 35% 6%;
    --sidebar-foreground:  38 35% 82%;
    --sidebar-muted:       280 15% 35%;
    --sidebar-active:      345 40% 70%;
    --sidebar-border:      280 25% 14%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-body antialiased;
    font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
  }

  h1, h2 {
    @apply font-display;
  }

  h3, h4, h5, h6 {
    @apply font-body;
  }

  /* Smooth color transitions for dark mode toggle */
  html {
    transition: background-color 200ms ease, color 200ms ease;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: hsl(var(--border-strong));
    border-radius: 9999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground));
  }
}
```

---

## 11. Implementation Checklist for FE Engineer

Before marking any page complete, verify:

### Typography
- [ ] Cormorant Garamond loaded via `next/font/google` with correct weights
- [ ] DM Sans loaded via `next/font/google` with correct weights
- [ ] Font variables applied to `html` element
- [ ] H1/H2 render in Cormorant Garamond; H3+ in DM Sans
- [ ] No fallback to Inter, Roboto, or Arial as primary fonts

### Color
- [ ] All CSS custom properties defined in `globals.css`
- [ ] Dark mode tokens complete and tested
- [ ] Rose (`--secondary`) never used for body text
- [ ] All text passes WCAG AA contrast minimum

### Components
- [ ] All Lucide icons use `strokeWidth={1.5}`
- [ ] No emoji used as structural icons
- [ ] Focus-visible rings present on all interactive elements
- [ ] Hover/active states implemented on all buttons and cards
- [ ] `prefers-reduced-motion` respected — all animations disabled

### Responsive
- [ ] Marketing pages tested at 375px, 768px, 1280px, 1440px
- [ ] App dashboard tested at 375px (bottom nav), 768px (collapsed sidebar), 1024px+
- [ ] Touch targets minimum 44px × 44px on mobile
- [ ] No horizontal scroll on any viewport

### Performance
- [ ] Fonts use `display: swap`
- [ ] Images have explicit `width` and `height` to prevent CLS
- [ ] Skeleton screens used for all async content (no spinners on page load)
- [ ] Animations use `transform` and `opacity` only (no layout-triggering properties)

---

*Document version 1.0 — Aesthetica UI Design Specification — March 2026*
*Prepared for implementation with Next.js 15, Tailwind CSS 3.4+, shadcn/ui, Lucide React*
