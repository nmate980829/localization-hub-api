import { PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/entities/user';

export class UpdateMeDto extends PartialType(
  PickType(User, ['email', 'firstName', 'lastName', 'password']),
) {
  @IsEmail()
  @IsOptional()
  email?: string;
  @MinLength(6)
  @MaxLength(128)
  @IsOptional()
  password?: string;
  @MinLength(2)
  @MaxLength(32)
  @IsOptional()
  firstName?: string;
  @MinLength(2)
  @MaxLength(32)
  @IsOptional()
  lastName?: string;
}
