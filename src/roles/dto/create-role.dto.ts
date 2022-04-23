import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsPositive, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/entities/role';

export class CreateRoleDto extends PickType(Role, [
  'name',
  'description',
] as const) {
  @MinLength(4)
  @MaxLength(128)
  name: string;

  @MinLength(5)
  @MaxLength(128)
  description: string;

  @IsArray()
  @IsPositive({ each: true })
  @ApiProperty({ isArray: true, type: Number })
  rights: number[];
}
