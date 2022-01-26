import { PickType } from '@nestjs/swagger';
import { IsPositive, MaxLength, MinLength } from 'class-validator';
import { Language } from 'src/entities/language';

export class CreateLanguageDto extends PickType(Language, [
  'key',
  'description',
  'projectId',
] as const) {
  @MinLength(2)
  @MaxLength(128)
  key: string;
  @MinLength(5)
  @MaxLength(128)
  description: string;
  @IsPositive()
  projectId: number;
}
