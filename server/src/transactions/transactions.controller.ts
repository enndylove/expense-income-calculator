import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import type { User } from 'src/drizzle/schema';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(@Req() req: Request) {
    const user = req.user as User;
    return this.transactionsService.getTransactions(user.id);
  }

  @Post()
  async createTransaction(
    @Req() req: Request,
    @Body() dto: CreateTransactionDto,
  ) {
    const user = req.user as User;
    return this.transactionsService.createTranstaction(user.id, dto);
  }
}
