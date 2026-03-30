# Aesthetica — UX & Information Architecture Specification

**Version**: 1.0 | **Date**: March 30, 2026 | **Author**: UX Designer
**Tagline**: "Learn to glow." | **Platform**: Virginia DPOR-Compliant Aesthetic Learning Portal

---

## 1. User Personas

### 1.1 Maya — The Enrolled Student
> *"I just want to know I'm on track and not fall behind."*

- **Age**: 21 | **Device**: iPhone 15 (primary), MacBook (occasional)
- **Tech comfort**: High — TikTok, Instagram, YouTube native
- **Motivation**: Becoming a licensed esthetician, working at a spa
- **Fears**: Falling behind on hours, failing the state board exam, boring content
- **Behaviors**: Studies in 20–40 min bursts between shifts, late evenings, commutes
- **Needs**: Clear progress visibility, streak motivation, mobile video that just works
- **Pain points**: Blackboard-style LMS feels like homework; anxiety about 600-hour requirement
- **Success metric**: Completes daily lesson, sees hours tick up, feels confident

---

### 1.2 Jordan — The B2C Self-Enrolled Student
> *"I'm doing this on my own timeline. Don't make me jump through hoops."*

- **Age**: 28 | **Device**: Android phone + iPad
- **Tech comfort**: Medium-high — comfortable with apps, frustrated by complexity
- **Motivation**: Career change, entrepreneurship (own studio someday)
- **Fears**: Wasting money, not understanding what's included, billing surprises
- **Behaviors**: Weekend warrior learner, binge sessions, needs flexibility
- **Needs**: Clear pricing, self-serve billing, same quality as school-enrolled
- **Pain points**: Doesn't have a school to ask questions — needs strong self-service
- **Success metric**: Enrolled, paying, progressing independently

---

### 1.3 Dr. Reyes — The Instructor
> *"I need to see who's struggling before they fall too far behind."*

- **Age**: 38 | **Device**: iPad (classroom), MacBook (office)
- **Tech comfort**: Medium — comfortable with Google Classroom, not a power user
- **Motivation**: Student success, compliance with DPOR, efficient class management
- **Fears**: Missing a student who's falling behind, hour verification errors, audit risk
- **Behaviors**: Checks roster in the morning, grades in batches, sends announcements weekly
- **Needs**: At-a-glance roster health, easy hour verification, bulk actions
- **Pain points**: Switching between tools (gradebook, email, attendance) is exhausting
- **Success metric**: All students on track, hours verified, no compliance gaps

---

### 1.4 Sandra — The School Admin
> *"I need compliance reports ready when the state asks, not two days later."*

- **Age**: 45 | **Device**: Windows desktop (primary)
- **Tech comfort**: Medium — Excel power user, cautious with new software
- **Motivation**: School accreditation, business growth, student outcomes
- **Fears**: Audit failures, billing errors, instructor turnover disrupting students
- **Behaviors**: Monthly billing reviews, quarterly compliance exports, occasional user management
- **Needs**: Export-ready reports, clear billing dashboard, simple user management
- **Pain points**: Compliance documentation is manual and error-prone
- **Success metric**: Clean audit trail, zero billing disputes, instructors self-sufficient

---

## 2. Information Architecture (App Map)

### 2.1 Public / Marketing Zone (Unauthenticated)

```
aesthetica.app/
├── /                          ← Landing page (marketing)
├── /pricing                   ← B2C pricing + school plans
├── /for-schools               ← School admin acquisition page
├── /courses                   ← Course catalog preview
│   ├── /courses/basic         ← Basic Esthetics course page
│   └── /courses/master        ← Master Esthetics course page
├── /about                     ← Mission, Virginia compliance, team
├── /blog                      ← SEO content, beauty education articles
├── /login                     ← Unified login (role-detected)
├── /signup                    ← B2C student signup
└── /school-signup             ← School enrollment flow
```

### 2.2 Student App Zone (Authenticated — Student / B2C)

```
/dashboard                     ← Daily hub (default landing)
/learn
├── /learn/[courseSlug]        ← Course home (chapters list)
│   └── /learn/[courseSlug]/[chapterSlug]/[lessonSlug]  ← Course player
/assessments
├── /assessments               ← All quizzes / exams list
├── /assessments/[id]          ← Active quiz
└── /assessments/[id]/results  ← Results + review
/hours
├── /hours                     ← Hour log dashboard
└── /hours/export              ← DPOR-ready export
/skills
├── /skills                    ← Practical skills tracker home
└── /skills/[competencyId]     ← Competency detail + upload
/community
├── /community                 ← Forum home (chapter threads)
├── /community/[threadId]      ← Thread view
└── /community/search          ← Forum search
/messages                      ← Direct messages (inbox)
/messages/[conversationId]     ← Conversation view
/profile                       ← Student profile, settings
/billing                       ← B2C only: subscription, invoices
```

### 2.3 Instructor Zone (Authenticated — Instructor)

```
/instructor
├── /instructor/dashboard      ← Roster overview, alerts
├── /instructor/roster         ← Full student list + filters
├── /instructor/roster/[studentId]  ← Individual student view
├── /instructor/gradebook      ← Assessment grades, bulk grading
├── /instructor/hours          ← Hour verification queue
├── /instructor/skills         ← Practical submissions review
├── /instructor/announcements  ← Create / manage announcements
├── /instructor/community      ← Moderate forum, pin posts
└── /instructor/messages       ← DM inbox (same as student)
```

### 2.4 Admin Portal (Authenticated — School Admin)

```
/admin
├── /admin/dashboard           ← School health overview
├── /admin/users               ← All users (students + instructors)
│   ├── /admin/users/students  ← Student management
│   └── /admin/users/instructors  ← Instructor management
├── /admin/courses             ← Course assignments per cohort
├── /admin/compliance          ← DPOR reports, hour exports
├── /admin/billing             ← Subscription, seats, invoices
└── /admin/settings            ← School profile, branding, integrations
```

### 2.5 Shared / System Routes

```
/onboarding                    ← First-run wizard (role-specific)
/onboarding/school-invite      ← Accept school invitation
/onboarding/b2c                ← Self-enrolled setup
/auth/verify-email             ← Email verification
/auth/reset-password           ← Password reset
/404                           ← Not found
/500                           ← Error page
/maintenance                   ← Scheduled downtime page
```

---

## 3. Navigation Design

### 3.1 Navigation Philosophy

**Role isolation is sacred.** Students never see instructor controls. Instructors never accidentally enter admin territory. Navigation adapts entirely per role — same shell, different soul.

**Mobile-first tab bar.** On mobile, the primary nav is a bottom tab bar (5 items max). On desktop, it becomes a collapsible left sidebar. This is the Linear/Notion model applied to vocational education.

---

### 3.2 Student Navigation

#### Mobile (Bottom Tab Bar — always visible)
```
[🏠 Home] [📚 Learn] [⏱ Hours] [💬 Community] [👤 Profile]
```

- **Home** → `/dashboard`
- **Learn** → `/learn` (course list, then drill into lessons)
- **Hours** → `/hours` (hour log + clock-in/out)
- **Community** → `/community` (forum + DMs combined)
- **Profile** → `/profile` (settings, achievements, logout)

Active tab uses brand accent color with filled icon. Inactive tabs use muted gray with outline icon. Tab bar has `safe-area-inset-bottom` padding for iPhone notch.

#### Desktop (Left Sidebar — 240px, collapsible to 64px icon rail)
```
┌─────────────────────┐
│  [A] Aesthetica     │  ← Logo + school name
├─────────────────────┤
│  🏠  Dashboard      │
│  📚  My Course      │
│  ⏱   Hours         │
│  ✅  Skills         │
│  💬  Community      │
│  ✉️   Messages      │
├─────────────────────┤
│  🔔  Notifications  │  ← Badge count
│  ⚙️   Settings      │
│  ❓  Help           │
└─────────────────────┘
```

Sidebar collapses on `< 1024px`. Collapsed state shows icon rail only with tooltips on hover.

#### Contextual Secondary Navigation
- **Course Player**: Chapter list slides in from left (drawer on mobile, persistent panel on desktop ≥ 1280px)
- **Hours**: Sub-tabs: `Overview | Log | Export`
- **Community**: Sub-tabs: `Chapters | Announcements | Search`

---

### 3.3 Instructor Navigation

#### Mobile (Bottom Tab Bar)
```
[🏠 Roster] [📊 Grades] [⏱ Hours] [📢 Announce] [👤 Profile]
```

#### Desktop (Left Sidebar)
```
┌─────────────────────┐
│  [A] Aesthetica     │
│  Instructor View    │  ← Role badge
├─────────────────────┤
│  🏠  Dashboard      │
│  👥  Roster         │
│  📊  Gradebook      │
│  ⏱   Hour Verify   │
│  ✅  Skills Review  │
│  📢  Announcements  │
│  💬  Community      │
│  ✉️   Messages      │
└─────────────────────┘
```

Role badge ("Instructor") appears below logo in sidebar and in the top-right avatar chip on mobile. This prevents role confusion.

---

### 3.4 Admin Navigation

#### Desktop Only (Admin portal is desktop-optimized, mobile-accessible)
```
┌─────────────────────┐
│  [A] Aesthetica     │
│  Admin Portal       │  ← Role badge
├─────────────────────┤
│  🏠  Overview       │
│  👥  Users          │
│  📋  Compliance     │
│  💳  Billing        │
│  ⚙️   Settings      │
└─────────────────────┘
```

Admin portal uses a slightly different visual treatment — same brand, but with a subtle admin-mode indicator (thin accent border on sidebar top) to prevent confusion if admin is also enrolled as a student.

---

### 3.5 Global Header (Mobile)

```
┌────────────────────────────────────────┐
│  [≡ Menu]    Aesthetica    [🔔] [👤]   │
└────────────────────────────────────────┘
```

- Hamburger opens a full-screen slide-over nav (not a tiny dropdown)
- Bell icon shows notification count badge (max "99+")
- Avatar opens a mini profile card with quick logout

---

### 3.6 Breadcrumbs

Used only in deep navigation contexts (course player, admin user detail). Format:
```
Learn > Basic Esthetics > Chapter 3: Skin Analysis > Lesson 2
```
On mobile: truncated to last 2 levels with `…` prefix.

---

### 3.7 Search

- **Global search** (desktop): `Cmd+K` / `Ctrl+K` opens command palette — searches lessons, forum threads, students (instructor), users (admin)
- **Mobile search**: Dedicated search icon in Community and Gradebook sections
- **Forum search**: Inline search bar at top of `/community`

---

## 4. Key User Flows

### 4.1 Flow: School-Enrolled Student Onboarding

**Trigger**: Student receives email invitation from school admin.

```
Email: "Your school has enrolled you in Aesthetica"
  ↓
[Accept Invitation] button in email
  ↓
/onboarding/school-invite?token=xxx
  ↓
Step 1: Verify your email (pre-filled, read-only)
        Create password (strength meter, show/hide toggle)
        [Continue →]
  ↓
Step 2: Tell us about yourself
        - First name, Last name (pre-filled from school data)
        - Preferred name (optional) — "What should your instructor call you?"
        - Phone number (optional, for SMS reminders)
        - Profile photo (optional, skip-able)
        [Continue →]
  ↓
Step 3: Your course
        - Shows: "You're enrolled in Basic Esthetics (600 hours)"
        - Shows: Start date, expected completion
        - Shows: Your instructor's name + photo
        [Looks good! Let's go →]
  ↓
Step 4: Quick tour (3 swipeable cards)
        Card 1: "Track your hours" — shows hours widget
        Card 2: "Learn at your pace" — shows course player preview
        Card 3: "Never miss a beat" — shows streak/notification opt-in
        [Enable notifications] or [Maybe later]
        [Start Learning →]
  ↓
/dashboard (first-time state)
```

**Friction removed**: No redundant data entry. School pre-populates name/email. Tour is swipeable, not a modal wall. Notification opt-in is contextual (after they understand the value), not a cold browser permission prompt.

---

### 4.2 Flow: B2C Student Self-Enrollment

**Trigger**: User lands on `/pricing` or `/signup` from marketing.

```
/pricing
  ↓
[Enroll Now — Basic Esthetics] CTA
  ↓
/signup
  Step 1: Account creation
          Email, Password, Confirm password
          "Already have an account? Log in"
          [Create Account →]
  ↓
  Step 2: Course selection
          - Basic Esthetics ($X/month or $Y one-time)
          - Master Esthetics ($X/month or $Y one-time)
          Toggle: Monthly | One-time
          [Select Basic Esthetics →]
  ↓
  Step 3: Payment
          - Stripe Elements (card, Apple Pay, Google Pay)
          - Order summary sidebar (sticky on desktop)
          - "30-day money-back guarantee" trust badge
          [Start Learning →]
  ↓
  Email verification prompt
  "Check your inbox — verify to unlock your course"
  [Resend email] link
  ↓
/onboarding/b2c (abbreviated — just profile setup, no course selection repeat)
  ↓
/dashboard
```

**Key UX decisions**:
- Payment before email verification (reduce drop-off; verify after)
- Apple Pay / Google Pay prominently shown (one-tap checkout)
- No account required to view pricing — no forced sign-up wall

---

### 4.3 Flow: Student Completes a Daily Lesson

**Trigger**: Student opens app, sees dashboard.

```
/dashboard
  ↓
"Continue where you left off" card (above the fold)
Shows: Chapter 3 > Lesson 2 > "Skin Types and Analysis"
Progress bar: 67% through chapter
[Continue Learning →]
  ↓
/learn/basic-esthetics/chapter-3/lesson-2 (Course Player)
  ↓
Video plays automatically (muted until user taps)
  ↓
[In-video quiz at 4:32] — video pauses, quiz overlay appears
Answer question → [Submit] → Immediate feedback → video resumes
  ↓
Video ends → "Lesson complete!" micro-animation
  ↓
"Next: Lesson 3 — Fitzpatrick Scale" auto-advances in 5 seconds
[Next Lesson] button + [Stay here] link
  ↓
Chapter complete → Chapter completion modal:
  "Chapter 3 complete! 🎉"
  Hours logged: +2.5 hrs | Total: 47.5 / 600 hrs
  Streak: 🔥 5 days
  [Take Chapter Quiz] or [Continue to Chapter 4]
  ↓
If quiz chosen → /assessments/chapter-3-quiz
```

---

### 4.4 Flow: Student Clocks In / Out for Hour Tracking

**Trigger**: Student opens app to begin a study session.

```
/dashboard or /hours
  ↓
"Clock In" button (prominent, always visible on Hours tab)
  ↓
[Clock In] tapped
  ↓
Confirmation: "Session started at 2:14 PM"
Timer appears in header (subtle, non-intrusive)
  ↓
Student studies (watches videos, reads content)
  ↓
Student navigates to /hours or taps timer in header
  ↓
"Clock Out" button (replaces Clock In)
  ↓
[Clock Out] tapped
  ↓
Session summary modal:
  "Session complete"
  Duration: 1 hr 23 min
  Total hours today: 1.5 hrs
  Total hours overall: 49.0 / 600 hrs
  Progress ring: 8.2% complete
  [Done]
  ↓
Hours log updated, pending instructor verification badge shown
```

**Note**: Video watching automatically contributes to hours (system-tracked). Manual clock-in is for reading, practice, and non-video study. Both are shown distinctly in the log.

---

### 4.5 Flow: Instructor Verifies Student Hours

**Trigger**: Instructor receives notification "3 students have unverified hours."

```
Notification → /instructor/hours
  ↓
"Pending Verification" tab (default when there are pending items)
List of students with unverified sessions:
  Maya Chen — 3 sessions, 4.5 hrs — [Review]
  Jordan Lee — 1 session, 1.2 hrs — [Review]
  ↓
[Review] → Expanded session detail:
  Date/time, duration, activity type (video / reading / manual)
  Student note (optional): "Studied chapter 3 reading"
  [Verify] [Flag for Review] [Reject with note]
  ↓
[Verify] → Checkmark animation, session moves to "Verified" tab
  ↓
Bulk action available: [Verify All Uncontested] button
  ↓
Student receives notification: "Your hours have been verified ✓"
```

---

### 4.6 Flow: Student Submits Practical Skills Evidence

**Trigger**: Student completes an in-person practical skill, needs to log it.

```
/skills
  ↓
Competency list (DPOR-mapped categories)
  e.g., "Facial Treatments" — 3/8 complete
  ↓
Tap competency → /skills/facial-treatments
  ↓
Skill checklist:
  ✅ Basic cleansing (verified)
  ✅ Exfoliation techniques (verified)
  ⬜ Mask application ← tap this
  ↓
Skill detail sheet slides up:
  - Skill description
  - DPOR competency reference
  - Rubric criteria (what instructor looks for)
  - [Upload Video] [Upload Photo] [Add Note]
  ↓
Upload flow:
  Camera opens (mobile) or file picker (desktop)
  Preview → [Submit for Review]
  ↓
Submission confirmed: "Sent to Dr. Reyes for review"
Status badge: "Pending Review" (yellow)
  ↓
When instructor grades → status becomes "Verified ✓" (green) or "Needs Revision" (orange)
Student notified either way
```

---

### 4.7 Flow: Student Takes a Chapter Quiz

**Trigger**: Student completes a chapter or navigates to Assessments.

```
/assessments or Chapter completion modal
  ↓
Quiz card: "Chapter 3 Quiz — Skin Analysis"
  15 questions | ~20 min | Must score 75% to pass
  [Start Quiz]
  ↓
/assessments/chapter-3-quiz
  ↓
Full-screen quiz mode (nav hidden, distraction-free)
  ↓
Progress bar: "Question 4 of 15"
Question text (large, readable)
4 answer options (radio buttons, large touch targets)
[Next →] (disabled until answer selected)
  ↓
No going back (prevents second-guessing anxiety, matches state board format)
  ↓
Final question → [Submit Quiz]
  ↓
Calculating... (brief 1.5s animation — not instant, builds anticipation)
  ↓
Results screen:
  Score: 86% ✓ Passed!
  "You passed! 🎉" (confetti if first attempt pass)
  Breakdown: 13/15 correct
  Time taken: 14 min
  [Review Answers] [Continue to Chapter 4]
  ↓
If failed (< 75%):
  Score: 60% — "Not quite yet"
  "You need 75% to pass. Review the material and try again."
  Breakdown shown (which topics were weak)
  [Review Chapter 3] [Retake Quiz] (available after 24hr cooldown)
```

---

## 5. Student Dashboard UX

### 5.1 Above the Fold (Mobile — 375px)

```
┌─────────────────────────────────────┐
│  Good morning, Maya 👋              │
│  🔥 5-day streak — keep it up!      │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │  HOURS PROGRESS               │  │
│  │  ████████░░░░░░░░░░  49/600   │  │
│  │  49.0 hrs logged              │  │
│  │  551 hrs to go                │  │
│  │  On track for June 15 ✓       │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│  CONTINUE LEARNING                  │
│  ┌───────────────────────────────┐  │
│  │  [Thumbnail]                  │  │
│  │  Chapter 3 · Lesson 2         │  │
│  │  Skin Types and Analysis      │  │
│  │  ████████░░  67% complete     │  │
│  │  [Continue →]                 │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│  TODAY'S GOAL                       │
│  ○ Watch 1 lesson (0/1)            │
│  ○ Log 1.5 hours (0/1.5)           │
│  ○ Answer forum question (0/1)     │
└─────────────────────────────────────┘
```

**Below the fold** (scroll to reveal):
- Upcoming quiz reminder (if chapter nearly complete)
- Recent announcements from instructor
- Skills tracker nudge ("2 skills pending submission")
- Weekly activity heatmap (GitHub-style, last 7 days)
- Classmate activity feed ("Jordan completed Chapter 3" — opt-in social)

---

### 5.2 Hours Progress Widget — Design Detail

The hours widget is the **most important element on the dashboard**. It must:
- Show exact hours (49.0, not "~49")
- Show projected completion date (calculated from recent pace)
- Show "on track" / "behind" / "ahead" status with clear color coding
  - On track: green check
  - Behind: amber warning with "You're 3 hrs behind pace — study 30 min today to catch up"
  - Ahead: blue star
- Progress bar uses a gradient fill (brand colors) not a flat bar
- Tapping the widget navigates to `/hours`

---

### 5.3 Empty States

**First day (no hours logged)**:
```
[Illustration: sparkle/star graphic]
"Your journey starts today"
"Log your first session to start tracking your 600 hours."
[Clock In Now →]
```

**No upcoming lessons (course complete)**:
```
[Illustration: graduation cap]
"You've completed all lessons! 🎓"
"Your final exam is ready."
[Take Final Exam →]
```

**No announcements**:
```
"No announcements yet — your instructor will post updates here."
```

---

### 5.4 Streak System

- Streak increments when student logs ≥ 30 minutes of study in a calendar day
- Streak freezes available (1 per week, earned by completing 5-day streaks)
- Streak broken → "Don't break the chain" recovery prompt next morning
- Milestone celebrations: 7 days, 30 days, 60 days, 100 days (full-screen animation)
- Streak displayed in header on mobile (🔥 5) and in dashboard hero

---

### 5.5 Notification System

**Notification types and timing**:
| Trigger | Channel | Timing |
|---|---|---|
| Daily study reminder | Push + in-app | 6 PM if no session that day |
| Streak at risk | Push | 8 PM if no session |
| Hours verified | In-app | Immediate |
| Quiz graded | In-app | Immediate |
| Instructor announcement | Push + in-app | Immediate |
| Practical skill reviewed | In-app + email | Immediate |
| Behind on hours pace | In-app | Monday morning |

Notifications center: Bell icon → slide-down panel (not a new page). Grouped by type. Mark all read. Tap to navigate to relevant context.

---

## 6. Course Player UX

### 6.1 Layout Philosophy

The course player is the **heart of the product**. It must feel like YouTube + Duolingo, not Moodle. Video is primary. Everything else is secondary.

### 6.2 Mobile Course Player Layout

```
┌─────────────────────────────────────┐
│  [← Back]  Ch 3 · L2  [≡ Chapters] │  ← Minimal header
├─────────────────────────────────────┤
│                                     │
│         VIDEO PLAYER                │  ← 16:9, full width
│         (native controls)           │
│                                     │
├─────────────────────────────────────┤
│  Skin Types and Analysis            │  ← Lesson title
│  ⏱ 12 min · Chapter 3              │
├─────────────────────────────────────┤
│  [Overview] [Notes] [Resources]     │  ← Sub-tabs
├─────────────────────────────────────┤
│  OVERVIEW                           │
│  In this lesson you'll learn:       │
│  • The 5 Fitzpatrick skin types     │
│  • How to assess client skin        │
│  • Common conditions by type        │
│                                     │
│  [Mark Complete & Next →]           │
└─────────────────────────────────────┘
```

**Landscape mode**: Video goes full-screen automatically. Tap to reveal controls. Chapter list hidden.

**Chapter drawer** (tap [≡ Chapters]):
- Slides in from right (80% width overlay)
- Shows all chapters, all lessons, completion checkmarks
- Current lesson highlighted
- Tap any lesson to jump (with "Are you sure? You'll lose your place" prompt if mid-video)

---

### 6.3 Desktop Course Player Layout (≥ 1024px)

```
┌──────────────┬──────────────────────────────┬──────────────┐
│ CHAPTER LIST │      VIDEO PLAYER            │  LESSON INFO │
│ (240px)      │      (16:9, fluid)           │  (320px)     │
│              │                              │              │
│ Ch 1 ✓       │  ┌────────────────────────┐ │  Overview    │
│ Ch 2 ✓       │  │                        │ │  Notes       │
│ ▶ Ch 3       │  │   [Video Content]      │ │  Resources   │
│   L1 ✓       │  │                        │ │              │
│   ▶ L2       │  └────────────────────────┘ │  [Complete   │
│   L3         │  [◀ 10s] [▶/⏸] [10s ▶]    │   & Next →]  │
│   L4         │  ████████░░░░░░░░  4:32/12:00│              │
│ Ch 4         │  [CC] [Speed] [Quality] [⛶] │              │
└──────────────┴──────────────────────────────┴──────────────┘
```

---

### 6.4 Video Player Controls

- **Playback speeds**: 0.75x, 1x, 1.25x, 1.5x, 2x (beauty students often rewatch at 0.75x for technique)
- **Closed captions**: Always available, on by default for accessibility
- **Quality**: Auto (adaptive), 1080p, 720p, 480p, 360p
- **Picture-in-picture**: Supported on iOS/Android for multitasking
- **Offline download**: Available for B2C subscribers (premium tier)
- **Skip intro**: If lesson has a standard intro segment (> 30s), show skip button
- **Resume position**: Video resumes from last position automatically
- **Keyboard shortcuts** (desktop): `Space` = play/pause, `←/→` = 10s skip, `F` = fullscreen, `C` = captions, `M` = mute

---

### 6.5 In-Video Quiz Overlay

When a quiz checkpoint is reached, video pauses and overlay appears:

```
┌─────────────────────────────────────┐
│  Quick Check ✓                      │
│  ─────────────────────────────────  │
│  Which Fitzpatrick type burns       │
│  easily and never tans?             │
│                                     │
│  ○ Type I                           │
│  ○ Type II                          │
│  ○ Type III                         │
│  ○ Type IV                          │
│                                     │
│  [Submit Answer]                    │
└─────────────────────────────────────┘
```

- Cannot skip (but can answer and move on)
- Immediate feedback: correct answer highlighted green, wrong answer shown in red with correct answer revealed
- Brief explanation text shown after answer
- "Continue video" appears after 2 seconds
- In-video quiz results do NOT count toward chapter quiz grade (low stakes, learning-focused)

---

### 6.6 Notes Feature

- Inline note-taking tied to video timestamp
- "Add note at 4:32" — note saved with timestamp
- Notes exportable as PDF (great for state board exam prep)
- Instructor can add "instructor notes" visible to all students (pinned at top)

---

### 6.7 Reading Content Lessons

Some lessons are reading-based (not video). Layout:

```
┌─────────────────────────────────────┐
│  [← Back]  Ch 3 · L4  [≡ Chapters] │
├─────────────────────────────────────┤
│  Estimated read: 8 min              │
│  ─────────────────────────────────  │
│  [Article content with headers,     │
│   images, callout boxes]            │
│                                     │
│  Reading progress bar (top of page) │
│                                     │
│  [Mark as Read & Continue →]        │
└─────────────────────────────────────┘
```

Reading progress is tracked (scroll depth ≥ 80% = "read"). Cannot mark complete without scrolling to bottom. This prevents gaming the system.

---

## 7. Assessment UX

### 7.1 Assessment Types

| Type | Frequency | Stakes | Retakes |
|---|---|---|---|
| In-video quiz | Per lesson | Low (ungraded) | Unlimited |
| Chapter quiz | Per chapter | Medium (graded) | After 24hr cooldown |
| Midterm exam | Mid-course | High (graded) | 1 retake max |
| Final exam | End of course | High (must pass) | Instructor-approved |

---

### 7.2 Quiz-Taking Interface

**Pre-quiz screen**:
```
┌─────────────────────────────────────┐
│  Chapter 3 Quiz                     │
│  Skin Analysis                      │
│  ─────────────────────────────────  │
│  📝 15 questions                    │
│  ⏱  ~20 minutes                    │
│  🎯 75% to pass                     │
│  🔄 1 retake available              │
│  ─────────────────────────────────  │
│  Tips:                              │
│  • Read each question carefully     │
│  • You cannot go back              │
│  • Take your time                   │
│  ─────────────────────────────────  │
│  [Start Quiz]                       │
└─────────────────────────────────────┘
```

**Active quiz screen**:
- Full-screen, navigation hidden (prevents distraction)
- Progress bar at top: "Question 4 of 15"
- Timer (optional, shown for timed exams only — not chapter quizzes)
- Question text: 18px minimum, high contrast
- Answer options: Large tap targets (min 48px height), radio button + full-width label tap area
- [Next] button disabled until selection made
- No back navigation (matches state board exam format, reduces anxiety about changing answers)
- Auto-save every answer (if connection drops, progress preserved)

**Question types supported**:
- Single-choice (radio)
- Multiple-choice (checkbox) — clearly labeled "Select all that apply"
- True/False
- Image-based (identify skin condition from photo)
- Matching (drag-and-drop on desktop, tap-to-select on mobile)

---

### 7.3 Results Screen

**Pass state**:
```
┌─────────────────────────────────────┐
│         🎉                          │
│    You passed!                      │
│    86% — Chapter 3 Quiz             │
│  ─────────────────────────────────  │
│  13 correct  ·  2 incorrect         │
│  Time: 14 min 32 sec                │
│  ─────────────────────────────────  │
│  Category breakdown:                │
│  Skin Types      ████████░░  80%    │
│  Conditions      ██████████  100%   │
│  Assessment      ████████░░  80%    │
│  ─────────────────────────────────  │
│  [Review Answers]  [Next Chapter →] │
└─────────────────────────────────────┘
```

**Fail state** (no shame, growth framing):
```
┌─────────────────────────────────────┐
│         📖                          │
│    Almost there!                    │
│    60% — Need 75% to pass           │
│  ─────────────────────────────────  │
│  Focus areas:                       │
│  Skin Types      ████░░░░░░  40%    │  ← Weak area highlighted
│  ─────────────────────────────────  │
│  Recommended:                       │
│  → Re-watch Lesson 2 (Skin Types)   │
│  → Review Chapter 3 reading         │
│  ─────────────────────────────────  │
│  Retake available in: 23:45:12      │
│  [Review Chapter] [Set Reminder]    │
└─────────────────────────────────────┘
```

---

### 7.4 Answer Review Mode

After completing a quiz, students can review all answers:
- Correct answers shown in green
- Incorrect answers shown in red with correct answer highlighted
- Brief explanation for each question (instructor-authored)
- "Flag for question" button (sends question to instructor for clarification)
- Exportable as PDF for study reference

---

## 8. Hour Tracking UX

### 8.1 Design Philosophy

Hour tracking is the **highest-anxiety feature** for students. The UX must:
1. Make the number feel **achievable**, not overwhelming
2. Be **transparent** (every minute accounted for)
3. Be **effortless** (automatic where possible)
4. Be **trustworthy** (students must feel their hours are safe)

---

### 8.2 Hours Dashboard (`/hours`)

```
┌─────────────────────────────────────┐
│  Your Hours                         │
│  ─────────────────────────────────  │
│       ╭──────────────╮              │
│       │   49.0       │              │
│       │   ─────      │              │
│       │   of 600     │              │
│       ╰──────────────╯              │
│       Progress ring (8.2%)          │
│  ─────────────────────────────────  │
│  📅 At your current pace:           │
│     Complete by June 15, 2026       │
│     (77 days from today)            │
│  ─────────────────────────────────  │
│  THIS WEEK                          │
│  Mon  Tue  Wed  Thu  Fri  Sat  Sun  │
│  1.5  2.0  0    1.5  0    0    0    │
│  ─────────────────────────────────  │
│  [Clock In]  [View Full Log]        │
└─────────────────────────────────────┘
```

**Sub-tabs**: `Overview | Log | Export`

---

### 8.3 Hour Log View

```
┌─────────────────────────────────────┐
│  Hour Log                           │
│  [Filter: All ▾] [Month: March ▾]   │
│  ─────────────────────────────────  │
│  March 30, 2026                     │
│  ┌───────────────────────────────┐  │
│  │ 📹 Video Study                │  │
│  │ 2:14 PM – 3:37 PM             │  │
│  │ 1 hr 23 min                   │  │
│  │ Chapter 3, Lessons 1-3        │  │
│  │ ✓ Verified by Dr. Reyes       │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ 📖 Reading                    │  │
│  │ 4:00 PM – 4:30 PM             │  │
│  │ 30 min                        │  │
│  │ Chapter 3 supplemental        │  │
│  │ ⏳ Pending verification        │  │
│  └───────────────────────────────┘  │
│  ─────────────────────────────────  │
│  March 29, 2026                     │
│  [collapsed — tap to expand]        │
└─────────────────────────────────────┘
```

**Session types** (visually distinct icons):
- 📹 Video lesson (auto-tracked)
- 📖 Reading content (auto-tracked)
- ⏱ Manual session (clock-in/out)
- 🏫 In-person practical (instructor-logged)

**Verification states**:
- ✓ Verified (green) — counts toward DPOR total
- ⏳ Pending (yellow) — logged, awaiting instructor
- ⚠️ Flagged (orange) — instructor has a question
- ✗ Rejected (red) — does not count, with reason shown

---

### 8.4 Clock-In / Clock-Out

**Clock In button** (prominent, always accessible from Hours tab):
- Large, full-width button: "Clock In"
- Tap → immediate confirmation toast: "Session started at 2:14 PM"
- Active session indicator appears in bottom tab bar (pulsing dot on Hours tab)
- Header shows session timer (subtle): "⏱ 0:23:14"

**Clock Out**:
- Hours tab shows "Clock Out" (replaces Clock In)
- Tap → Session summary modal (see Flow 4.4)
- If student forgets to clock out → system auto-clocks out after 4 hours of inactivity with a notification: "We clocked you out after 4 hours. Was that right? [Yes] [Edit]"

---

### 8.5 DPOR Export (`/hours/export`)

```
┌─────────────────────────────────────┐
│  Export Hours Report                │
│  ─────────────────────────────────  │
│  For: Virginia DPOR Compliance      │
│  ─────────────────────────────────  │
│  Date range:                        │
│  [Start date ▾]  to  [End date ▾]   │
│                                     │
│  Include:                           │
│  ☑ Verified hours only              │
│  ☑ Session detail (date/time/type)  │
│  ☑ Instructor verification log      │
│  ☐ Unverified hours (pending)       │
│  ─────────────────────────────────  │
│  Format: ● PDF  ○ CSV               │
│  ─────────────────────────────────  │
│  [Generate Report]                  │
│                                     │
│  ⓘ This report meets Virginia       │
│  DPOR hour documentation standards. │
└─────────────────────────────────────┘
```

Generated PDF includes: student name, school name, course, date range, session-by-session log, instructor signature field, total verified hours, Aesthetica platform certification stamp.

---

## 9. Practical Skills Tracker UX

### 9.1 Design Philosophy

Practical skills happen **in person** — this tracker is the bridge between the physical classroom and the digital record. It must feel like a professional portfolio, not a checklist.

---

### 9.2 Skills Tracker Home (`/skills`)

```
┌─────────────────────────────────────┐
│  Practical Skills                   │
│  12 of 45 competencies verified     │
│  ████░░░░░░░░░░░░░░░░  27%          │
│  ─────────────────────────────────  │
│  DPOR COMPETENCY AREAS              │
│  ─────────────────────────────────  │
│  🧴 Skin Care & Facials             │
│     5/12 verified  ██░░░░░░░░  42%  │
│     [View →]                        │
│                                     │
│  💆 Hair Removal                    │
│     3/8 verified   ███░░░░░░░  38%  │
│     [View →]                        │
│                                     │
│  💅 Makeup Application              │
│     2/10 verified  ██░░░░░░░░  20%  │
│     [View →]                        │
│                                     │
│  🔬 Skin Analysis                   │
│     2/7 verified   ██░░░░░░░░  29%  │
│     [View →]                        │
│                                     │
│  🧪 Chemical Services               │
│     0/8 verified   ░░░░░░░░░░   0%  │
│     [View →]                        │
└─────────────────────────────────────┘
```

---

### 9.3 Competency Detail View (`/skills/[competencyId]`)

```
┌─────────────────────────────────────┐
│  [← Skills]  Skin Care & Facials    │
│  5 of 12 verified                   │
│  ─────────────────────────────────  │
│  ✅ Basic cleansing protocol        │
│     Verified Mar 15 · Dr. Reyes     │
│     [View submission]               │
│                                     │
│  ✅ Exfoliation techniques          │
│     Verified Mar 20 · Dr. Reyes     │
│                                     │
│  🟡 Mask application                │
│     Submitted Mar 28 · Pending      │
│     [View submission]               │
│                                     │
│  ⬜ Facial massage techniques       │
│     Not submitted                   │
│     [Submit Evidence →]             │
│                                     │
│  ⬜ High-frequency treatment        │
│     Not submitted                   │
│     [Submit Evidence →]             │
└─────────────────────────────────────┘
```

---

### 9.4 Evidence Submission Flow

Tapping [Submit Evidence] opens a bottom sheet (mobile) / modal (desktop):

```
┌─────────────────────────────────────┐
│  Submit: Facial massage techniques  │
│  ─────────────────────────────────  │
│  DPOR Reference: VA-EST-204.3       │
│  ─────────────────────────────────  │
│  Rubric (what your instructor       │
│  will evaluate):                    │
│  • Proper hand positioning          │
│  • Correct pressure and rhythm      │
│  • Client communication             │
│  • Sanitation compliance            │
│  ─────────────────────────────────  │
│  Upload evidence:                   │
│  [📹 Record Video]                  │
│  [📁 Upload File]                   │
│  ─────────────────────────────────  │
│  Notes (optional):                  │
│  [Performed on mannequin in lab...] │
│  ─────────────────────────────────  │
│  [Submit for Review]  [Cancel]      │
└─────────────────────────────────────┘
```

**Video upload**: Compressed client-side before upload (max 100MB). Progress bar shown. Upload continues in background if user navigates away.

---

### 9.5 Instructor Grading View (Skills)

When instructor reviews a submission:
- Video plays inline
- Rubric criteria shown as a checklist (check each criterion)
- Overall: Pass / Needs Revision
- Feedback text field (required if "Needs Revision")
- [Submit Grade] → student notified immediately

---

## 10. Instructor Dashboard UX

### 10.1 Dashboard Overview (`/instructor/dashboard`)

```
┌─────────────────────────────────────┐
│  Good morning, Dr. Reyes 👋         │
│  Basic Esthetics · Cohort 2026-A    │
│  ─────────────────────────────────  │
│  ⚠️  3 students need attention      │
│  [View At-Risk Students →]          │
│  ─────────────────────────────────  │
│  CLASS HEALTH                       │
│  24 students enrolled               │
│  ████████░░  18 on track            │
│  ████░░░░░░   3 at risk             │
│  ██░░░░░░░░   3 behind              │
│  ─────────────────────────────────  │
│  PENDING ACTIONS                    │
│  ⏱  5 hour sessions to verify      │
│  ✅  3 skill submissions to grade   │
│  📝  2 quiz flags to review         │
│  ─────────────────────────────────  │
│  RECENT ACTIVITY                    │
│  Maya Chen completed Chapter 3      │
│  Jordan Lee submitted Skill #4      │
│  Alex Kim sent you a message        │
└─────────────────────────────────────┘
```

---

### 10.2 Roster View (`/instructor/roster`)

```
┌─────────────────────────────────────┐
│  Roster — 24 Students               │
│  [Search...] [Filter ▾] [Sort ▾]    │
│  ─────────────────────────────────  │
│  ⚠️ AT RISK (3)                     │
│  ┌───────────────────────────────┐  │
│  │ 🔴 Sam Torres                 │  │
│  │ 12.5 hrs · 2.1% · 0 day str  │  │
│  │ Last active: 8 days ago       │  │
│  │ [Message] [View Profile]      │  │
│  └───────────────────────────────┘  │
│  ─────────────────────────────────  │
│  ✅ ON TRACK (18)                   │
│  ┌───────────────────────────────┐  │
│  │ 🟢 Maya Chen                  │  │
│  │ 49.0 hrs · 8.2% · 🔥5 streak │  │
│  │ Last active: Today            │  │
│  │ [Message] [View Profile]      │  │
│  └───────────────────────────────┘  │
│  [Load more...]                     │
└─────────────────────────────────────┘
```

**At-risk criteria** (configurable by admin):
- No login in 7+ days
- More than 10 hours behind pace
- Failed same quiz twice
- Practical skills submission overdue by 2+ weeks

**Bulk actions**: Select multiple students → [Send Message] [Export Selected] [Flag for Review]

---

### 10.3 Individual Student View (`/instructor/roster/[studentId]`)

Full profile showing:
- Hours progress (same widget as student sees)
- Chapter completion map (visual grid — which chapters done)
- Quiz score history (trend line)
- Skills tracker summary
- Session log (last 10 sessions)
- Message thread shortcut
- Notes field (private instructor notes, not visible to student)

---

### 10.4 Gradebook (`/instructor/gradebook`)

```
Spreadsheet-style view (horizontal scroll on mobile):
Student Name | Ch1 | Ch2 | Ch3 | Mid | Ch4 | ... | Final | Avg
─────────────────────────────────────────────────────────────────
Maya Chen    | 92  | 88  | 86  | 91  | --  |     |  --   | 89.3
Jordan Lee   | 78  | 82  | 60* | --  |     |     |       | 73.3
```

- Red asterisk (*) = failed, needs retake
- Click cell to see attempt history
- [Export Gradebook CSV] button
- Filter by: All | Needs Grading | Failed | Passed

---

### 10.5 Announcements (`/instructor/announcements`)

Rich text editor (Notion-style blocks):
- Text, headers, bold/italic
- Embed video link
- Attach file
- Schedule for later
- Target: All students | Specific students | Students behind pace

Preview before sending. Sent announcements archived and searchable.

---

## 11. Marketing Pages UX

### 11.1 Landing Page (`/`)

**Hero (above fold — mobile)**:
```
┌─────────────────────────────────────┐
│  [Logo] Aesthetica                  │
│  [Log in]  [Enroll Now]             │
│  ─────────────────────────────────  │
│                                     │
│  Learn to glow.                     │
│                                     │
│  Virginia's first modern            │
│  esthetics learning platform.       │
│  DPOR-compliant. Mobile-first.      │
│                                     │
│  [Start Learning →]                 │
│  [For Schools →]                    │
│                                     │
│  ★★★★★ "Finally, an LMS that       │
│  doesn't feel like 2008."           │
│  — Maya C., Esthetics Student       │
│                                     │
└─────────────────────────────────────┘
```

**Sections below fold** (in order):
1. **Social proof bar**: Logos of partner schools, "X students enrolled"
2. **Problem/solution**: "Boring LMS → Aesthetica" side-by-side comparison
3. **Feature highlights**: 3 cards (Hour Tracking, Course Player, Skills Tracker)
4. **How it works**: 3-step visual (Enroll → Learn → Get Licensed)
5. **Course preview**: Video thumbnail with play button (shows 60s demo)
6. **Testimonials**: 3 student quotes with photos
7. **Pricing preview**: Simple 2-column (B2C vs School) with [See Full Pricing]
8. **For schools CTA**: "Bring Aesthetica to your school"
9. **FAQ**: Accordion (5 most common questions)
10. **Footer**: Links, Virginia DPOR badge, social icons

---

### 11.2 Pricing Page (`/pricing`)

```
┌─────────────────────────────────────┐
│  Simple, transparent pricing        │
│  ─────────────────────────────────  │
│  [Monthly] ●  ○ [One-time]          │  ← Toggle
│  ─────────────────────────────────  │
│  ┌──────────────┐ ┌──────────────┐  │
│  │ Basic        │ │ Master       │  │
│  │ Esthetics    │ │ Esthetics    │  │
│  │              │ │              │  │
│  │ $49/mo       │ │ $79/mo       │  │
│  │              │ │              │  │
│  │ 600 hrs      │ │ 1200 hrs     │  │
│  │ theory       │ │ theory       │  │
│  │              │ │              │  │
│  │ [Enroll]     │ │ [Enroll]     │  │
│  └──────────────┘ └──────────────┘  │
│  ─────────────────────────────────  │
│  🏫 Are you a school?               │
│  [View School Plans →]              │
│  ─────────────────────────────────  │
│  ✓ 30-day money-back guarantee      │
│  ✓ Cancel anytime                   │
│  ✓ Virginia DPOR compliant          │
└─────────────────────────────────────┘
```

---

### 11.3 School Signup (`/school-signup`)

Multi-step form (wizard):
1. **School info**: Name, address, Virginia license number, DPOR accreditation ID
2. **Admin account**: Name, email, password
3. **Plan selection**: Number of students (seat-based pricing)
4. **Payment**: Stripe, invoice option for schools
5. **Confirmation**: "Welcome! Your school portal is ready."

After signup → admin onboarding wizard (create first instructor, invite first students).

---

### 11.4 Empty State / 404 Page

```
┌─────────────────────────────────────┐
│                                     │
│  [Illustration: magnifying glass    │
│   with sparkle]                     │
│                                     │
│  Oops — this page doesn't exist     │
│                                     │
│  But your glow-up does.             │
│                                     │
│  [Go to Dashboard]  [Go Home]       │
│                                     │
└─────────────────────────────────────┘
```

On-brand, warm, never cold or technical. Logged-in users see "Go to Dashboard." Logged-out users see "Go Home."

---

## 12. Interaction Patterns & Micro-interactions

### 12.1 Loading States

**Skeleton screens** (never spinners for content):
- Dashboard loads skeleton cards (gray animated shimmer) before real content
- Roster loads skeleton rows
- Video player shows thumbnail + loading indicator (not blank black)

**Optimistic updates**:
- Marking a lesson complete → immediate checkmark, syncs in background
- Sending a message → appears immediately, "Sending..." state, then confirmed
- Clocking in → immediate UI update, server confirms in background

**Error recovery**:
- If optimistic update fails → toast: "Couldn't save. Tap to retry." with undo option
- Network offline → banner: "You're offline. Progress will sync when reconnected."

---

### 12.2 Transitions & Animation

**Principles**: Purposeful, fast, never decorative for its own sake. Respect `prefers-reduced-motion`.

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Page navigation | Slide left/right (mobile) | 250ms | ease-in-out |
| Modal open | Slide up from bottom | 300ms | spring (cubic-bezier) |
| Tab switch | Crossfade | 150ms | ease |
| Lesson complete | Checkmark draw + pulse | 400ms | ease-out |
| Quiz correct answer | Green flash + checkmark | 300ms | ease-out |
| Quiz wrong answer | Red flash + shake | 400ms | ease-in-out |
| Streak milestone | Confetti burst (full screen) | 2000ms | ease-out |
| Chapter complete | Card flip + celebration | 600ms | spring |
| Hours update | Number count-up | 800ms | ease-out |
| Progress bar fill | Width transition | 600ms | ease-out |
| Notification badge | Scale pop | 200ms | spring |

**Reduced motion**: All animations replaced with instant state changes. Confetti replaced with static success message.

---

### 12.3 Toast Notifications

Position: Bottom center (mobile), top right (desktop)
Duration: 4 seconds (auto-dismiss), persistent for errors

```
✓ Lesson marked complete          [×]   ← Success (green)
⚠ Quiz retake available tomorrow  [×]   ← Warning (amber)
✗ Upload failed — try again       [Retry] [×]  ← Error (red)
ℹ Dr. Reyes posted an announcement [View] [×]  ← Info (blue)
```

---

### 12.4 Form Patterns

**Inline validation** (not on-blur, on submit):
- Validate on blur for format errors (email, password strength)
- Validate on submit for business logic errors
- Error messages appear below field, in red, with specific guidance
  - ❌ "Invalid email" → ✅ "Enter a valid email like name@example.com"
  - ❌ "Password too short" → ✅ "Password must be at least 8 characters"

**Multi-step forms** (onboarding, school signup):
- Progress indicator at top (steps, not percentage)
- "Back" always available (except payment confirmation)
- Form state preserved if user navigates away (localStorage)
- Each step validates before advancing

**Auto-save** (notes, profile, settings):
- Debounced 1.5s after last keystroke
- "Saved" indicator appears briefly (not a toast — too noisy)
- "Saving..." during active save

---

### 12.5 Empty States (Complete List)

| Screen | Empty State Message | CTA |
|---|---|---|
| Dashboard (new student) | "Your journey starts today" | Clock In Now |
| Hour log (no sessions) | "No sessions logged yet" | Clock In |
| Forum (no threads) | "Be the first to ask a question" | Start a Thread |
| Messages (no conversations) | "No messages yet" | Message Instructor |
| Skills (no submissions) | "Start tracking your practical skills" | View Competencies |
| Gradebook (no grades) | "Grades will appear as students complete quizzes" | — |
| Roster (no students) | "No students enrolled yet" | Invite Students |
| Notifications (all read) | "You're all caught up! ✓" | — |
| Search results (no match) | "No results for '[query]'" | Clear Search |

---

### 12.6 Confirmation Patterns

**Destructive actions** require confirmation:
- Delete account → Modal: "Are you sure? This cannot be undone." [Delete] [Cancel]
- Remove student from cohort → Modal with consequences listed
- Reject practical submission → Requires feedback text before confirming

**Non-destructive actions** use optimistic UI (no confirmation needed):
- Mark lesson complete
- Clock in/out
- Send message
- Submit quiz answer

---

## 13. Accessibility Requirements (WCAG 2.1 AA)

### 13.1 Color & Contrast

- **Normal text**: Minimum 4.5:1 contrast ratio against background
- **Large text** (18px+ or 14px+ bold): Minimum 3:1 contrast ratio
- **UI components** (buttons, form borders, icons): Minimum 3:1 contrast ratio
- **Focus indicators**: Minimum 3:1 contrast ratio, visible on all interactive elements
- **Never use color alone** to convey meaning — always pair with icon, text, or pattern
  - ✓ "Verified" (green + checkmark + text)
  - ✗ "Verified" (green only)
- **Dark mode**: Verify all contrast ratios independently — do not assume light mode ratios transfer

**Brand color accessibility requirements**:
- Primary brand color must be tested against both white and dark backgrounds
- Progress bars must have sufficient contrast between filled and unfilled states
- Status colors (red/amber/green) must be distinguishable for color-blind users (use patterns or icons)

---

### 13.2 Keyboard Navigation

Every interactive element must be reachable and operable via keyboard:

- **Tab order**: Logical, follows visual reading order (left-to-right, top-to-bottom)
- **Focus trap**: Modals and drawers trap focus within themselves
- **Focus restoration**: When modal closes, focus returns to the element that opened it
- **Skip links**: "Skip to main content" link as first focusable element on every page
- **Custom components**: All custom UI (video player, quiz, skills tracker) must have full keyboard support

**Video player keyboard shortcuts**:
- `Space` / `K` = play/pause
- `←` / `J` = rewind 10s
- `→` / `L` = forward 10s
- `↑` / `↓` = volume up/down
- `M` = mute/unmute
- `F` = fullscreen
- `C` = toggle captions
- `Escape` = exit fullscreen

**Quiz keyboard support**:
- `1-4` = select answer option
- `Enter` = confirm selection / next question
- `Tab` = cycle through options

---

### 13.3 Screen Reader Support

**Semantic HTML first**:
- `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>` landmarks on every page
- `<h1>` through `<h6>` hierarchy maintained (never skip levels)
- `<button>` for actions, `<a>` for navigation (never `<div onClick>`)
- `<form>` with `<label>` for every input (never placeholder-only labels)

**ARIA requirements**:
- `aria-live="polite"` for dynamic content updates (hours counter, notifications)
- `aria-live="assertive"` for critical alerts (quiz timer, error messages)
- `aria-label` on icon-only buttons: `<button aria-label="Close modal">[×]</button>`
- `aria-expanded` on accordion/drawer triggers
- `aria-current="page"` on active navigation items
- `aria-describedby` linking form fields to error messages
- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on all progress bars
- `aria-busy="true"` during loading states

**Video player accessibility**:
- Closed captions: Required for all video content (WCAG 1.2.2)
- Audio descriptions: Required for video with visual-only information (WCAG 1.2.5)
- Transcript: Available for all lessons (downloadable)
- Caption quality: Auto-generated + human-reviewed for accuracy

---

### 13.4 Touch & Motor Accessibility

- **Minimum touch target**: 44×44px for all interactive elements (Apple HIG standard)
- **Spacing between targets**: Minimum 8px between adjacent touch targets
- **Gesture alternatives**: All swipe gestures have button alternatives
- **No time limits**: Quiz timers (if used) must be extendable (WCAG 2.2.1)
- **Drag-and-drop**: All drag interactions have keyboard/tap alternatives
- **No motion triggers**: No interactions triggered by device motion/shaking

---

### 13.5 Cognitive Accessibility

- **Plain language**: Reading level ≤ Grade 8 for UI copy (not course content)
- **Consistent navigation**: Same nav structure on every page, same order
- **Error prevention**: Confirmation dialogs for destructive actions
- **Clear labels**: No mystery icons without labels in primary navigation
- **Progress visibility**: Always show where user is in multi-step flows
- **Timeout warnings**: If session expires, warn 5 minutes before with option to extend

---

### 13.6 Accessibility Testing Checklist

Before any page ships:
- [ ] Automated: axe-core or Lighthouse accessibility audit (zero critical violations)
- [ ] Manual: Tab through entire page with keyboard only
- [ ] Manual: Test with VoiceOver (iOS) and TalkBack (Android)
- [ ] Manual: Test with macOS VoiceOver + Safari
- [ ] Manual: Zoom to 200% — no content loss or overlap
- [ ] Manual: Test with Windows High Contrast mode
- [ ] Manual: Verify all form error messages are announced
- [ ] Manual: Verify focus management in all modals/drawers

---

## 14. Mobile UX Principles

### 14.1 Breakpoints

| Name | Width | Layout |
|---|---|---|
| `xs` | 375px | Single column, bottom tab bar |
| `sm` | 640px | Single column, bottom tab bar |
| `md` | 768px | Two column possible, bottom tab bar |
| `lg` | 1024px | Sidebar nav appears, tab bar hidden |
| `xl` | 1280px | Full desktop layout, persistent panels |
| `2xl` | 1536px | Max content width (1280px), centered |

---

### 14.2 Mobile-First Design Rules

1. **Content first**: Every page designed for 375px first. Desktop is an enhancement.
2. **Thumb zone**: Primary actions in bottom 40% of screen (thumb reach). Destructive actions in top 30% (requires deliberate reach).
3. **One primary action per screen**: Never two equal-weight CTAs on mobile.
4. **Tap targets**: 44px minimum. Prefer 48px for primary actions.
5. **No hover states as primary affordance**: All hover interactions must have tap equivalents.
6. **Swipe gestures**: Swipe right to go back (matches iOS/Android conventions). Swipe up for more content. Never swipe left for navigation (conflicts with iOS back gesture).
7. **Bottom sheets over modals**: On mobile, use bottom sheets (slide up from bottom) instead of centered modals. Easier to dismiss, more thumb-friendly.
8. **Sticky CTAs**: Primary action buttons stick to bottom of screen on long-scroll pages (e.g., "Continue to Next Lesson" sticks while reading lesson overview).

---

### 14.3 Video on Mobile

- **Autoplay**: Muted autoplay in feed contexts (dashboard preview). Full audio on lesson page.
- **Orientation**: Support both portrait and landscape. Landscape → full-screen automatically.
- **Buffering**: Show skeleton/thumbnail during buffer. Never blank black screen.
- **Data saver mode**: Detect `Save-Data` header → offer lower quality default, disable autoplay.
- **Background audio**: When user locks phone mid-lesson, audio continues (like a podcast).
- **Picture-in-picture**: Supported on iOS 14+ and Android 8+. Show PiP button in player controls.
- **Download for offline**: Premium feature. Downloaded lessons stored locally, accessible without connection.

---

### 14.4 Mobile Performance Targets

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.5s on 4G |
| Largest Contentful Paint | < 2.5s on 4G |
| Time to Interactive | < 3.5s on 3G |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |
| Lighthouse Performance | ≥ 90 |

**Implementation requirements**:
- Images: Next.js `<Image>` with explicit `width`/`height` (prevents CLS)
- Fonts: `font-display: swap`, preload critical fonts
- Video: Lazy load below-fold videos, preload first-frame thumbnail
- Code splitting: Route-based splitting (Next.js App Router default)
- Service Worker: Cache static assets, offline fallback page

---

### 14.5 Mobile-Specific Interaction Patterns

**Pull to refresh**: On dashboard, hour log, roster — standard pull-to-refresh gesture.

**Infinite scroll vs. pagination**:
- Infinite scroll: Forum threads, notification list, activity feed
- Pagination: Gradebook, compliance reports, user management (data-dense, needs orientation)

**Haptic feedback** (where supported):
- Clock in/out: Medium impact
- Lesson complete: Success notification haptic
- Quiz correct: Light impact
- Quiz wrong: Error haptic (double tap)
- Streak milestone: Heavy impact

**Swipe actions on list items**:
- Hour log entries: Swipe left → [Flag] [Edit]
- Messages: Swipe left → [Archive] [Delete]
- Notifications: Swipe left → [Dismiss]

---

### 14.6 Offline Behavior

| Feature | Offline behavior |
|---|---|
| Dashboard | Show cached data with "Last updated X min ago" banner |
| Video lessons | Play if downloaded; show "Download to watch offline" if not |
| Reading content | Show cached version |
| Quizzes | Block with "Quizzes require a connection" message |
| Hour log | Show cached log; clock-in queued for sync |
| Forum | Show cached threads; posting queued for sync |
| Messages | Show cached messages; sending queued for sync |

Sync queue indicator: When reconnected, show "Syncing 3 items..." progress toast.

---

## Appendix A: UX Heuristics Audit Summary

| Heuristic | Implementation |
|---|---|
| Visibility of system status | Hours counter always visible, session timer in header, progress bars everywhere |
| Match system to real world | "Clock in/out" mirrors physical timeclock; "cohort" mirrors classroom language |
| User control and freedom | Back always works, undo on optimistic updates, session edit after auto-clock-out |
| Consistency and standards | Same nav patterns, same card styles, same button hierarchy throughout |
| Error prevention | Confirmation on destructive actions, inline validation, auto-save |
| Recognition over recall | Chapter list always accessible in player, breadcrumbs in deep nav |
| Flexibility and efficiency | Keyboard shortcuts in player, bulk actions in gradebook, Cmd+K search |
| Aesthetic and minimalist | Every element serves a purpose; no decorative chrome |
| Help recover from errors | Specific error messages with next steps, retry buttons, support link |
| Help and documentation | Contextual help tooltips, onboarding tour, FAQ on marketing pages |

---

## Appendix B: Virginia DPOR Compliance UX Checklist

- [ ] Hours counter visible on every student-facing screen (dashboard widget)
- [ ] Clock-in/clock-out events logged with timestamp and activity type
- [ ] Verified vs. unverified hours clearly distinguished in UI
- [ ] DPOR export available to students at `/hours/export`
- [ ] DPOR export available to instructors at `/instructor/hours` (for any student)
- [ ] DPOR export available to admins at `/admin/compliance`
- [ ] Practical skills checklist maps to named DPOR competency areas (with reference codes)
- [ ] Instructor verification required before hours count toward DPOR total
- [ ] Audit trail: every hour event is immutable (cannot be deleted, only flagged)
- [ ] Export PDF includes: student name, school, course, date range, session log, instructor verification, platform certification

---

*Document version 1.0 — Aesthetica UX & IA Specification*
*Next: UI Designer to produce visual design system and component specifications*
*Then: FE Engineer to implement with Next.js 15 App Router + Tailwind + shadcn/ui*
