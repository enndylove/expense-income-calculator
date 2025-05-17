import { pgTable, uuid, text, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { timestamps } from '../utils';

export const twoFaCodes = pgTable('two_fa_codes', {
  clientId: uuid('client_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code')
    .notNull()
    .primaryKey(),
  isActivate: boolean('is_activate').notNull().default(false),
  ...timestamps
});

export type TwoFaCode = typeof twoFaCodes.$inferSelect;
export type NewTwoFaCode = typeof twoFaCodes.$inferInsert;
