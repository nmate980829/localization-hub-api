import { PickType } from '@nestjs/swagger';
import { CreateTranslationDto } from './create-translation.dto';

export class UpdateTranslationDto extends PickType(CreateTranslationDto, [
  'value',
] as const) {}
