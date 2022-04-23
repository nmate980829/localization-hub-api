import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';
import { Translation } from 'src/entities/translation';

export class ListRightsDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsPositive()
  roleId?: number;
}
