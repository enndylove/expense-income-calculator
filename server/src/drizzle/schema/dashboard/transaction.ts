import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  numeric,
  timestamp,
  primaryKey,
  boolean,
} from 'drizzle-orm/pg-core';
import { projects, projectsBills } from './projects';
import { sql } from 'drizzle-orm';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'income',
  'expense',
  'investments',
]);

export const transactionHistory = pgTable('transaction_history', {
  id: uuid('id').notNull().defaultRandom().unique(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  billId: uuid('bill_id')
    .notNull()
    .references(() => projectsBills.id, { onDelete: "cascade" }),
  type: transactionTypeEnum('type').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  category: varchar('category', { length: 100 }),
  date: timestamp('date', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  comment: varchar('comment', { length: 255 })
});

export type Transaction = typeof transactionHistory.$inferSelect;
export type NewTransaction = typeof transactionHistory.$inferInsert;

export const transactionCategories = pgTable('transaction_categories', {
  id: uuid('id').notNull().defaultRandom().unique(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull().unique(),
  isGlobal: boolean('is_global').notNull().default(false),
});

export type TransactionCategory = typeof transactionCategories.$inferSelect;
export type NewTransactionCategory = typeof transactionCategories.$inferInsert;

export const transactionTags = pgTable('transaction_tags', {
  id: uuid('id').notNull().defaultRandom().unique(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull().unique(),
  isGlobal: boolean('is_global').notNull().default(false),
});

export type TransactionTag = typeof transactionTags.$inferSelect;
export type NewTransactionTag = typeof transactionTags.$inferInsert;

export const transactionToTags = pgTable(
  'transaction_to_tags',
  {
    transactionId: uuid('transaction_id')
      .notNull()
      .references(() => transactionHistory.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => transactionTags.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.transactionId, table.tagId] }),
  })
);

export type TransactionToTag = typeof transactionToTags.$inferSelect;
export type NewTransactionToTag = typeof transactionToTags.$inferInsert;
