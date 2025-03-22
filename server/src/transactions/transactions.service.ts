import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB } from 'src/drizzle/drizzle.module';
import { transactionHistory, type Transaction } from 'src/drizzle/schema';

@Injectable()
export class TransactionsService {
  constructor(@Inject('DB') private db: DB) {}

  async getTransactions(accountId: Transaction['accountId']) {
    return this.db
      .select()
      .from(transactionHistory)
      .where(eq(transactionHistory.accountId, accountId));
  }

  async createTranstaction(
    accountId: Transaction['accountId'],
    transactionData: {
      transactionType: Transaction['transactionType'];
      productType: Transaction['productType'];
      amount: Transaction['amount'];
      note?: Transaction['note'];
    },
  ) {
    return this.db.insert(transactionHistory).values({
      accountId: accountId,
      transactionType: transactionData.transactionType,
      productType: transactionData.productType,
      amount: transactionData.amount,
      note: transactionData.note,
    });
  }
}
