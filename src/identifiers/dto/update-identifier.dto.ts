import { PartialType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateIdentifierDto } from './create-identifier.dto';

export class UpdateIdentifierDto extends PartialType(
  PickType(CreateIdentifierDto, ['key', 'branchId'] as const),
) {
  @IsOptional()
  key?: string;
  @IsOptional()
  branchId?: number;
}
