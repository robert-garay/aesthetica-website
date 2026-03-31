# CHECKPOINT: Aesthetica

## Project Info
- **Product**: Aesthetica — VA State-Qualified Aesthetic Learning Portal
- **Tagline**: "Learn to glow."
- **Repo**: github.com/robert-garay/aesthetica-website
- **Vercel**: https://aesthetica-website.vercel.app ✅ LIVE
- **Vercel Dashboard**: https://vercel.com/roberts-projects-966b2130/aesthetica-website
- **Phase**: Auth + Stripe live — Mux + Resend next
- **Last Updated**: 2026-03-31

## Architecture
- Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + shadcn/ui
- pnpm package manager
- Route groups: `(marketing)`, `(auth)`, `(portal)`
- Database: PostgreSQL via Supabase (lgkwpkyilvkzppbkjsik) + Prisma 7 + pg adapter
- Auth: next-auth v4.24.13 — JWT sessions, credentials + Google OAuth
- Video: Mux (not yet configured)
- Payments: Stripe v21 — products/prices/webhook created, billing actions ready
- Email: Resend (not yet configured)

## Auth Setup (next-auth v4)
- **Strategy**: JWT (no DB sessions — avoids Prisma adapter conflict with next-auth v5 beta)
- **Providers**: Credentials (email/password + bcrypt) + Google OAuth
- **User creation**: Google OAuth creates User in DB via `signIn` callback
- **CSRF**: Required for OAuth POST (handled automatically by `next-auth/react` `signIn()`)
- **Session type**: Augmented with `id` + `globalRole` via JWT callback
- **Proxy (middleware)**: Explicit path list matcher — protects portal routes, redirects auth routes when logged in

## Stripe Setup
- **Account**: Sandbox (test mode)
- **Products**: Student (monthly/annual), School Starter, School Growth, CE Pass
- **Webhook**: registered at `/api/stripe/webhook`, handles subscription + invoice events
- **Checkout**: `createCheckoutSession(plan)` server action — 7-day trial included

## Database
- **Project**: aesthetica-prod (lgkwpkyilvkzppbkjsik), us-east-1
- **Migration**: 20260331031851_init — all 34 models deployed
- **Schema**: `prisma/schema.prisma`
- **Config**: `prisma.config.ts` (loads .env.local for local dev)

## File Structure
```
src/
├── app/
│   ├── (marketing)/     # /, /pricing, /schools, /about
│   ├── (auth)/          # /sign-in, /sign-up, /forgot-password
│   ├── (portal)/        # /dashboard, /courses, /hours, /assessments
│   ├── api/
│   │   ├── auth/[...nextauth]/  # next-auth v4 handler
│   │   └── stripe/webhook/      # Stripe webhook handler
│   ├── layout.tsx       # Root layout + SessionProvider
│   ├── page.tsx         # Marketing landing page
│   ├── not-found.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # App sidebar, mobile header/bottom nav
│   ├── marketing/       # Nav, footer, pricing plans
│   ├── auth/            # Sign-in/up/forgot-password forms
│   ├── lms/             # Course player, assessments, progress, etc.
│   └── shared/          # AnimateIn, SessionProvider
├── lib/
│   ├── auth.ts          # next-auth v4 config + authOptions
│   ├── auth.config.ts   # Edge-compatible config (proxy)
│   ├── prisma.ts        # Prisma client singleton (PrismaPg adapter)
│   ├── stripe.ts        # Stripe client + PRICE_IDS
│   ├── fonts.ts
│   └── utils.ts
├── actions/
│   ├── auth.actions.ts  # signUpAction, signOutAction
│   └── billing.actions.ts # createCheckoutSession, billing portal
├── proxy.ts             # next-auth v4 withAuth middleware
└── types/auth.ts        # Session type augmentation
```

## Design System (Apple-style)
- **Background**: `#FBFBFD` (Apple near-white)
- **Foreground**: `#1D1D1F` (Apple near-black)
- **Muted**: `#6E6E73`
- **Primary CTA**: `#3D1A4B` (deep plum)
- **Rose accent**: `#C4748A`
- **Font Display**: Cormorant Garamond (hero headlines only)
- **Font Body**: DM Sans (all UI)

## Implemented Pages
| Page | Route | Status |
|------|-------|--------|
| Landing | / | done |
| Pricing | /pricing | done |
| For Schools | /schools | done |
| About | /about | done |
| Sign In | /sign-in | done + wired |
| Sign Up | /sign-up | done + wired |
| Forgot Password | /forgot-password | done (UI only) |
| Dashboard | /dashboard | done (mock data) |
| Course Player | /courses/[id]/chapters/[id] | done (mock data) |
| Hours Tracker | /hours | done (mock data) |
| Assessments | /assessments | done (mock data) |
| 404 | /_not-found | done |

## Environment Variables (Vercel Production)
- DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
- AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_TRUST_HOST
- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_B2C_MONTHLY, STRIPE_PRICE_B2C_ANNUAL
- STRIPE_PRICE_SCHOOL_STARTER, STRIPE_PRICE_SCHOOL_GROWTH, STRIPE_PRICE_CE_PASS_ANNUAL
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, NEXT_PUBLIC_SITE_URL

## Pending Tasks

### Active
- [ ] Wire portal pages to real DB data (replace mock data)
- [ ] Build: Skills, Forums, Messages portal pages
- [ ] Build: Notifications, Settings, Billing portal pages
- [ ] Connect custom domain
- [ ] Run Lighthouse audit

### Backlog (needs external assets/accounts)
- [ ] Mux — video streaming (needs course videos to upload)
- [ ] Resend — transactional email (needs email copy; blocks password reset flow)
- [ ] Forgot password flow (depends on Resend)
- [ ] AI tutor / Lumina (needs OpenAI API key + course content embedded)
- [ ] Course content authoring (needs licensed esthetics educator)
