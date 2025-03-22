ALTER TABLE "public"."transaction_history" ALTER COLUMN "transaction_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."transaction_type";--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('cost', 'profit', 'investments');--> statement-breakpoint
ALTER TABLE "public"."transaction_history" ALTER COLUMN "transaction_type" SET DATA TYPE "public"."transaction_type" USING "transaction_type"::"public"."transaction_type";