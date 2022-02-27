import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { User } from '../../entities/user';

export class RegisterDto extends PickType(User, [
  'email',
  'password',
  'firstName',
  'lastName',
] as const) {
  @IsEmail()
  email: string;
  @MinLength(6)
  @MaxLength(128)
  password: string;
  @MinLength(2)
  @MaxLength(32)
  firstName: string;
  @MinLength(2)
  @MaxLength(32)
  lastName: string;
  @IsOptional()
  @MaxLength(32)
  @ApiPropertyOptional({ type: Number })
  tokenDescription?: string;
}
