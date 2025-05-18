CREATE TABLE "transaction_categories" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_global" boolean DEFAULT false NOT NULL,
	CONSTRAINT "transaction_categories_id_unique" UNIQUE("id"),
	CONSTRAINT "transaction_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "transaction_tags" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_global" boolean DEFAULT false NOT NULL,
	CONSTRAINT "transaction_tags_id_unique" UNIQUE("id"),
	CONSTRAINT "transaction_tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "transaction_to_tags" (
	"transaction_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "transaction_to_tags_transaction_id_tag_id_pk" PRIMARY KEY("transaction_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "projects_bills" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_global" boolean DEFAULT false NOT NULL,
	CONSTRAINT "projects_bills_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "transaction_history" DROP CONSTRAINT "transaction_history_account_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "transaction_history" ADD COLUMN "project_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD COLUMN "bill_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD COLUMN "type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "transaction_history" ADD COLUMN "date" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD COLUMN "comment" varchar(255);--> statement-breakpoint
ALTER TABLE "transaction_categories" ADD CONSTRAINT "transaction_categories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_tags" ADD CONSTRAINT "transaction_tags_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_to_tags" ADD CONSTRAINT "transaction_to_tags_transaction_id_transaction_history_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transaction_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_to_tags" ADD CONSTRAINT "transaction_to_tags_tag_id_transaction_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."transaction_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_bills" ADD CONSTRAINT "projects_bills_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_bill_id_projects_bills_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."projects_bills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_history" DROP COLUMN "account_id";--> statement-breakpoint
ALTER TABLE "transaction_history" DROP COLUMN "transaction_type";--> statement-breakpoint
ALTER TABLE "transaction_history" DROP COLUMN "product_type";--> statement-breakpoint
ALTER TABLE "transaction_history" DROP COLUMN "note";--> statement-breakpoint
ALTER TABLE "transaction_history" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "transaction_history" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "public"."transaction_history" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."transaction_type";--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('income', 'expense', 'investments');--> statement-breakpoint
ALTER TABLE "public"."transaction_history" ALTER COLUMN "type" SET DATA TYPE "public"."transaction_type" USING "type"::"public"."transaction_type";