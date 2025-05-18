// import {
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   IsInt,
//   IsNumber,
// } from 'class-validator';
// import { type Transaction } from 'src/drizzle/schema';

// enum transactionTypeEnum {
//   cost = 'cost',
//   profit = 'profit',
//   investments = 'investments',
// }

// export class CreateTransactionDto {
//   @IsEnum(transactionTypeEnum)
//   @IsNotEmpty()
//   transactionType!: transactionTypeEnum;

//   @IsString()
//   @IsNotEmpty()
//   productType!: Transaction['productType'];

//   @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
//   @IsNotEmpty()
//   amount!: Transaction['amount'];

//   @IsOptional()
//   @IsString()
//   note?: Transaction['note'];
// }
