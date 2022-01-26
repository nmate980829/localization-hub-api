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
  deleted?: boolean;

  @IsOptional()
  @IsPositive()
  identifierId?: number;

  @IsOptional()
  @IsPositive()
  languageId?: number;

  @IsOptional()
  @IsPositive()
  userId?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsBoolean()
  allVersions?: boolean;
}
