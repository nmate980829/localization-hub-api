import { Project } from './project';
import { Translation } from './translation';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageRelations {
  @ApiProperty({ type: () => Project })
  project: Project;

  @ApiProperty({ isArray: true, type: () => Translation })
  translations: Translation[];
}
