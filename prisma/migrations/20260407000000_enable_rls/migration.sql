-- Enable Row-Level Security on all public tables
-- Prisma connects via postgres superuser (bypasses RLS) so backend is unaffected.
-- This blocks the Supabase public REST API (PostgREST anon key) from reading any data.

ALTER TABLE "public"."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."School" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."SchoolMembership" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Course" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Chapter" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Lesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Activity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Enrollment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."LessonProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."HourSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."HourEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."HourVerification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Assessment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AssessmentQuestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AssessmentOption" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AssessmentAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AssessmentAnswer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."PracticalSkill" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."SkillChecklistItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."SkillSubmission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."DiscussionThread" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."DiscussionPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."DirectMessageThread" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."DirectMessage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Invoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."InvoiceLineItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."FileObject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."MuxAsset" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."WebhookEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."DporReport" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AiTutorConversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AiTutorMessage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."AuditLog" ENABLE ROW LEVEL SECURITY;

-- No permissive policies are added intentionally.
-- All access goes through Prisma (superuser role) which bypasses RLS.
-- The Supabase anon/service_role keys via PostgREST have zero table access.
