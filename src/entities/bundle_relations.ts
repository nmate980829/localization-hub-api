import { User } from './user';
import { Translation } from './translation';
import { Comment } from './comment';
import { Project } from './project';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class BundleRelations {
  @ApiPropertyOptional({ type: () => User })
  issuer?: User;

  @ApiPropertyOptional({ type: () => User })
  reviewer?: User;

  @ApiProperty({ isArray: true, type: () => Translation })
  translations: Translation[];

  @ApiProperty({ isArray: true, type: () => Comment })
  comments: Comment[];

  @ApiProperty({ type: () => Project })
  project: Project;
}
