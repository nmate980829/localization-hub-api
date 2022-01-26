import { PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Language } from 'src/entities/language';

export class UpdateLanguageDto extends PartialType(
  PickType(Language, ['key', 'description', 'deleted'] as const),
) {
  @IsOptional()
  @MinLength(2)
  @MaxLength(128)
  key?: string;
  @IsOptional()
  @MinLength(5)
  @MaxLength(128)
  description?: string;
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
