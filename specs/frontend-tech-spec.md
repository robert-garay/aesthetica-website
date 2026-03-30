# Aesthetica — Frontend Technical Specification

## 1. Tech Stack & Dependencies (with versions)

> **Baseline**: Next.js 15+ App Router, TypeScript strict mode, Tailwind v4, shadcn/ui.  
> Version policy: **pin majors**, allow safe patch/minor updates via Renovate/Dependabot.

### Core runtime
- `next@15.x`
- `react@19.x`
- `react-dom@19.x`
- `typescript@5.8+` (strict mode enabled)
- `pnpm@9+`

### UI & styling
- `tailwindcss@4.x`
- `@tailwindcss/postcss@4.x`
- `shadcn/ui` (generated components in `components/ui`, built on Radix + Tailwind)
- `class-variance-authority@0.7+`
- `clsx@2+`
- `tailwind-merge@2+`
- `lucide-react@0.5xx+`
- `next-themes@0.4+`

### Auth, data, validation
- `next-auth@5` (Auth.js v5)
- `@prisma/client@6.x`
- `prisma@6.x`
- `zod@3.24+`
- `react-hook-form@7.5x+`
- `@hookform/resolvers@3.x`

### Feature-specific
- Video: `@mux/mux-player-react@3.x`
- Billing: `stripe@17.x`, `@stripe/stripe-js@4.x`, `@stripe/react-stripe-js@3.x`
- Email: `resend@4.x`, `react-email@3.x`
- File uploads: `uploadthing@7.x` or signed-upload route handlers
- Optional: `@tanstack/react-query@5.x`

### Quality
- `eslint@9`, `eslint-config-next@15`
- `prettier@3`
- `vitest@2`, `@testing-library/react@16`, `@testing-library/user-event@14`
- `playwright@1.5x`
- `axe-core` / `@axe-core/playwright`

---

## 2. Project Directory Structure

```txt
aesthetica/
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ page.tsx
│  │  │  ├─ pricing/page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ schools/page.tsx
│  │  │  └─ contact/page.tsx
│  │  ├─ (auth)/
│  │  │  ├─ sign-in/page.tsx
│  │  │  ├─ sign-up/page.tsx
│  │  │  └─ forgot-password/page.tsx
│  │  ├─ (portal)/
│  │  │  ├─ layout.tsx
│  │  │  ├─ dashboard/page.tsx
│  │  │  ├─ courses/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [courseId]/
│  │  │  │     ├─ page.tsx
│  │  │  │     └─ chapters/[chapterId]/page.tsx
│  │  │  ├─ assessments/[assessmentId]/page.tsx
│  │  │  ├─ forums/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ threads/[threadId]/page.tsx
│  │  │  ├─ messages/page.tsx
│  │  │  ├─ hours/page.tsx
│  │  │  ├─ skills/page.tsx
│  │  │  ├─ grades/page.tsx
│  │  │  ├─ notifications/page.tsx
│  │  │  └─ billing/page.tsx
│  │  ├─ api/
│  │  │  ├─ auth/[...nextauth]/route.ts
│  │  │  ├─ stripe/webhook/route.ts
│  │  │  ├─ mux/webhook/route.ts
│  │  │  ├─ mux/upload-url/route.ts
│  │  │  └─ realtime/notifications/route.ts
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ not-found.tsx
│  │  ├─ global-error.tsx
│  │  ├─ layout.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ layout/
│  │  ├─ marketing/
│  │  ├─ lms/
│  │  │  ├─ video/
│  │  │  ├─ assessments/
│  │  │  ├─ progress/
│  │  │  ├─ forums/
│  │  │  ├─ messaging/
│  │  │  ├─ gradebook/
│  │  │  └─ skills/
│  │  └─ shared/
│  ├─ lib/
│  │  ├─ auth.ts
│  │  ├─ prisma.ts
│  │  ├─ stripe.ts
│  │  ├─ mux.ts
│  │  ├─ resend.ts
│  │  ├─ env.ts
│  │  ├─ permissions.ts
│  │  ├─ cache.ts
│  │  ├─ utils.ts
│  │  └─ validators/
│  ├─ actions/
│  │  ├─ forum.actions.ts
│  │  ├─ progress.actions.ts
│  │  ├─ assessments.actions.ts
│  │  ├─ billing.actions.ts
│  │  └─ profile.actions.ts
│  ├─ hooks/
│  │  ├─ use-session-role.ts
│  │  ├─ use-debounced-callback.ts
│  │  ├─ use-interval.ts
│  │  └─ use-optimistic-list.ts
│  ├─ types/
│  │  ├─ auth.ts
│  │  ├─ course.ts
│  │  ├─ assessment.ts
│  │  ├─ forum.ts
│  │  └─ billing.ts
│  └─ emails/
│     ├─ invoice-email.tsx
│     └─ welcome-email.tsx
├─ prisma/schema.prisma
├─ middleware.ts
└─ CHECKPOINT.md
```

---

## 3. Component Architecture

### Server Components (default)
Use for page/layout composition, data-heavy views, SEO pages, permission checks and redirects.

### Client Components (leaf/interactivity)
Use only where needed: Mux player + time events, quiz interaction/timers, forum composer + optimistic updates, direct messaging, hour timer UI, notification dropdown.

### shadcn/ui extension strategy
- Keep base primitives unopinionated
- Extend via `class-variance-authority` variants
- CSS custom properties in `globals.css` for brand tokens
- `data-[state]` selectors for interaction states
- Never hardcode colors/spacing; use tokens only

---

## 4. Routing & Page Map

### Public (SEO)
`/`, `/pricing`, `/about`, `/schools`, `/contact`

### Auth
`/sign-in`, `/sign-up`, `/forgot-password`

### Authenticated portal
`/dashboard`, `/courses`, `/courses/[courseId]`, `/courses/[courseId]/chapters/[chapterId]`, `/assessments/[assessmentId]`, `/hours`, `/forums`, `/forums/threads/[threadId]`, `/messages`, `/grades`, `/skills`, `/notifications`, `/billing`

Use route groups `(marketing)`, `(portal)`, `(auth)` to separate layouts and bundles.

---

## 5. Data Fetching & State Management

### Read patterns
1. Server Components + Prisma for initial page data
2. `cache()` + tag-based invalidation for reusable loaders
3. `Suspense` boundaries for secondary panels

### Mutation patterns
- **Server Actions**: default for authenticated form submits/mutations
- **API Routes**: webhooks, external callbacks, signed upload URLs, streaming/SSE
- Revalidate via `revalidateTag` / `revalidatePath`

### Optimistic UI
Forums, messaging, progress ticks use `useOptimistic` + rollback on error.

```tsx
const [optimisticPosts, addOptimistic] = useOptimistic(posts, (state, draft) => [draft, ...state])
```

### Caching strategy
- Static marketing pages: ISR (`revalidate: 3600`)
- Auth dashboard/course pages: dynamic per user (`no-store` where sensitive)
- Frequently changing widgets: small polling interval or SSE channel

---

## 6. Video Player Implementation

### Mux integration

```tsx
"use client"
import MuxPlayer from "@mux/mux-player-react"

export function CourseVideoPlayer({ playbackId, lessonId, resumeAt }: Props) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      accentColor="var(--color-primary)"
      metadata={{ video_id: lessonId }}
      startTime={resumeAt}
      streamType="on-demand"
    />
  )
}
```

### Progress persistence
- Listen to `timeupdate` (throttled every 5s)
- Send Server Action: `{ lessonId, positionSeconds, watchedPercent }`
- Mark complete at 90% threshold

### In-video quiz overlays
- Quiz events defined as timeline anchors: `{ atSecond: 120, quizId: "qz_1" }`
- When player time crosses anchor: pause video → open quiz modal → submit → resume

### Offline/download (v2)
PWA + encrypted downloadable lesson packages — explicitly out of scope for v1.

---

## 7. Authentication & Authorization

### NextAuth.js v5
- Providers: credentials + optional Google/Microsoft for schools
- Session strategy: JWT for scale simplicity at early stage

### Role model
- `role: "student" | "instructor" | "admin"`
- `schoolId` claim mandatory for tenant scoping
- Enforce in: middleware route gate, server loaders, server actions

### Middleware
- Protect `(portal)` routes
- Redirect unauthenticated → `/sign-in`
- Redirect unauthorized role → `/dashboard?denied=1`

---

## 8. Forms, Validation & Server Actions

### Stack
`react-hook-form` + `zod` + `zodResolver`

### Pattern
1. Client validates instantly
2. Submit to Server Action
3. Server re-validates with same schema
4. Return structured field errors

```ts
// ActionResult pattern
type ActionResult<T> = { ok: true; data: T } | { ok: false; fieldErrors?: Record<string, string[]>; formError?: string }
```

---

## 9. Performance Strategy

### Targets
- Lighthouse: 90+ all categories
- LCP < 2.5s, CLS < 0.1, INP < 200ms

### Implementation
- Server Components first; minimize client JS
- Route-level code splitting + lazy load heavy widgets
- `next/image` everywhere with explicit dimensions
- `next/font` self-hosted (`display: swap`)
- Skeleton screens for LMS lists/cards (avoid layout shift)
- Bundle analysis with `@next/bundle-analyzer`

---

## 10. Testing Strategy

### Unit/Component (Vitest + RTL)
- Quiz scoring logic
- Progress math
- Permission helpers
- Timer behavior

### E2E (Playwright)
- Sign in → watch chapter → complete quiz
- Forum post optimistic submit
- Instructor gradebook view
- Stripe checkout return flow
- Accessibility: keyboard nav + axe checks

---

## 11. Key Implementation Notes & Gotchas

1. **Tenant safety**: Every query/mutation must include `schoolId` boundary
2. **Timer trust model**: UI timer is display only; authoritative hour accrual is server-validated
3. **Video event throttling**: Throttle progress writes to avoid excessive DB writes
4. **Optimistic rollback**: Always support undo/reconcile for forum/chat failures
5. **Webhook idempotency**: Stripe/Mux handlers must be idempotent and signed
6. **Role drift**: Never rely on client session role alone; re-check server-side
7. **Mobile LMS shell**: Bottom nav for primary actions (Dashboard, Courses, Hours, Messages, Profile)
8. **Accessibility**: Quiz timers must be screen-reader announced; pause/extend accommodations supported
9. **SEO split**: Marketing pages static/ISR, portal pages noindex
10. **Future scale**: Keep data access in domain services to simplify multi-state, multi-tenant migration

### Hour tracking timer pattern

```tsx
"use client"
const HEARTBEAT_MS = 30_000
// Local setInterval(1000) updates display UI
// Separate heartbeat mutation writes active session ping every 30s
// Server computes official hours from pings/session windows
```

### Quiz overlay trigger pattern

```ts
if (!shownQuizIds.has(quiz.id) && currentTime >= quiz.atSecond) {
  player.pause()
  openQuiz(quiz.id)
}
```

### Progress mutation pattern

```ts
// On timeupdate (throttled):
await updateProgressAction({ lessonId, positionSeconds, completed })
revalidateTag(`course:${courseId}:progress`)
```
