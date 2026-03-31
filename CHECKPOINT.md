# CHECKPOINT: Aesthetica

## Project Info
- **Product**: Aesthetica — VA State-Qualified Aesthetic Learning Portal
- **Tagline**: "Learn to glow."
- **Repo**: github.com/robert-garay/aesthetica-website
- **Vercel**: https://aesthetica-website.vercel.app ✅ LIVE
- **Vercel Dashboard**: https://vercel.com/roberts-projects-966b2130/aesthetica-website
- **Phase**: Deployed — backend setup next
- **Last Updated**: 2026-03-31

## Architecture
- Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + shadcn/ui
- pnpm package manager
- Route groups: `(marketing)`, `(auth)`, `(portal)`
- Database: PostgreSQL via Supabase + Prisma ORM (not yet configured)
- Auth: NextAuth.js v5 (not yet configured)
- Video: Mux (not yet configured)
- Payments: Stripe (not yet configured)

## Recent Changes
- **2026-03-30**: Built authenticated portal app shell and core LMS pages: `/dashboard`, `/courses/[courseId]/chapters/[chapterId]`, `/hours`, and `/assessments` with Apple-style mobile/desktop layouts.
- **2026-03-30**: Built polished Apple-style auth UI for `/sign-in`, `/sign-up`, and `/forgot-password` with shared split layout, role card selector, password visibility toggles, password strength bars, and forgot-password success state.
- **2026-03-30**: Added missing `components/auth/sign-up-form.tsx` scaffold to resolve auth import and unblock production build.
- **2026-03-30**: Added `(marketing)/pricing` page with billing toggle, 3-tier pricing cards, CE add-on strip, and FAQ accordion.
- **2026-03-30**: Added `(marketing)/schools` page with dark hero, trust strip, compliance/instructor feature rows, seat pricing, and demo CTA.

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
│   ├── auth/            # Auth form components + shared SSO icon
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
| Pricing (marketing) | /pricing | done |
| For Schools (marketing) | /schools | done |
| About (marketing) | /about | done |
| 404 | /not-found | done |
| Sign In | /sign-in | done |
| Sign Up | /sign-up | done |
| Forgot Password | /forgot-password | done |
| Dashboard | /dashboard | done |
| Course Player | /courses/[courseId]/chapters/[chapterId] | done |
| Hours | /hours | done |
| Assessments | /assessments | done |

## New / Updated Files
- `src/app/page.tsx` — complete Apple-style marketing landing page implementation.
- `src/components/marketing/nav.tsx` — frosted scroll-aware nav with mobile overlay menu.
- `src/components/marketing/footer.tsx` — marketing footer with brand/legal/utility links.
- `src/components/shared/animate-in.tsx` — lightweight intersection observer reveal wrapper.
- `src/app/(marketing)/layout.tsx` — shared marketing layout wrapper for grouped routes.
- `src/app/globals.css` — Apple-inspired semantic tokens, radius, and shadow tuning.
- `src/components/marketing/pricing-plans.tsx` — client pricing toggle with dynamic student billing and pricing tiers.
- `src/app/(marketing)/pricing/page.tsx` — marketing pricing page with hero, plans, CE strip, and FAQ.
- `src/app/(marketing)/schools/page.tsx` — schools-focused marketing page with compliance + instructor sections.
- `src/app/(marketing)/about/page.tsx` — mission/value storytelling page with waitlist form CTA.
- `src/app/(auth)/layout.tsx` — shared auth split layout with left brand panel + right form panel.
- `src/app/(auth)/sign-in/page.tsx` — metadata wrapper route for sign-in form.
- `src/app/(auth)/sign-up/page.tsx` — metadata wrapper route for sign-up form.
- `src/app/(auth)/forgot-password/page.tsx` — metadata wrapper route for reset form.
- `src/components/auth/sign-in-form.tsx` — fully styled sign-in form with show/hide password and Google SSO button.
- `src/components/auth/sign-up-form.tsx` — role selector, 2-column identity inputs, password strength meter, terms checkbox, and SSO.
- `src/components/auth/forgot-password-form.tsx` — reset request form with local success confirmation state.
- `src/components/auth/google-icon.tsx` — reusable inline Google icon for auth buttons.
- `src/app/(portal)/layout.tsx` — authenticated portal shell with fixed desktop sidebar + mobile top/bottom navigation chrome.
- `src/app/(portal)/dashboard/page.tsx` — student daily dashboard with hours/progress stats, continue-learning card, goals, and announcements.
- `src/app/(portal)/courses/[courseId]/chapters/[chapterId]/page.tsx` — chapter lesson player with chapter rail, video placeholder UI, lesson tabs, and mobile chapters sheet.
- `src/app/(portal)/hours/page.tsx` — licensing hours tracker with progress ring, session stats, and activity log rows.
- `src/app/(portal)/assessments/page.tsx` — assessment list with passed/available/locked states and contextual actions.
- `src/components/layout/app-sidebar.tsx` — desktop portal sidebar navigation and account footer cluster.
- `src/components/layout/mobile-header.tsx` — mobile top bar with menu sheet, notifications, and compact profile avatar.
- `src/components/layout/mobile-bottom-nav.tsx` — fixed mobile bottom tab bar with route-aware active state.
- `src/components/layout/portal-nav.ts` — shared portal navigation section/tab configuration for server + client layout components.

## Specs Location
All specs are in `specs/`:
- `discovery.md` — VA requirements, competitive landscape, feature set
- `ui-design-spec.md` — Full UI design system
- `ux-spec.md` — UX/IA, user flows, personas
- `frontend-tech-spec.md` — Frontend architecture
- `backend-infra-spec.md` — Backend, database schema, infra

## Pending Tasks
- [x] Build (marketing): Landing page (/)
- [x] Build (marketing): Pricing, Schools, About pages
- [x] Build (auth): Sign In, Sign Up, Forgot Password
- [ ] Build (portal): Skills, Forums, Messages
- [ ] Build (portal): Notifications, Settings, Billing pages
- [ ] Configure: NextAuth.js v5 + Prisma + Supabase
- [ ] Configure: Mux video integration
- [ ] Configure: Stripe billing
- [ ] Configure: Resend email
- [ ] Deploy to Vercel
- [ ] Connect custom domain
