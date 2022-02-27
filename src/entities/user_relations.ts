import { Project } from './project';
import { Access } from './access';
import { Identifier } from './identifier';
import { Translation } from './translation';
import { Bundle } from './bundle';
import { Review } from './review';
import { Comment } from './comment';
import { Invite } from './invite';
import { Token } from './token';
import { ApiProperty } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Project })
  projects: Project[];

  @ApiProperty({ isArray: true, type: () => Access })
  access: Access[];

  @ApiProperty({ isArray: true, type: () => Identifier })
  identifiers: Identifier[];

  @ApiProperty({ isArray: true, type: () => Translation })
  translations: Translation[];

  @ApiProperty({ isArray: true, type: () => Bundle })
  issued: Bundle[];

  @ApiProperty({ isArray: true, type: () => Bundle })
  reviewed: Bundle[];

  @ApiProperty({ isArray: true, type: () => Review })
  reviews: Review[];

  @ApiProperty({ isArray: true, type: () => Comment })
  comments: Comment[];

  @ApiProperty({ type: () => Invite })
  invite: Invite;

  @ApiProperty({ isArray: true, type: () => Invite })
  invitations: Invite[];

  @ApiProperty({ isArray: true, type: () => Token })
  tokens: Token[];
}
