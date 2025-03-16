import { Injectable } from '@nestjs/common';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { transactionHistory } from '../drizzle/schema';
import type { EncryptionService } from '../encryption/encryption.service';
import type { NewTransaction } from '../drizzle/schema';

@Injectable()
export class TransactionService {
  constructor(
    private db: NodePgDatabase,
    private encryptionService: EncryptionService,
  ) {}

  async createTransaction(data: NewTransaction): Promise<string> {
    // Encrypt sensitive fields
    const encryptedData = {
      ...data,
      productType: this.encryptionService.encrypt(data.productType),
      note: data.note ? this.encryptionService.encrypt(data.note) : null,
    };

    const [result] = await this.db
      .insert(transactionHistory)
      .values(encryptedData)
      .returning({ id: transactionHistory.id });
    return result.id;
  }

  async getTransactionsByAccountId(accountId: string) {
    const transactions = await this.db
      .select()
      .from(transactionHistory)
      .where(eq(transactionHistory.accountId, accountId));

    // Decrypt sensitive fields for each transaction
    return transactions.map((transaction) => ({
      ...transaction,
      productType: this.encryptionService.decrypt(transaction.productType),
      note: transaction.note
        ? this.encryptionService.decrypt(transaction.note)
        : undefined,
    }));
  }
}
