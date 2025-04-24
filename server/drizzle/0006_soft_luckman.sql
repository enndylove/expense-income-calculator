CREATE TYPE "public"."plan" AS ENUM('personal', 'business');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"creator_id" uuid NOT NULL,
	"plan" "plan" NOT NULL,
	"name" varchar(100) NOT NULL,
	"currency" varchar(100) NOT NULL,
	"business_activity" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "projects_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;