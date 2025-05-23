import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { and, asc, count, desc, eq } from 'drizzle-orm';
import { DB } from 'src/drizzle/drizzle.module';
import {
  transactionHistory,
  User,
  users,
  type Transaction,
} from 'src/drizzle/schema';
import { EncryptionService } from 'src/encryption/encryption.service';
import axios from 'axios';
import * as fs from 'fs';
import FormData from 'form-data';
import path from "path"

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('DB') private db: DB,
    private readonly encryptionService: EncryptionService,
  ) { }

  async getTransactions(
    accountId: Transaction['accountId'],
    page = 1,
    limit = 10,
    orderBy = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
  ) {
    const offset = (page - 1) * limit;

    // const decryptedBalanceStr = this.encryptionService.encrypt('0');

    // await this.db
    //   .update(users)
    //   .set({ balance: decryptedBalanceStr })
    //   .where(and(eq(users.id, accountId)));

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

  async createTransaction(
    accountId: User['id'],
    accountEmail: User['email'],
    transactionData: {
      transactionType: Transaction['transactionType'];
      productType: Transaction['productType'];
      amount: Transaction['amount'];
      note?: Transaction['note'];
    },
  ) {
    return this.db.transaction(async (tx) => {
      const encryptedBalance = await tx.query.users.findFirst({
        where: and(eq(users.id, accountId), eq(users.email, accountEmail)),
        columns: {
          balance: true,
        },
      });

      if (!encryptedBalance)
        throw new UnauthorizedException('Unauthrized user');

      const decryptedBalanceStr = this.encryptionService.decrypt(
        encryptedBalance.balance,
      );
      const newBalance = Number(decryptedBalanceStr);

      if (isNaN(newBalance)) {
        throw new BadRequestException(
          `Invalid balance value: ${decryptedBalanceStr}`,
        );
      }

      let updatedBalance = newBalance;

      if (transactionData.transactionType === 'profit') {
        updatedBalance += Number(transactionData.amount);
      } else if (
        ['cost', 'investments'].includes(transactionData.transactionType)
      ) {
        updatedBalance -= Number(transactionData.amount);
        if (updatedBalance < 0) {
          throw new BadRequestException(
            'Insufficient funds for this transaction.',
          );
        }
      }

      const encryptedNewBalance = this.encryptionService.encrypt(
        updatedBalance.toString(),
      );

      await tx
        .update(users)
        .set({ balance: encryptedNewBalance })
        .where(and(eq(users.id, accountId), eq(users.email, accountEmail)));

      await tx.insert(transactionHistory).values({
        accountId,
        transactionType: transactionData.transactionType,
        productType: transactionData.productType,
        amount: transactionData.amount,
        note: transactionData.note,
      });
    });
  }

  async processImage(file: Express.Multer.File) {
    if (!file || !file.path) {
      throw new Error('Invalid file: File or file path is missing');
    }

    const formData = new FormData();

    // Create a readable stream from the file
    const fileStream = fs.createReadStream(file.path);

    // Append the file with proper metadata
    formData.append('file', fileStream, {
      filename: file.originalname || path.basename(file.path),
      contentType: file.mimetype || 'image/jpeg',
      knownLength: file.size
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/process', formData, {
        headers: {
          ...formData.getHeaders()  // Let FormData set the correct headers
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      });

      return response.data;
    } catch (error: any) {
      console.error('Error details:', error.response?.data || error.message);
      throw error;
    }
  }

}
