ALTER TABLE "two_fa_codes" ADD COLUMN "is_activate" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "two_fa_codes" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "two_fa_codes" ADD COLUMN "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;