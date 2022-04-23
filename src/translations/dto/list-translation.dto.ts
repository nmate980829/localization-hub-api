import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';
import { Translation } from 'src/entities/translation';

export class ListTranslationDto extends PartialType(
  PickType(Translation, [
    'deleted',
    'identifierId',
    'languageId',
    'userId',
  ] as const),
) {
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ type: Boolean })
  deleted?: boolean;

  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({ type: Number })
  identifierId?: number;

  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({ type: Number })
  languageId?: number;

  @IsOptional()
  @IsPositive()
  userId?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsBoolean()
  allVersions?: boolean;
}
