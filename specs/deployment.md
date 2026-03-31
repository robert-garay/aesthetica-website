# Deployment Summary: Aesthetica

## URLs
- **Production**: https://aesthetica-website.vercel.app
- **GitHub Repo**: https://github.com/robert-garay/aesthetica-website
- **Vercel Dashboard**: https://vercel.com/roberts-projects-966b2130/aesthetica-website

## Configuration
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Build Command**: `pnpm build`
- **Package Manager**: pnpm 10.x
- **Node.js**: 20.x (Vercel default)
- **Region**: Washington D.C. (iad1)
- **Scope**: roberts-projects-966b2130

## Deployment Date
2026-03-31

## Environment Variables
| Name | Environment | Value |
|------|-------------|-------|
| `NEXT_PUBLIC_SITE_URL` | Production | https://aesthetica-website.vercel.app |

## Pending Environment Variables (add when backend is configured)
| Name | Purpose |
|------|---------|
| `DATABASE_URL` | Supabase pooled connection (Prisma runtime) |
| `DIRECT_DATABASE_URL` | Supabase direct connection (migrations) |
| `NEXTAUTH_URL` | Auth.js base URL |
| `NEXTAUTH_SECRET` | Auth.js JWT secret |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (server-only) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_B2C_MONTHLY` | Stripe price ID for B2C monthly |
| `STRIPE_PRICE_B2C_ANNUAL` | Stripe price ID for B2C annual |
| `STRIPE_PRICE_SCHOOL_STARTER` | Stripe price ID for school starter/seat |
| `STRIPE_PRICE_SCHOOL_GROWTH` | Stripe price ID for school growth/seat |
| `MUX_TOKEN_ID` | Mux API token ID |
| `MUX_TOKEN_SECRET` | Mux API token secret |
| `MUX_WEBHOOK_SECRET` | Mux webhook signing secret |
| `MUX_SIGNING_KEY_ID` | Mux signing key ID (signed playback) |
| `MUX_SIGNING_KEY_PRIVATE` | Mux signing key private (signed playback) |
| `RESEND_API_KEY` | Resend transactional email API key |
| `EMAIL_FROM` | From address e.g. `Aesthetica <no-reply@aesthetica.app>` |
| `OPENAI_API_KEY` | OpenAI API key (AI tutor) |
| `R2_ACCOUNT_ID` | Cloudflare R2 account ID |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 access key |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 secret key |
| `R2_BUCKET_PRIVATE` | R2 private bucket name |
| `R2_PUBLIC_BASE_URL` | R2 public CDN base URL |

## Routes Deployed
| Route | Type | Status |
|-------|------|--------|
| `/` | Static | ✅ |
| `/pricing` | Static | ✅ |
| `/schools` | Static | ✅ |
| `/about` | Static | ✅ |
| `/sign-in` | Static | ✅ |
| `/sign-up` | Static | ✅ |
| `/forgot-password` | Static | ✅ |
| `/dashboard` | Static | ✅ |
| `/hours` | Static | ✅ |
| `/assessments` | Static | ✅ |
| `/courses/[courseId]/chapters/[chapterId]` | Dynamic | ✅ |
| `/sitemap.xml` | Static | ✅ |
| `/robots.txt` | Static | ✅ |
| `/_not-found` | Static | ✅ |

## Quality Checks
- [x] All routes return HTTP 200
- [x] 404 returns correctly for unknown paths
- [x] Build passes with zero errors and zero warnings
- [x] TypeScript strict mode passes (`pnpm tsc --noEmit`)
- [x] ESLint passes (`pnpm lint`)
- [ ] Lighthouse scores (pending — run after custom domain connected)
- [ ] WCAG 2.1 AA audit (pending)

## Next Steps
1. Connect custom domain (when acquired)
2. Set up Supabase project → add DB env vars
3. Configure NextAuth.js v5 with Prisma adapter
4. Wire up Stripe for billing
5. Integrate Mux for video
6. Configure Resend for transactional email
7. Add OpenAI for AI tutor
8. Re-run Lighthouse audit after domain + content are live

## Rollback
```bash
vercel ls --scope roberts-projects-966b2130
vercel promote <previous-deployment-url> --scope roberts-projects-966b2130
```
