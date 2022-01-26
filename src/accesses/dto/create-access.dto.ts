import { PickType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { Access } from 'src/entities/access';

export class CreateAccessDto extends PickType(Access, [
  'projectId',
  'userId',
  'roleId',
] as const) {
  @IsPositive()
  projectId: number;
  @IsPositive()
  userId: number;
  @IsPositive()
  roleId: number;
}
