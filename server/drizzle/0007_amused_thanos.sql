CREATE TYPE "public"."account_plan" AS ENUM('personal', 'business');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "account_plan" "account_plan" DEFAULT 'personal' NOT NULL;