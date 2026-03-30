# Aesthetica — Backend & Infrastructure Specification

## 1. Architecture Overview

### 1.1 System topology
- **Frontend**: Next.js 15 App Router (Vercel-hosted)
- **Backend application layer**: Next.js Route Handlers + Server Actions
- **Database**: PostgreSQL (managed, SSL enforced)
- **ORM**: Prisma 6.x (`@prisma/client`)
- **Auth**: Auth.js / NextAuth v5 (JWT strategy)
- **Billing**: Stripe subscriptions + webhooks
- **Video**: Mux asset/upload/playback + webhooks
- **Email**: Resend + React Email templates
- **File storage**: Vercel Blob or S3-compatible bucket via signed URLs
- **Observability**: structured logs + webhook event ledger + audit log

### 1.2 Core domains
- Multi-tenant school management (`School`, `SchoolMembership`)
- LMS content (`Course`, `Module`, `Chapter`, `Lesson`, `Activity`)
- Learning progress (`Enrollment`, `LessonProgress`)
- Time tracking / practical hours (`HourSession`, `HourEvent`, `HourVerification`)
- Assessments (`Assessment*` models)
- Skills & submissions (`PracticalSkill`, `SkillChecklistItem`, `SkillSubmission`)
- Communication (`Discussion*`, `DirectMessage*`, `Notification`)
- Billing & invoices (`Subscription`, `Invoice`, `InvoiceLineItem`)
- Media/files (`FileObject`, `MuxAsset`)
- Compliance & AI support (`AuditLog`, `DporReport`, `ContentChunk`, `AiTutor*`)

### 1.3 Service boundaries
- Route handlers for externally-called interfaces (webhooks, signed upload URL APIs)
- Server Actions for authenticated first-party mutations
- Database access through domain services in `src/lib/services/*`
- Job/idempotency handling backed by `WebhookEvent` table

---

## 2. Database Schema (full Prisma models)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  STUDENT
  INSTRUCTOR
  ADMIN
}

enum SchoolMembershipRole {
  STUDENT
  INSTRUCTOR
  ADMIN
  OWNER
}

enum CourseVisibility {
  DRAFT
  PRIVATE
  PUBLISHED
  ARCHIVED
}

enum LessonType {
  VIDEO
  READING
  QUIZ
  PRACTICAL
}

enum EnrollmentStatus {
  ACTIVE
  COMPLETED
  WITHDRAWN
  PAUSED
}

enum HourSessionStatus {
  RUNNING
  PAUSED
  SUBMITTED
  VERIFIED
  REJECTED
}

enum HourEventType {
  START
  HEARTBEAT
  PAUSE
  RESUME
  STOP
  MANUAL_ADJUST
  GEO_CHECK
}

enum AssessmentType {
  QUIZ
  EXAM
  PRACTICAL
}

enum AssessmentQuestionType {
  MULTIPLE_CHOICE
  TRUE_FALSE
  SHORT_ANSWER
  MULTI_SELECT
}

enum AssessmentAttemptStatus {
  IN_PROGRESS
  SUBMITTED
  GRADED
  EXPIRED
}

enum ThreadScope {
  COURSE
  CHAPTER
  GLOBAL
}

enum NotificationType {
  SYSTEM
  MESSAGE
  FORUM_REPLY
  ASSESSMENT_GRADED
  BILLING
  HOURS_REVIEW
}

enum SubscriptionStatus {
  INCOMPLETE
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
  UNPAID
}

enum FileObjectKind {
  AVATAR
  DOCUMENT
  LESSON_ATTACHMENT
  SUBMISSION_MEDIA
  EXPORT
}

model User {
  id                String              @id @default(cuid())
  email             String              @unique
  emailVerified     DateTime?
  passwordHash      String?
  name              String?
  image             String?
  role              UserRole            @default(STUDENT)
  defaultSchoolId   String?
  locale            String              @default("en")
  timezone          String              @default("UTC")
  isActive          Boolean             @default(true)
  lastSeenAt        DateTime?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt

  defaultSchool     School?             @relation("DefaultSchool", fields: [defaultSchoolId], references: [id])
  accounts          Account[]
  sessions          Session[]
  memberships       SchoolMembership[]
  enrollments       Enrollment[]
  lessonProgress    LessonProgress[]
  hourSessions      HourSession[]
  hourEvents        HourEvent[]
  hourVerifications HourVerification[]  @relation("Verifier")
  assessmentAttempts AssessmentAttempt[]
  assessmentAnswers AssessmentAnswer[]
  skillSubmissions  SkillSubmission[]
  discussionThreads DiscussionThread[]
  discussionPosts   DiscussionPost[]
  initiatedDmThreads DirectMessageThread[] @relation("DmInitiator")
  sentMessages      DirectMessage[]
  notifications     Notification[]
  subscriptions     Subscription[]
  invoices          Invoice[]
  dporReports       DporReport[]
  aiConversations   AiTutorConversation[]
  aiMessages        AiTutorMessage[]
  auditLogs         AuditLog[]          @relation("ActorLogs")
}

model Account {
  id                 String   @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model School {
  id                 String              @id @default(cuid())
  name               String
  slug               String              @unique
  subdomain          String?             @unique
  logoUrl            String?
  contactEmail       String?
  phone              String?
  timezone           String              @default("UTC")
  countryCode        String?
  isActive           Boolean             @default(true)
  settingsJson       Json?
  stripeCustomerId   String?             @unique
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt

  defaultUsers       User[]              @relation("DefaultSchool")
  memberships        SchoolMembership[]
  courses            Course[]
  assessments        Assessment[]
  skills             PracticalSkill[]
  threads            DiscussionThread[]
  dmThreads          DirectMessageThread[]
  notifications      Notification[]
  subscriptions      Subscription[]
  invoices           Invoice[]
  fileObjects        FileObject[]
  muxAssets          MuxAsset[]
  hourVerifications  HourVerification[]
  webhookEvents      WebhookEvent[]
  dporReports        DporReport[]
  contentChunks      ContentChunk[]
  aiConversations    AiTutorConversation[]
  auditLogs          AuditLog[]
}

model SchoolMembership {
  id          String                @id @default(cuid())
  schoolId    String
  userId      String
  role        SchoolMembershipRole
  isActive    Boolean               @default(true)
  joinedAt    DateTime              @default(now())
  archivedAt  DateTime?

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([schoolId, userId])
  @@index([userId])
}

model Course {
  id                 String           @id @default(cuid())
  schoolId           String
  title              String
  slug               String
  description        String?
  visibility         CourseVisibility @default(DRAFT)
  thumbnailFileId    String?
  estimatedMinutes   Int?
  sortOrder          Int              @default(0)
  publishedAt        DateTime?
  archivedAt         DateTime?
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  school           School           @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  thumbnail        FileObject?      @relation(fields: [thumbnailFileId], references: [id], onDelete: SetNull)
  modules          Module[]
  enrollments      Enrollment[]
  discussionThreads DiscussionThread[]
  assessments      Assessment[]

  @@unique([schoolId, slug])
  @@index([schoolId, visibility])
}

model Module {
  id          String    @id @default(cuid())
  courseId    String
  title       String
  description String?
  sortOrder   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  course   Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  chapters Chapter[]

  @@index([courseId, sortOrder])
}

model Chapter {
  id          String    @id @default(cuid())
  moduleId    String
  title       String
  description String?
  sortOrder   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  module      Module      @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  lessons     Lesson[]
  threads     DiscussionThread[]

  @@index([moduleId, sortOrder])
}

model Lesson {
  id                String      @id @default(cuid())
  chapterId         String
  title             String
  lessonType        LessonType
  contentJson       Json?
  muxAssetId        String?
  durationSeconds   Int?
  sortOrder         Int         @default(0)
  isPreview         Boolean     @default(false)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  chapter         Chapter         @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  muxAsset        MuxAsset?       @relation(fields: [muxAssetId], references: [id], onDelete: SetNull)
  activities      Activity[]
  progressRecords LessonProgress[]

  @@index([chapterId, sortOrder])
}

model Activity {
  id            String    @id @default(cuid())
  lessonId      String
  kind          String
  title         String
  configJson    Json?
  sortOrder     Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@index([lessonId, sortOrder])
}

model Enrollment {
  id                    String           @id @default(cuid())
  schoolId              String
  courseId              String
  userId                String
  status                EnrollmentStatus @default(ACTIVE)
  progressPercent       Float            @default(0)
  completedAt           DateTime?
  createdAt             DateTime         @default(now())
  updatedAt             DateTime         @updatedAt

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([courseId, userId])
  @@index([schoolId, userId])
}

model LessonProgress {
  id               String    @id @default(cuid())
  schoolId         String
  courseId         String
  lessonId         String
  userId           String
  positionSeconds  Int       @default(0)
  watchedPercent   Float     @default(0)
  completed        Boolean   @default(false)
  completedAt      DateTime?
  lastWatchedAt    DateTime?
  updatedAt        DateTime  @updatedAt
  createdAt        DateTime  @default(now())

  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([lessonId, userId])
  @@index([schoolId, courseId, userId])
}

model HourSession {
  id                   String            @id @default(cuid())
  schoolId             String
  userId               String
  courseId             String?
  chapterId            String?
  startedAt            DateTime
  endedAt              DateTime?
  status               HourSessionStatus @default(RUNNING)
  totalSeconds         Int               @default(0)
  verifiedSeconds      Int               @default(0)
  clientVersion        String?
  userAgent            String?
  ipHash               String?
  deviceFingerprint    String?
  createdAt            DateTime          @default(now())
  updatedAt            DateTime          @updatedAt

  user          User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  events        HourEvent[]
  verifications HourVerification[]

  @@index([schoolId, userId, startedAt])
  @@index([status, startedAt])
}

model HourEvent {
  id               String        @id @default(cuid())
  schoolId         String
  hourSessionId    String
  userId           String
  type             HourEventType
  occurredAt       DateTime
  clientTimestamp  DateTime?
  payloadJson      Json?
  sequence         Int
  createdAt        DateTime      @default(now())

  hourSession HourSession @relation(fields: [hourSessionId], references: [id], onDelete: Cascade)
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([hourSessionId, sequence])
  @@index([schoolId, userId, occurredAt])
}

model HourVerification {
  id                 String    @id @default(cuid())
  schoolId           String
  hourSessionId      String
  reviewerId         String?
  status             String
  reason             String?
  adjustmentSeconds  Int       @default(0)
  reviewedAt         DateTime?
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  school      School      @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  session     HourSession @relation(fields: [hourSessionId], references: [id], onDelete: Cascade)
  reviewer    User?       @relation("Verifier", fields: [reviewerId], references: [id], onDelete: SetNull)

  @@index([schoolId, status, createdAt])
}

model Assessment {
  id                 String           @id @default(cuid())
  schoolId           String
  courseId           String?
  title              String
  slug               String
  type               AssessmentType
  instructions       String?
  passingScore       Float?
  timeLimitMinutes   Int?
  publishedAt        DateTime?
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  school    School               @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  course    Course?              @relation(fields: [courseId], references: [id], onDelete: SetNull)
  questions AssessmentQuestion[]
  attempts  AssessmentAttempt[]

  @@unique([schoolId, slug])
  @@index([schoolId, publishedAt])
}

model AssessmentQuestion {
  id                String                  @id @default(cuid())
  assessmentId      String
  prompt            String
  questionType      AssessmentQuestionType
  sortOrder         Int                     @default(0)
  points            Float                   @default(1)
  explanation       String?
  createdAt         DateTime                @default(now())
  updatedAt         DateTime                @updatedAt

  assessment Assessment         @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  options    AssessmentOption[]
  answers    AssessmentAnswer[]

  @@index([assessmentId, sortOrder])
}

model AssessmentOption {
  id          String   @id @default(cuid())
  questionId  String
  label       String
  value       String
  isCorrect   Boolean  @default(false)
  sortOrder   Int      @default(0)

  question AssessmentQuestion @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@index([questionId, sortOrder])
}

model AssessmentAttempt {
  id                String                  @id @default(cuid())
  schoolId          String
  assessmentId      String
  userId            String
  status            AssessmentAttemptStatus @default(IN_PROGRESS)
  score             Float?
  maxScore          Float?
  startedAt         DateTime                @default(now())
  submittedAt       DateTime?
  gradedAt          DateTime?
  gradedById        String?
  feedback          String?
  createdAt         DateTime                @default(now())
  updatedAt         DateTime                @updatedAt

  assessment Assessment         @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  user       User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  answers    AssessmentAnswer[]

  @@index([schoolId, userId, startedAt])
  @@index([assessmentId, userId])
}

model AssessmentAnswer {
  id                 String   @id @default(cuid())
  attemptId          String
  questionId         String
  userId             String
  selectedOptionIds  String[]
  textAnswer         String?
  isCorrect          Boolean?
  score              Float?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  attempt  AssessmentAttempt  @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  question AssessmentQuestion @relation(fields: [questionId], references: [id], onDelete: Cascade)
  user     User               @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([attemptId, questionId])
}

model PracticalSkill {
  id              String   @id @default(cuid())
  schoolId        String
  name            String
  slug            String
  description     String?
  category        String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  school        School              @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  checklist     SkillChecklistItem[]
  submissions   SkillSubmission[]

  @@unique([schoolId, slug])
}

model SkillChecklistItem {
  id          String   @id @default(cuid())
  skillId     String
  label       String
  description String?
  sortOrder   Int      @default(0)
  required    Boolean  @default(true)

  skill PracticalSkill @relation(fields: [skillId], references: [id], onDelete: Cascade)

  @@index([skillId, sortOrder])
}

model SkillSubmission {
  id                 String   @id @default(cuid())
  schoolId           String
  skillId            String
  userId             String
  assessorId         String?
  status             String
  notes              String?
  evidenceFileIds    String[]
  submittedAt        DateTime @default(now())
  reviewedAt         DateTime?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  skill PracticalSkill @relation(fields: [skillId], references: [id], onDelete: Cascade)
  user  User           @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([schoolId, userId, submittedAt])
}

model DiscussionThread {
  id              String      @id @default(cuid())
  schoolId        String
  courseId        String?
  chapterId       String?
  authorId        String
  title           String
  body            String
  scope           ThreadScope @default(COURSE)
  isPinned        Boolean     @default(false)
  isLocked        Boolean     @default(false)
  lastActivityAt  DateTime    @default(now())
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  school   School    @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  course   Course?   @relation(fields: [courseId], references: [id], onDelete: SetNull)
  chapter  Chapter?  @relation(fields: [chapterId], references: [id], onDelete: SetNull)
  author   User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  posts    DiscussionPost[]

  @@index([schoolId, lastActivityAt])
}

model DiscussionPost {
  id             String   @id @default(cuid())
  threadId       String
  authorId       String
  parentId       String?
  body           String
  isEdited       Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  thread DiscussionThread @relation(fields: [threadId], references: [id], onDelete: Cascade)
  author User             @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([threadId, createdAt])
}

model DirectMessageThread {
  id             String   @id @default(cuid())
  schoolId       String
  initiatedById  String
  participantIds String[]
  lastMessageAt  DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  school      School          @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  initiatedBy User            @relation("DmInitiator", fields: [initiatedById], references: [id], onDelete: Cascade)
  messages    DirectMessage[]

  @@index([schoolId, updatedAt])
}

model DirectMessage {
  id          String   @id @default(cuid())
  threadId    String
  senderId    String
  body        String
  readByIds   String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  thread DirectMessageThread @relation(fields: [threadId], references: [id], onDelete: Cascade)
  sender User                @relation(fields: [senderId], references: [id], onDelete: Cascade)

  @@index([threadId, createdAt])
}

model Notification {
  id            String           @id @default(cuid())
  schoolId      String
  userId        String
  type          NotificationType
  title         String
  body          String?
  actionUrl     String?
  dataJson      Json?
  readAt        DateTime?
  createdAt     DateTime         @default(now())

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, readAt, createdAt])
}

model Subscription {
  id                       String             @id @default(cuid())
  schoolId                 String
  userId                   String?
  stripeCustomerId         String
  stripeSubscriptionId     String             @unique
  stripePriceId            String
  stripeLookupKey          String?
  status                   SubscriptionStatus
  quantity                 Int                @default(1)
  currentPeriodStart       DateTime?
  currentPeriodEnd         DateTime?
  cancelAtPeriodEnd        Boolean            @default(false)
  canceledAt               DateTime?
  createdAt                DateTime           @default(now())
  updatedAt                DateTime           @updatedAt

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  user   User?  @relation(fields: [userId], references: [id], onDelete: SetNull)
  invoices Invoice[]

  @@index([schoolId, status])
}

model Invoice {
  id                    String   @id @default(cuid())
  schoolId              String
  userId                String?
  subscriptionId        String?
  stripeInvoiceId       String?  @unique
  stripePaymentIntentId String?
  number                String?
  status                String
  currency              String
  subtotal              Int
  tax                   Int      @default(0)
  total                 Int
  dueDate               DateTime?
  paidAt                DateTime?
  hostedInvoiceUrl      String?
  invoicePdfUrl         String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  school       School        @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  user         User?         @relation(fields: [userId], references: [id], onDelete: SetNull)
  subscription Subscription? @relation(fields: [subscriptionId], references: [id], onDelete: SetNull)
  lineItems    InvoiceLineItem[]

  @@index([schoolId, createdAt])
}

model InvoiceLineItem {
  id            String   @id @default(cuid())
  invoiceId     String
  stripeLineId  String?
  description   String
  quantity      Int      @default(1)
  unitAmount    Int
  amount        Int
  metadataJson  Json?

  invoice Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)

  @@index([invoiceId])
}

model FileObject {
  id              String         @id @default(cuid())
  schoolId        String
  uploaderId      String?
  kind            FileObjectKind
  storageProvider String
  bucket          String?
  objectKey       String
  filename        String
  mimeType        String
  byteSize        Int
  checksumSha256  String?
  isPublic        Boolean        @default(false)
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
}

model MuxAsset {
  id                 String   @id @default(cuid())
  schoolId           String
  uploadId           String?
  muxAssetId         String?  @unique
  muxPlaybackId      String?  @unique
  status             String
  durationSeconds    Float?
  aspectRatio        String?
  sourceFileId       String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
}

model WebhookEvent {
  id                String   @id @default(cuid())
  schoolId          String?
  provider          String
  eventType         String
  providerEventId   String
  signatureValid    Boolean  @default(false)
  payloadJson       Json
  receivedAt        DateTime @default(now())
  processedAt       DateTime?
  status            String   @default("received")
  errorMessage      String?

  school School? @relation(fields: [schoolId], references: [id], onDelete: SetNull)

  @@unique([provider, providerEventId])
  @@index([provider, eventType, receivedAt])
}

model DporReport {
  id                 String   @id @default(cuid())
  schoolId           String
  userId             String
  reportingPeriod    String
  totalHours         Float
  status             String
  generatedAt        DateTime @default(now())
  submittedAt        DateTime?
  metadataJson       Json?

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([schoolId, reportingPeriod])
}

model ContentChunk {
  id               String   @id @default(cuid())
  schoolId         String
  sourceType       String
  sourceId         String
  chunkIndex       Int
  content          String
  embeddingVector  Unsupported("vector")?
  metadataJson     Json?
  createdAt        DateTime @default(now())

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)

  @@unique([sourceType, sourceId, chunkIndex])
  @@index([schoolId, sourceType])
}

model AiTutorConversation {
  id              String   @id @default(cuid())
  schoolId        String
  userId          String
  courseId        String?
  title           String?
  isArchived      Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  school   School            @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  user     User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages AiTutorMessage[]

  @@index([schoolId, userId, updatedAt])
}

model AiTutorMessage {
  id               String   @id @default(cuid())
  conversationId   String
  userId           String?
  role             String
  content          String
  tokenCount       Int?
  latencyMs        Int?
  createdAt        DateTime @default(now())

  conversation AiTutorConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  user         User?               @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([conversationId, createdAt])
}

model AuditLog {
  id             String   @id @default(cuid())
  schoolId       String?
  actorUserId    String?
  action         String
  entityType     String
  entityId       String?
  ipHash         String?
  userAgent      String?
  metadataJson   Json?
  createdAt      DateTime @default(now())

  school School? @relation(fields: [schoolId], references: [id], onDelete: SetNull)
  actor  User?   @relation("ActorLogs", fields: [actorUserId], references: [id], onDelete: SetNull)

  @@index([schoolId, createdAt])
  @@index([actorUserId, createdAt])
}
```

---

## 3. API Design

### 3.1 Auth & session
- `POST /api/auth/[...nextauth]` (Auth.js handlers)
- Middleware-enforced route protection on `(portal)`
- JWT claims: `sub`, `role`, `schoolId`, `membershipRole`, `sessionVersion`

### 3.2 Course & content
- `GET /api/courses` — list by tenant and role
- `GET /api/courses/:courseId` — include modules/chapters/lessons
- `POST /api/courses/:courseId/enroll` — create enrollment
- `POST /api/progress/update` — idempotent lesson progress write

### 3.3 Assessments
- `POST /api/assessments/:id/start`
- `POST /api/assessments/:id/answer`
- `POST /api/assessments/:id/submit`
- `POST /api/assessments/:id/grade` (instructor/admin)

### 3.4 Hours tracking
- `POST /api/hours/session/start`
- `POST /api/hours/session/:id/heartbeat`
- `POST /api/hours/session/:id/pause`
- `POST /api/hours/session/:id/resume`
- `POST /api/hours/session/:id/stop`
- `POST /api/hours/session/:id/submit`
- `POST /api/hours/session/:id/verify` (instructor/admin)

### 3.5 Forums & messaging
- `GET /api/forums/threads`
- `POST /api/forums/threads`
- `POST /api/forums/posts`
- `GET /api/messages/threads`
- `POST /api/messages/threads`
- `POST /api/messages/send`

### 3.6 Billing
- `POST /api/billing/checkout`
- `POST /api/billing/portal`
- `POST /api/stripe/webhook`

### 3.7 Video / media
- `POST /api/mux/upload-url`
- `POST /api/mux/webhook`
- `POST /api/files/signed-upload-url`

### 3.8 Notifications / realtime
- `GET /api/notifications`
- `POST /api/notifications/mark-read`
- `GET /api/realtime/notifications` (SSE)

### 3.9 Idempotency and error contract
- Mutating endpoints accept `Idempotency-Key` header
- Error shape:

```json
{
  "ok": false,
  "code": "VALIDATION_ERROR",
  "message": "Human-readable reason",
  "fieldErrors": {
    "email": ["Invalid email"]
  },
  "requestId": "req_..."
}
```

---

## 4. Hour Tracking System Design

### 4.1 Trust model
- Client timer is non-authoritative display only
- Authoritative accrual computed server-side from events and session windows
- Heartbeats every 30s; tolerance window 90s for jitter

### 4.2 Session lifecycle
1. `START` creates `HourSession`
2. `HEARTBEAT` events maintain active state
3. `PAUSE/RESUME` create event boundaries
4. `STOP` finalizes active window
5. `SUBMITTED` queues verification
6. Reviewer approves/rejects via `HourVerification`

### 4.3 Fraud controls
- Duplicate event suppression by `(hourSessionId, sequence)`
- Clock-skew checks using server receive time
- Device/IP heuristic checks (`ipHash`, `deviceFingerprint`)
- Geo anomalies flagged for review
- Manual adjustments tracked in `HourVerification.adjustmentSeconds`

### 4.4 Reporting
- Monthly DPOR export generated from verified seconds
- `DporReport` stores period totals + submission metadata

---

## 5. Third-Party Integration Details

### 5.1 Stripe

#### Price lookup keys
- `student_monthly`
- `student_annual`
- `school_seat_monthly`
- `school_seat_annual`
- `instructor_pro_monthly`
- `instructor_pro_annual`
- `addon_ai_tutor_monthly`
- `addon_assessments_monthly`

#### Webhook events handled
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.created`
- `invoice.finalized`
- `invoice.paid`
- `invoice.payment_failed`
- `invoice.voided`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

### 5.2 Mux

#### Webhook events handled
- `video.asset.created`
- `video.asset.ready`
- `video.asset.errored`
- `video.asset.deleted`
- `video.upload.created`
- `video.upload.asset_created`
- `video.upload.cancelled`

#### Notes
- Verify `Mux-Signature`
- Update `MuxAsset.status`, `muxAssetId`, and playback IDs atomically

### 5.3 Resend

#### Email templates (React Email)
- `welcome-email`
- `password-reset-email`
- `magic-link-email`
- `invoice-email`
- `payment-failed-email`
- `subscription-updated-email`
- `hours-submitted-email`
- `hours-verified-email`
- `assessment-result-email`
- `notification-digest-email`

---

## 6. Security & Compliance

### 6.1 Authentication and authorization
- Auth.js v5 with secure cookie settings
- JWT signed with strong secret; short expiration + rotation
- Role checks at middleware + server action + query layer
- Tenant isolation enforced with mandatory `schoolId` predicate

### 6.2 Data protection
- TLS in transit everywhere
- Encryption at rest (database and object storage)
- PII minimization: store `ipHash`, not raw IP when possible
- File uploads validated for type/size/content disposition

### 6.3 Application security
- CSRF protection for browser-origin mutating requests
- Rate limiting on auth, messages, forum posting, webhook endpoints
- Strict webhook signature verification (Stripe, Mux)
- Idempotent webhook processing via `WebhookEvent`
- SQL injection protection through Prisma parameterization

### 6.4 Auditability and compliance controls
- Immutable `AuditLog` for privileged/admin actions
- Retention policies by record type
- DPOR reporting trail (`HourSession` → `HourVerification` → `DporReport`)
- Access logging and anomaly detection alerts
- Incident response runbook for webhook failures/data export issues

---

## 7. Infrastructure & Deployment

### 7.1 Hosting model
- Vercel project under scope `robert-genion`
- Environments: Development, Preview, Production
- Managed PostgreSQL with automated backups + PITR

### 7.2 CI/CD pipeline
- PR checks: typecheck, lint, unit tests, e2e smoke, build
- Deploy previews per PR
- Production deploy via protected branch merge
- Post-deploy smoke tests:
  - auth flow
  - checkout creation
  - webhook endpoint health
  - course page + video playback

### 7.3 Database operations
- Prisma migrations via `prisma migrate deploy`
- Seed scripts for lookup data (plans, roles, templates)
- Scheduled backups and quarterly restore drills

### 7.4 Observability
- Structured JSON logs with `requestId`
- Error tracking + tracing (Sentry/OTel compatible)
- Webhook dead-letter monitoring on processing failures
- Business metrics dashboards (active students, completion rates, verified hours)

---

## 8. Environment Variables Reference

```bash
# Core
NODE_ENV=
NEXT_PUBLIC_APP_URL=
APP_NAME=Aesthetica

# Database
DATABASE_URL=
DIRECT_DATABASE_URL=

# Auth.js / NextAuth
AUTH_SECRET=
AUTH_TRUST_HOST=true
AUTH_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# OAuth (optional)
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_MICROSOFT_ENTRA_ID=
AUTH_MICROSOFT_ENTRA_SECRET=
AUTH_MICROSOFT_ENTRA_TENANT_ID=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_LOOKUP_STUDENT_MONTHLY=student_monthly
STRIPE_PRICE_LOOKUP_STUDENT_ANNUAL=student_annual
STRIPE_PRICE_LOOKUP_SCHOOL_SEAT_MONTHLY=school_seat_monthly
STRIPE_PRICE_LOOKUP_SCHOOL_SEAT_ANNUAL=school_seat_annual
STRIPE_PRICE_LOOKUP_INSTRUCTOR_PRO_MONTHLY=instructor_pro_monthly
STRIPE_PRICE_LOOKUP_INSTRUCTOR_PRO_ANNUAL=instructor_pro_annual
STRIPE_PRICE_LOOKUP_ADDON_AI_TUTOR_MONTHLY=addon_ai_tutor_monthly
STRIPE_PRICE_LOOKUP_ADDON_ASSESSMENTS_MONTHLY=addon_assessments_monthly

# Mux
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
MUX_WEBHOOK_SECRET=
NEXT_PUBLIC_MUX_ENV_KEY=

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_REPLY_TO=

# Storage
BLOB_READ_WRITE_TOKEN=
S3_ENDPOINT=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=

# Realtime / queues
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# AI tutor (optional)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
AI_TUTOR_MODEL=

# Monitoring
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
OTEL_EXPORTER_OTLP_ENDPOINT=

# Feature flags
FEATURE_AI_TUTOR=true
FEATURE_MOBILE_PWA=false
FEATURE_SCHOOL_SSO=false
```

---

## 9. Performance & Scalability Considerations

### 9.1 Data access
- Enforce pagination on all list endpoints
- Composite indexes for tenant + date access patterns
- Avoid N+1 via Prisma `include/select` patterns and batched loaders

### 9.2 Caching and compute
- ISR for public content
- Short-lived server cache for dashboard aggregates
- `revalidateTag` on mutations to avoid full-page invalidation

### 9.3 Webhook throughput
- Persist-first webhook ingestion
- Async processing with retry backoff
- Dead-letter queue for repeated failures

### 9.4 Multi-tenant scale path
- All models partitionable by `schoolId`
- Soft isolation now, migration-ready for hard isolation later
- Background exports/reporting moved to queue workers as load grows

### 9.5 SLOs
- API p95 < 300ms (read), < 600ms (write)
- Webhook processing success > 99.9%
- RPO <= 15 min, RTO <= 60 min
