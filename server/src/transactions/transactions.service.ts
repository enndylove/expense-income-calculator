import { Inject, Injectable } from '@nestjs/common';
import { asc, count, desc, eq } from 'drizzle-orm';
import { DB } from 'src/drizzle/drizzle.module';
import { transactionHistory, type Transaction } from 'src/drizzle/schema';

@Injectable()
export class TransactionsService {
  constructor(@Inject('DB') private db: DB) {}

  async getTransactions(
    accountId: Transaction['accountId'],
    page = 1,
    limit = 10,
    orderBy = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
  ) {
    const offset = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalCount = await this.db
      .select({ count: count() })
      .from(transactionHistory)
      .where(eq(transactionHistory.accountId, accountId));

    // Get paginated transactions
    const transactions = await this.db
      .select()
      .from(transactionHistory)
      .where(eq(transactionHistory.accountId, accountId))
      .orderBy(
        order === 'desc'
          ? desc(transactionHistory[orderBy])
          : asc(transactionHistory[orderBy]),
      )
      .limit(limit)
      .offset(offset);

    return {
      data: transactions,
      meta: {
        totalCount: totalCount[0].count,
        page,
        limit,
        totalPages: Math.ceil(totalCount[0].count / limit),
      },
    };
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
