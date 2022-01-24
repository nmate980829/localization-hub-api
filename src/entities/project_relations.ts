import { Access } from './access';
import { Key } from './key';
import { Language } from './language';
import { User } from './user';
import { Bundle } from './bundle';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectRelations {
  @ApiProperty({ isArray: true, type: () => Access })
  access: Access[];

  @ApiProperty({ isArray: true, type: () => Key })
  keys: Key[];

  @ApiProperty({ isArray: true, type: () => Language })
  languages: Language[];

  @ApiProperty({ type: () => User })
  owner: User;

  @ApiProperty({ isArray: true, type: () => Bundle })
  bundles: Bundle[];
}
