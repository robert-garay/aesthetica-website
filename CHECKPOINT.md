# CHECKPOINT: Aesthetica

## Project Info
- **Product**: Aesthetica — VA State-Qualified Aesthetic Learning Portal
- **Tagline**: "Learn to glow."
- **Repo**: github.com/robert-garay/aesthetica-website
- **Vercel**: pending
- **Phase**: Marketing implementation in progress
- **Last Updated**: 2026-03-30

## Architecture
- Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + shadcn/ui
- pnpm package manager
- Route groups: `(marketing)`, `(auth)`, `(portal)`
- Database: PostgreSQL via Supabase + Prisma ORM (not yet configured)
- Auth: NextAuth.js v5 (not yet configured)
- Video: Mux (not yet configured)
- Payments: Stripe (not yet configured)

## Recent Changes
- **2026-03-30**: Rebuilt `/` as full Apple-inspired marketing landing page with hero, stats bar, bento features, how-it-works, CTA, and footer.
- **2026-03-30**: Added fixed frosted-glass `MarketingNav` with mobile fullscreen menu and scroll-state behavior.
- **2026-03-30**: Added reusable `AnimateIn` intersection observer component for subtle fade + translateY reveal animations.
- **2026-03-30**: Updated global design tokens to Apple-style near-white/near-black palette with restrained shadows and 1rem base radius.

## File Structure
```
src/
├── app/
│   ├── (marketing)/     # Public pages (layout with shared marketing nav/footer)
│   ├── (auth)/          # sign-in, sign-up, forgot-password
│   ├── (portal)/        # Authenticated app (dashboard, courses, hours, skills, forums, messages)
│   ├── api/             # Route handlers (auth, webhooks)
│   ├── layout.tsx       # Root layout with fonts + metadata
│   ├── page.tsx         # Production marketing landing page (/)
│   ├── not-found.tsx    # 404 page
│   ├── sitemap.ts       # Dynamic sitemap
│   └── robots.ts        # robots.txt
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # Header, sidebar, footer, bottom nav
│   ├── marketing/       # Marketing nav/footer + landing section composition
│   ├── lms/             # Course player, assessments, progress, forums, messaging, gradebook, skills
│   └── shared/          # Empty states, data tables, skeletons
├── lib/
│   ├── fonts.ts         # Cormorant Garamond + DM Sans + DM Mono
│   ├── utils.ts         # cn() helper
│   └── validators/      # Zod schemas
├── actions/             # Server Actions by domain
├── hooks/               # Custom React hooks
├── types/               # TypeScript types
└── emails/              # React Email templates
```

## Design System
- **Primary**: Deep Plum `#3D1A4B` (oklch 0.278 0.112 295)
- **Secondary**: Rose `#C4748A` (oklch 0.634 0.087 345)
- **Accent**: Champagne `#F5ECD7`
- **Background**: Warm off-white `#F9F6F1`
- **Font Display**: Cormorant Garamond (h1, h2, marketing headlines)
- **Font Body**: DM Sans (all UI text)
- **Dark mode**: Full support via `.dark` class + next-themes

## Implemented Pages
| Page | Route | Status |
|------|-------|--------|
| Landing (marketing) | / | done |
| 404 | /not-found | done |
| Sign In | /sign-in | scaffold only |
| Sign Up | /sign-up | scaffold only |
| Dashboard | /dashboard | scaffold only |

## New / Updated Files
- `src/app/page.tsx` — complete Apple-style marketing landing page implementation.
- `src/components/marketing/nav.tsx` — frosted scroll-aware nav with mobile overlay menu.
- `src/components/marketing/footer.tsx` — marketing footer with brand/legal/utility links.
- `src/components/shared/animate-in.tsx` — lightweight intersection observer reveal wrapper.
- `src/app/(marketing)/layout.tsx` — shared marketing layout wrapper for grouped routes.
- `src/app/globals.css` — Apple-inspired semantic tokens, radius, and shadow tuning.

## Specs Location
All specs are in `specs/`:
- `discovery.md` — VA requirements, competitive landscape, feature set
- `ui-design-spec.md` — Full UI design system
- `ux-spec.md` — UX/IA, user flows, personas
- `frontend-tech-spec.md` — Frontend architecture
- `backend-infra-spec.md` — Backend, database schema, infra

## Pending Tasks
- [x] Build (marketing): Landing page (/)
- [ ] Build (marketing): Pricing, Schools, About pages
- [ ] Build (auth): Sign In, Sign Up, Forgot Password
- [ ] Build (portal): Dashboard, Course Player, Hours Tracker, Skills, Forums, Messages
- [ ] Configure: NextAuth.js v5 + Prisma + Supabase
- [ ] Configure: Mux video integration
- [ ] Configure: Stripe billing
- [ ] Configure: Resend email
- [ ] Deploy to Vercel
- [ ] Connect custom domain
