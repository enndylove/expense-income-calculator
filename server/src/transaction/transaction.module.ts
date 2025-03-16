import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EncryptionService } from '../encryption/encryption.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [TransactionService, EncryptionService],
  exports: [TransactionService],
})
export class TransactionModule {}
