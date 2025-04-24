import { IsEnum, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export enum Plan {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export class CreateProjectDto {
  @IsEnum(Plan, {
    message: "Plan must be either 'personal' or 'business'.",
  })
  plan!: Plan;

  @IsString({ message: 'Project name is required.' })
  @Length(1, 100, {
    message: 'Project name must be at most 100 characters.',
  })
  name!: string;

  @IsString({ message: 'Project currency is required.' })
  @Length(1, 100, {
    message: 'Project currency must be at most 100 characters.',
  })
  currency!: string;

  @IsOptional()
  @IsString()
  businessActivity?: string;
}
