# Discovery: Aesthetica — VA Aesthetics LMS 2026

**Brand**: Aesthetica  
**Tagline**: *"Learn to glow."*  
**Target Reference**: https://miladycima.com (functionality reference only — not copying design/content)  
**New Platform**: Virginia State-Qualified Aesthetic Learning Portal  
**Discovery Date**: March 30, 2026  
**Purpose**: Define core functionality, compliance requirements, competitive positioning, and brand direction for a fully original 2026 rebuild

---

## 1. Virginia State Licensing Requirements

### Basic Esthetician License (VA DPOR — Board for Barbers and Cosmetology)
- **Governing Body**: Virginia DPOR (Department of Professional and Occupational Regulation), Board for Barbers and Cosmetology
- **Regulations**: Title 54.1, Chapter 7 — Esthetics Regulations (18VAC41-70), last updated August 2025
- **Minimum Age**: 16 years old
- **Education Prerequisite**: High school diploma or GED
- **Training Hours Required**: **600 hours** at a VA state-approved esthetics school
- **Exam**: Written + practical examinations administered by PSI (passing score: 75%)
- **Exam Fee**: ~$80–90 per exam
- **Content Areas**: Skin anatomy/chemistry, facial treatments, hair removal, product chemistry, sanitation protocols, Virginia state laws

### Master Esthetician License (VA DPOR)
- **Additional Hours**: +600 hours of training beyond basic license (1,200 total)
- **Advanced Procedures**: Medical-adjacent treatments, advanced chemical applications, laser/light therapies
- **Salary Premium**: Significantly higher earning potential over basic license

### Instructor License
- **Requirements**: 400 hours of specialized coursework + state board examinations
- **Opportunity**: Teach at state-approved schools

### Key Compliance Implications for the Platform
1. **Hour Tracking**: Platform must accurately log and report student hours for DPOR compliance
2. **Curriculum Alignment**: Course content must align with DPOR-approved curriculum topics
3. **School Approval**: The platform itself must be used within or partner with VA state-approved schools
4. **Record Keeping**: Student progress records must be maintainable for licensing applications
5. **Practical Component**: Online platform covers theory; practical skills require in-person supervised hours

---

## 2. Competitive Landscape

### Tier 1: Direct LMS Competitors (Theory Content Delivery)
| Provider | Model | Pricing | Weakness |
|----------|-------|---------|----------|
| **Milady CIMA** | School-licensed LMS (Matrix/Excalibur) | ~$100–150/student (bundled w/ textbook) | Dated UX, no mobile-first, proprietary lock-in |
| **Pivot Point** | School-licensed LMS + print | ~$90–130/student | Limited interactivity, aging platform |
| **Paul Mitchell Schools** | Proprietary — not licensed externally | N/A | Not a competitor for licensing |
| **Cengage (parent of Milady)** | B2B school licensing | Enterprise | Heavy institutional sales cycle |

### Tier 2: General LMS Platforms (Not Beauty-Specific)
| Platform | Model | Starting Price | Beauty-Specific? |
|----------|-------|---------------|-----------------|
| **TalentLMS** | Per user bands | ~$119/mo (40 users) | No |
| **LearnWorlds** | Feature tiers | ~€79/mo | No |
| **Teachable** | Per product + fees | ~$29/mo + 7.5% | No |
| **MoodleCloud** | Capacity-based | ~$230 AUD/yr | No |
| **Kajabi** | Products + contacts | ~$143/mo | No |

### Tier 3: Emerging Competitors
| Provider | Focus | Note |
|----------|-------|------|
| **Lumion.ai** | Cosmetology school SaaS (enrollment, payments, reporting) | 400+ trade schools, business ops focus |
| **V-Unite** | Medical aesthetics training platform | B2B brands/providers |
| **Regulated Academy** | Beauty cert creator platform | B2C individual creators |

### Key Competitive Gaps (Our Opportunity)
1. **No mobile-first VA-specific aesthetics LMS exists** — all incumbents are desktop-era
2. **No modern UX** — Milady CIMA and Pivot Point feel like 2010 software
3. **No AI tutoring** in any current aesthetics LMS
4. **No social/community features** that Gen Z learners expect (Discord-generation)
5. **No transparent, student-facing pricing** — all B2B school licensing is opaque
6. **Practical skill tracking** is primitive — no video submissions, no rubric feedback
7. **No gamification** — no streaks, badges, or learning momentum features

---

## 3. Monetization Analysis & Strategy

### Incumbent Model (What We're Replacing)
- **B2B Only**: Schools buy annual licenses, bundle with physical textbooks
- **Per-student fee**: ~$100–150/student, one-time access for course duration
- **Drawbacks**: Long sales cycles, school decides (not student), no recurring revenue

### Competitive Monetization Models Analyzed
| Model | Examples | Best For | Risk |
|-------|----------|----------|------|
| Per active user/month | iSpring (~$7/user/mo) | Orgs with steady usage | Spikes = cost unpredictability |
| Tiered feature plans | LearnWorlds, TalentLMS | Schools wanting predictable cost | Feature gaps drive churn |
| Per product + transaction fee | Teachable | Solo educators | 7.5% fee punishes growth |
| Flat capacity model | MoodleCloud | Fixed-size cohorts | Rigid, no revenue upside |
| B2B enterprise custom | Milady/Pivot Point | Large school chains | Slow, no direct learner connection |

### Recommended Monetization Strategy: **Hybrid B2B2C**

#### Tier 1: Schools (B2B) — Primary Revenue
- **School License**: Annual subscription per seat
  - Starter: $49/student/yr (up to 50 students)
  - Growth: $39/student/yr (51–200 students)
  - Enterprise: $29/student/yr (200+ students, custom contract)
- **Includes**: All core LMS features, hour tracking, DPOR report exports, instructor dashboard
- **Differentiator vs. Milady**: No physical textbook required (saves schools $40–60/student), instant updates, digital-native

#### Tier 2: Individual Learners (B2C) — Secondary Revenue (Disruptive)
- **Direct Enrollment**: Students can enroll without going through a school
  - Monthly: $29/mo (cancel anytime)
  - Annual: $199/yr (~$16.60/mo — saves 43%)
- **Earn while you learn**: Students can access theory content independently, then affiliate with a VA-approved practical training partner
- **Competitive disruption**: No incumbent offers this — locks in students before schools do

#### Tier 3: Continuing Education (CE) — Recurring Revenue
- **CE Courses**: Individual course purchases for licensed estheticians
  - Per course: $19–49 (3–8 CE hours)
  - CE Bundle Pass: $99/yr (unlimited access to CE library)
- **VA Renewal Requirement**: Licensed estheticians need CE hours for renewal — captive recurring market

#### Tier 4: Institutional Add-Ons (Upsell)
- **Analytics Dashboard Pro**: Advanced cohort analytics, at-risk student alerts — $10/seat/yr
- **White Label**: School branding on platform — $500/yr flat fee
- **API Access**: SIS integration (Student Information Systems) — $200/yr
- **Practical Assessment Module**: Video submission + rubric grading tools — $5/seat/yr

### Revenue Model Summary
```
Year 1 Goal: 10 schools × 50 students avg × $49 = $24,500 ARR
             + 200 B2C students × $199 = $39,800 ARR  
             + CE sales = ~$5,000
             Total: ~$70,000 ARR (conservative)

Year 2 Goal: 30 schools × 75 students avg × $44 = $99,000 ARR
             + 500 B2C × $199 = $99,500 ARR
             + CE pass holders = ~$15,000
             Total: ~$215,000 ARR
```

---

## 4. Core Platform Functionality (Definitive Feature Set)

### Module 1: Authentication & Onboarding
- Email/password + social login (Google)
- Role-based access: Student, Instructor, School Admin, Platform Admin
- School enrollment flow (code or invite link)
- Direct B2C enrollment flow (Stripe checkout)
- Onboarding checklist for new students

### Module 2: Course Content Engine
- **Course Structure**: Program → Module → Chapter → Lesson → Activity
- **Content Types**: Video (streamed), Reading (HTML), Interactive quiz, Flashcards, Downloadable PDF
- **VA Curriculum Alignment**: Tag lessons to DPOR topic areas
- **Progress Tracking**: % complete per chapter, module, full program
- **Resume**: "Continue where you left off" on every session

### Module 3: Assessment Engine
- Multiple choice, true/false, matching, fill-in-blank
- Timed and untimed modes
- Instant feedback with explanations
- Retake policies (configurable per course)
- Practice mode vs. graded mode

### Module 4: Hour Tracking & Compliance
- Automatic clock-in when student enters a lesson
- Clock-out on lesson exit or idle timeout (15 min)
- Daily, weekly, total hour logs per student
- DPOR-compliant hour report export (PDF + CSV)
- Instructor verification sign-off on hour reports
- Fraud detection: Cannot accumulate hours during inactivity

### Module 5: Practical Skill Tracker
- Skill checklist per DPOR competency area
- Instructor marks skills as "observed and passed" with date
- Video submission: Students upload short clips of technique practice
- Rubric-based scoring by instructor
- Portfolio of completed skills for licensing application

### Module 6: Communication & Community
- **Announcements**: School/instructor broadcasts to class
- **Discussion Forums**: Per-chapter Q&A threads
- **Direct Messaging**: Student ↔ Instructor
- **Study Groups**: Peer learning pods (3–8 students)
- **Live Sessions**: Scheduled Zoom/Google Meet integration for virtual office hours

### Module 7: Instructor & Admin Dashboard
- Class roster with individual progress overview
- Grade book (quiz scores, assignment grades)
- Hour verification and reporting
- Content management (publish/unpublish lessons)
- Cohort management (create/manage class groups)
- At-risk student alerts (falling behind on hours or failing quizzes)

### Module 8: Student Dashboard
- Daily learning streak tracker
- Progress overview: hours logged, lessons complete, quiz averages
- Upcoming due dates
- Notifications center
- Certificate generation (upon course completion + hours verified)

### Module 9: Monetization & Billing
- Stripe integration for B2C subscriptions and CE purchases
- School admin billing portal (invoice, seat management)
- Coupon/promo code system
- Free trial: 7-day access to Chapter 1 (no CC required)

---

## 5. 2026 Differentiators (What Makes This Different)

### AI Tutor ("Lumina")
- In-lesson AI assistant that answers questions about the current topic
- Powered by RAG over course content (no hallucination risk)
- Suggests related lessons and practice quizzes
- Tracks concepts students struggle with, surfaces them in flashcard review

### Microlearning Mode
- Each lesson broken into ≤10 min segments
- "Daily 15" — curated 15-minute daily learning session
- Spaced repetition for knowledge retention (flashcard reviews resurface after 1, 3, 7, 14 days)

### Mobile-First Design
- Full feature parity on mobile (375px+)
- Offline mode: Download lessons for offline viewing (video cached)
- Push notifications for streaks, due dates, new content

### Social Learning
- Leaderboard (optional, school-configurable)
- Badges: First lesson, 7-day streak, module complete, exam passed
- Study Pod feature: Accountability groups with shared goals

### Modern Video Experience
- Powered by Mux (not Flowplayer — modern, adaptive bitrate)
- Playback speed control (0.75×–2×)
- Closed captions (auto-generated)
- In-video knowledge checks (pause video → answer question → continue)
- Chapter markers within long videos

---

## 6. Brand Concept

### Name: **Aesthetica**

**Rationale**:
- From "aesthetics" — immediately communicates the domain (beauty/skin/esthetics education)
- Premium, elevated feel — sounds like a high-end brand, not a textbook publisher
- Existing USPTO trademark #76531699 covers Class 009 CAD/aerospace software only — no conflict with Class 041 (Education Services)
- Short, memorable, professional, internationally understood
- Does NOT reference Milady, CIMA, Cengage, or any existing competitor
- **Note**: Obtain IP attorney clearance in Class 041 before public launch

**Tagline**: *"Learn to glow."*

**Brand Voice**:
- Warm but professional
- Empowering — speaks to the student's future, not just the curriculum
- Modern and approachable — not institutional/textbook-dry
- Inclusive — designed for all aesthetics learners, not a single publisher's ecosystem

**Visual Direction** (for design system phase):
- Primary palette: Warm champagne/sand tones + deep plum accent (skin-forward, premium)
- Typography: Clean modern sans for body, elegant serif accent for headers
- Iconography: Lucide icons, no emoji
- Photography style: Real students, diverse skin tones, professional environments
- Dark mode: Supported (plum + warm cream on dark surface)

---

## 7. Initial Course Scope (2 Courses for Launch)

### Course 1: Basic Esthetics Theory (VA — 600 hours)
**Target**: New students pursuing VA Basic Esthetician License  
**Structure**: 12 modules × ~50 hours each = 600 curriculum hours  
**Modules** (aligned to DPOR 18VAC41-70):
1. Professionalism & Virginia State Laws
2. Sanitation, Sterilization & Safety
3. Skin Anatomy & Physiology
4. Skin Analysis & Conditions
5. Facial Treatments & Techniques
6. Hair Removal (Waxing, Threading, Sugaring)
7. Product Chemistry & Ingredients
8. Makeup Application Fundamentals
9. Electrical & Mechanical Equipment
10. Body Treatments & Spa Services
11. Business & Client Relations
12. Exam Prep & Practical Review

### Course 2: Master Esthetics Theory (VA — additional 600 hours)
**Target**: Licensed Basic Estheticians pursuing VA Master License  
**Prerequisite**: Completion of Course 1 + active Basic license  
**Structure**: 12 advanced modules × ~50 hours each  
**Modules** (advanced DPOR competencies):
1. Advanced Skin Science & Aging
2. Chemical Peels & Exfoliation
3. Microdermabrasion & Resurfacing
4. Laser, Light & Energy-Based Devices
5. Medical Esthetics & Dermatology Interface
6. Advanced Facial Massage & Lymphatic Drainage
7. Acne Pathology & Treatment Protocols
8. Hyperpigmentation & Brightening Treatments
9. Wellness & Holistic Esthetics
10. Advanced Product Formulation & Lab
11. Practice Management & Entrepreneurship
12. Advanced Exam Prep & Case Studies

---

## 8. Technical Stack (Recommended)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 + App Router | SEO, streaming, RSC performance |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid, consistent, accessible |
| **Video** | Mux (streaming + storage) | Modern, adaptive bitrate, analytics |
| **Auth** | NextAuth.js (v5) | Flexible: email, Google, future SSO |
| **Database** | PostgreSQL (Supabase) | ACID compliance for hour tracking |
| **ORM** | Prisma | Type-safe, migration management |
| **Payments** | Stripe | Subscriptions + one-time purchases |
| **Email** | Resend + React Email | Transactional emails |
| **AI Tutor** | OpenAI API + RAG (Pinecone) | Grounded AI responses |
| **File Storage** | Cloudflare R2 | PDFs, skill videos |
| **Deployment** | Vercel | Next.js native, edge functions |
| **Analytics** | PostHog | Product analytics, session replay |

---

## 9. What We Are NOT Building (Copyright/Legal Guardrails)

To avoid copyright, trademark, or trade dress violations:

- **No copying of Milady textbook content** — all course text must be original or licensed from VA DPOR public curriculum documents
- **No use of Milady, CIMA, Pivot Point, or Cengage branding, colors, logos**
- **No replication of Excalibur/Matrix UI patterns** — build entirely from new design system
- **No scraping or re-publishing of existing course content** — commission original content
- **Original photography only** — no stock that appears in competitor materials
- **Original assessment questions** — not copied from Milady study guides

**Safe to reference/use**:
- DPOR's publicly published curriculum requirements and competency lists
- Virginia state law (public domain)
- General industry knowledge not owned by any publisher
- Our own originally authored content

---

## 10. Open Questions / Decisions Needed

1. **Content authoring**: Who writes the course content? (Must be original — licensed esthetics educators?)
2. **VA school partnerships**: Do we have existing school relationships for B2B launch?
3. **Practical hours**: Partner with specific VA schools for in-person component, or refer out?
4. **DPOR approval process**: Does the platform need formal DPOR approval, or just the schools using it?
5. **AI Tutor scope for MVP**: Full RAG implementation, or simpler FAQ bot for v1?
6. **Offline video**: Implement in v1 or v2?

---

## Summary

**Platform**: **Lumio** — VA-state-qualified aesthetic learning portal  
**Tagline**: *"Learn to glow."*  
**Launch Courses**: Basic Esthetics Theory (600 hrs) + Master Esthetics Theory (600 hrs)  
**Target Users**: VA aesthetics students, licensed estheticians, VA-approved schools  
**Monetization**: Hybrid B2B2C — school licensing + direct student subscriptions + CE recurring  
**Tech Stack**: Next.js 15 + Supabase + Mux + Stripe + OpenAI  
**Key Differentiators**: Mobile-first, AI tutor, hour compliance tracking, modern UX, direct student access  
**Legal Safety**: 100% original content, brand, and design — no Milady/Cengage IP used
