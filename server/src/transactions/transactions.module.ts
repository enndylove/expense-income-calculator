import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule],
  providers: [TransactionsService, ConfigService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
