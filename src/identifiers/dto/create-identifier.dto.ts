import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
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
  @IsNumber()
  @ValidateIf((val) => val !== null)
  @ApiPropertyOptional({ type: Number, nullable: true })
  parentId?: number | null;
  @IsPositive()
  branchId: number;
}
