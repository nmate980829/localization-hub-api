import { PickType } from '@nestjs/swagger';
import { CreateLanguageDto } from './create-language.dto';

export class ListLanguage extends PickType(CreateLanguageDto, [
  'projectId',
] as const) {}
