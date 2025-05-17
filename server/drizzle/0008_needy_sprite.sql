CREATE TABLE "two_fa_codes" (
	"client_id" uuid NOT NULL,
	"code" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "two_fa_codes" ADD CONSTRAINT "two_fa_codes_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;