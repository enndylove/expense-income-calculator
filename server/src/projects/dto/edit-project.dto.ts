import { IsOptional, IsString, Length } from 'class-validator';

export class EditProjectDto {
  @IsString({ message: 'Project name is required.' })
  @Length(1, 100, {
    message: 'Project name must be at most 100 characters.',
  })
  name!: string;

  @IsOptional()
  @IsString()
  businessActivity?: string;
}
