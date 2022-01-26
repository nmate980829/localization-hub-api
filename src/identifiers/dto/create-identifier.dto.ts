import { PickType } from '@nestjs/swagger';
import { IsOptional, IsPositive, MaxLength, MinLength } from 'class-validator';
import { Identifier } from 'src/entities/identifier';

export class CreateIdentifierDto extends PickType(Identifier, [
  'key',
  'projectId',
  'parentId',
  'branchId',
] as const) {
  @MinLength(2)
  @MaxLength(128)
  key: string;
  @IsPositive()
  projectId: number;
  //should find a way to pass in null for a parent
  @IsOptional()
  @IsPositive()
  parentId?: number | null;
  @IsPositive()
  branchId: number;
}
