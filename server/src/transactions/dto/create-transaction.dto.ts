import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { type Transaction } from 'src/drizzle/schema';

enum transactionTypeEnum {
  cost = 'cost',
  profit = 'profit',
  investments = 'investments',
}

export class CreateTransactionDto {
  @IsEnum(transactionTypeEnum)
  @IsNotEmpty()
  transactionType: transactionTypeEnum;

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
