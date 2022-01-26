import { PickType } from '@nestjs/swagger';
import { IsPositive, MaxLength, MinLength } from 'class-validator';
import { Branch } from 'src/entities/branch';

export class CreateBranchDto extends PickType(Branch, [
  'key',
  'projectId',
] as const) {
  @MinLength(4)
  @MaxLength(128)
  key: string;
  @IsPositive()
  projectId: number;
}
