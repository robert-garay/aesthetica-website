# CHECKPOINT: Aesthetica

## Project Info
- **Product**: Aesthetica — VA State-Qualified Aesthetic Learning Portal
- **Tagline**: "Learn to glow."
- **Repo**: github.com/robert-garay/aesthetica-website
- **Vercel**: pending
- **Phase**: Scaffold complete — Implementation starting
- **Last Updated**: 2026-03-30

## Architecture
- Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + shadcn/ui
- pnpm package manager
- Route groups: `(marketing)`, `(auth)`, `(portal)`
- Database: PostgreSQL via Supabase + Prisma ORM (not yet configured)
- Auth: NextAuth.js v5 (not yet configured)
- Video: Mux (not yet configured)
- Payments: Stripe (not yet configured)

## File Structure
```
src/
├── app/
│   ├── (marketing)/     # Public pages (landing, pricing, about, schools)
│   ├── (auth)/          # sign-in, sign-up, forgot-password
│   ├── (portal)/        # Authenticated app (dashboard, courses, hours, skills, forums, messages)
│   ├── api/             # Route handlers (auth, webhooks)
│   ├── layout.tsx       # Root layout with fonts + metadata
│   ├── page.tsx         # Landing page (scaffold placeholder)
│   ├── not-found.tsx    # 404 page
│   ├── sitemap.ts       # Dynamic sitemap
│   └── robots.ts        # robots.txt
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # Header, sidebar, footer, bottom nav
│   ├── marketing/       # Hero, pricing, testimonials, features
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
| Landing (placeholder) | / | scaffold |
| 404 | /not-found | done |
| Sign In | /sign-in | scaffold only |
| Sign Up | /sign-up | scaffold only |
| Dashboard | /dashboard | scaffold only |

## Specs Location
All specs are in `specs/`:
- `discovery.md` — VA requirements, competitive landscape, feature set
- `ui-design-spec.md` — Full UI design system
- `ux-spec.md` — UX/IA, user flows, personas
- `frontend-tech-spec.md` — Frontend architecture
- `backend-infra-spec.md` — Backend, database schema, infra

## Pending Tasks
- [ ] Build (marketing): Landing page, Pricing, Schools, About
- [ ] Build (auth): Sign In, Sign Up, Forgot Password
- [ ] Build (portal): Dashboard, Course Player, Hours Tracker, Skills, Forums, Messages
- [ ] Configure: NextAuth.js v5 + Prisma + Supabase
- [ ] Configure: Mux video integration
- [ ] Configure: Stripe billing
- [ ] Configure: Resend email
- [ ] Deploy to Vercel
- [ ] Connect custom domain
