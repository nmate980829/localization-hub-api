import { PickType } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { User } from '../../entities/user';

export class LoginDto extends PickType(User, ['email', 'password'] as const) {
  @IsEmail()
  email: string;
  @MinLength(6)
  @MaxLength(128)
  password: string;
}
