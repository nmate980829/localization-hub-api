import { Access } from './access';
import { Identifier } from './identifier';
import { Language } from './language';
import { User } from './user';
import { Branch } from './branch';
import { Bundle } from './bundle';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectRelations {
  @ApiProperty({ isArray: true, type: () => Access })
  access: Access[];

  @ApiProperty({ isArray: true, type: () => Identifier })
  identifiers: Identifier[];

  @ApiProperty({ isArray: true, type: () => Language })
  languages: Language[];

  @ApiProperty({ type: () => User })
  owner: User;

  @ApiProperty({ isArray: true, type: () => Branch })
  branches: Branch[];

  @ApiProperty({ isArray: true, type: () => Bundle })
  bundles: Bundle[];
}
