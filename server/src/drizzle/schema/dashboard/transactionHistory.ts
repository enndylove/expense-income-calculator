import {
  integer,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  numeric,
} from 'drizzle-orm/pg-core';
import { users } from '../auth/users';
import { timestamps } from '../utils';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'cost',
  'profit',
  'investments',
]);

export const transactionHistory = pgTable('transaction_history', {
  id: uuid('id').notNull().defaultRandom().unique(),
  accountId: uuid('account_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  productType: varchar('product_type', { length: 100 }).notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  note: varchar('note', { length: 255 }),
  ...timestamps,
});

export type Transaction = typeof transactionHistory.$inferSelect;
export type NewTransaction = typeof transactionHistory.$inferInsert;
