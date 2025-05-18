import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  boolean,
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

export const projectsBills = pgTable('projects_bills', {
  id: uuid('id').notNull().defaultRandom().unique(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  isGlobal: boolean('is_global').notNull().default(false),
});

export type ProjectsBills = typeof projectsBills.$inferSelect;
export type NewProojectsBills = typeof projectsBills.$inferInsert;
