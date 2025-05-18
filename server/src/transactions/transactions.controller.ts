import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import type { User } from 'src/drizzle/schema';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Get()
  async getTransactions(
    @Req() req: Request,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'desc',
  ) {
    const user = req.user as User;
    return this.transactionsService.getTransactions(
      user.id,
      +page,
      +limit,
      orderBy,
      order,
    );
  }

  // @Post()
  // async createTransaction(
  //   @Req() req: Request,
  //   @Body() dto: CreateTransactionDto,
  // ) {
  //   const user = req.user as User;
  //   return this.transactionsService.createTransaction(user.id, user.email, dto);
  // }

  @Post('process-receipt')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.transactionsService.processImage(file);
  }

}
