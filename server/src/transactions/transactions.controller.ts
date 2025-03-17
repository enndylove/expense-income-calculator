import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  @Get()
  async getUserTransactions(@Req() req: Request) {
    console.log(req.user);
  }
}
