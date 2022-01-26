import { PickType } from '@nestjs/swagger';
import { IsPositive, MaxLength, MinLength } from 'class-validator';
import { Translation } from 'src/entities/translation';

export class CreateTranslationDto extends PickType(Translation, [
  'value',
  'identifierId',
  'languageId',
] as const) {
  @MinLength(1)
  @MaxLength(512)
  value: string;
  @IsPositive()
  identifierId: number;
  @IsPositive()
  languageId: number;
}
