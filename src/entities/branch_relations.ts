import { Project } from './project';
import { Identifier } from './identifier';
import { ApiProperty } from '@nestjs/swagger';

export class BranchRelations {
  @ApiProperty({ type: () => Project })
  project: Project;

  @ApiProperty({ isArray: true, type: () => Identifier })
  identifiers: Identifier[];
}
