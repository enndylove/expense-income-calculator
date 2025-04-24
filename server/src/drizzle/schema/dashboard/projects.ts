import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { users } from '../auth/users';
import { timestamps } from '../utils';

export const projectPlanEnum = pgEnum('plan', [
  'personal',
  'business',
]);

export const projects = pgTable('projects', {
  id: uuid('id').notNull().defaultRandom().unique(),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  plan: projectPlanEnum('plan').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  currency: varchar('currency', { length: 100 }).notNull(),
  businessActivity: varchar('business_activity', { length: 255 }),
  ...timestamps,
});

export type Project = typeof projects.$inferSelect;
export type NewProoject = typeof projects.$inferInsert;
