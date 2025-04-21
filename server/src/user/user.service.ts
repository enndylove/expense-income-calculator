import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DB } from 'src/drizzle/drizzle.module';
import { type User, users } from 'src/drizzle/schema';
import { EncryptionService } from 'src/encryption/encryption.service';
import type { BalanceResponse } from './types/balance.type';

@Injectable()
export class UserService {
  constructor(
    @Inject('DB') private db: DB,
    private readonly encryptionService: EncryptionService,
  ) {}

  async getUserBalance(
    reqId: User['id'],
    reqEmail: User['email'],
  ): Promise<BalanceResponse> {
    const hashingBalance = await this.db.query.users.findFirst({
      where: and(eq(users.id, reqId), eq(users.email, reqEmail)),
      columns: {
        balance: true,
      },
    });

    const decryptedBalance = hashingBalance?.balance
      ? this.encryptionService.decrypt(hashingBalance.balance)
      : null;

    return {
      balance: decryptedBalance,
    };
  }
}
