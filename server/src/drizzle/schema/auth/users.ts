import { pgTable, uuid, text, pgEnum } from 'drizzle-orm/pg-core';

export const accountPlanEnum = pgEnum('account_plan', [
  'personal',
  'business',
]);

export const users = pgTable('users', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  image: text('image'),
  balance: text('balance').notNull(),
  plan: accountPlanEnum('account_plan').notNull().default('personal'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
