import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { users } from './users';

export const twoFaCodes = pgTable('two_fa_codes', {
  clientId: uuid('client_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code')
    .notNull()
    .primaryKey(),
});

export type TwoFaCode = typeof twoFaCodes.$inferSelect;
export type NewTwoFaCode = typeof twoFaCodes.$inferInsert;
