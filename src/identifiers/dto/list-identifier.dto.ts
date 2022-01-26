import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsPositive } from 'class-validator';
import { CreateIdentifierDto } from './create-identifier.dto';

export class ListIdentifierDto extends PartialType(
  PickType(CreateIdentifierDto, ['projectId', 'parentId'] as const),
) {
  @IsOptional()
  projectId?: number;

  @IsOptional()
  parentId?: number | null;

  @ApiPropertyOptional({ isArray: true, type: () => Number })
  @IsArray()
  @IsPositive({ each: true })
  @IsOptional()
  branches?: number[];
}
