import { PartialType, PickType } from '@nestjs/swagger';
import { SERVER_ROLE } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { User } from 'src/entities/user';

export class UpdateUserDto extends PartialType(
  PickType(User, ['role', 'disabled']),
) {
  @IsEnum(SERVER_ROLE)
  @IsOptional()
  role?: SERVER_ROLE;
  @IsBoolean()
  @IsOptional()
  disabled?: boolean;
}
