import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import type { TransactionService } from './transaction.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() data: any, @User() user: any) {
    return this.transactionService.createTransaction({
      ...data,
      accountId: user.id,
    });
  }

  @Get()
  async getMyTransactions(@User() user: any) {
    return this.transactionService.getTransactionsByAccountId(user.id);
  }
}
