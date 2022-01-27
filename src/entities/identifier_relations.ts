import { Project } from './project';
import { User } from './user';
import { Identifier } from './identifier';
import { Translation } from './translation';
import { Branch } from './branch';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IdentifierRelations {
  @ApiProperty({ type: () => Project })
  project: Project;

  @ApiPropertyOptional({ type: () => User })
  author?: User;

  @ApiPropertyOptional({ type: () => Identifier })
  parent?: Identifier;

  @ApiProperty({ isArray: true, type: () => Identifier })
  children: Identifier[];

  @ApiProperty({ isArray: true, type: () => Translation })
  translations: Translation[];

  @ApiProperty({ type: () => Branch })
  branch: Branch;
}
