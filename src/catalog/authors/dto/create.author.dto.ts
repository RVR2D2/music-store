import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateAuthorDto {
  @Length(2, 100)
  name: string;

  @Length(2, 50)
  country: string;

  @IsOptional()
  @Length(2, 1000)
  description?: string | undefined | null;

  @IsUrl({ protocols: ['https'] })
  photo?: string;

  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfDeath?: Date;
}
