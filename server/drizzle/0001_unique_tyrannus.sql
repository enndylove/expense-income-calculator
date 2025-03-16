CREATE TYPE "public"."transaction_type" AS ENUM('cost', 'profit');--> statement-breakpoint
CREATE TABLE "transaction_history" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"transaction_type" "transaction_type" NOT NULL,
	"product_type" varchar(100) NOT NULL,
	"amount" integer NOT NULL,
	"note" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "transaction_history_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_account_id_users_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;