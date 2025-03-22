import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { type Transaction, transactionTypeEnum } from 'src/drizzle/schema';

export class CreateTransactionDto {
  @IsEnum(transactionTypeEnum)
  @IsNotEmpty()
  transactionType: 'cost' | 'profit' | 'investments';

  @IsString()
  @IsNotEmpty()
  productType: Transaction['productType'];

  @IsInt()
  @IsNotEmpty()
  amount: Transaction['amount'];

  @IsOptional()
  @IsString()
  note?: Transaction['note'];
}
