import { User } from './user';
import { Translation } from './translation';
import { Comment } from './comment';
import { Project } from './project';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BundleRelations {
  @ApiProperty({ type: () => User })
  issuer: User;

  @ApiPropertyOptional({ type: () => User })
  reviewer?: User;

  @ApiProperty({ isArray: true, type: () => Translation })
  translations: Translation[];

  @ApiProperty({ isArray: true, type: () => Comment })
  comments: Comment[];

  @ApiProperty({ type: () => Project })
  project: Project;
}
