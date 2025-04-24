import {
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { accountPlanEnum, users } from '../auth/users';
import { timestamps } from '../utils';

export const projects = pgTable('projects', {
  id: uuid('id').notNull().defaultRandom().unique(),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  plan: accountPlanEnum('project_plan').notNull().default('personal'),
  name: varchar('name', { length: 100 }).notNull(),
  currency: varchar('currency', { length: 100 }).notNull(),
  businessActivity: varchar('business_activity', { length: 255 }),
  ...timestamps,
});

export type Project = typeof projects.$inferSelect;
export type NewProoject = typeof projects.$inferInsert;
