import { Project } from './project';
import { User } from './user';
import { Key } from './key';
import { Translation } from './translation';
import { Branch } from './branch';
import { ApiProperty } from '@nestjs/swagger';

export class KeyRelations {
  @ApiProperty({ type: () => Project })
  project: Project;

  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ type: () => Key })
  parent: Key;

  @ApiProperty({ isArray: true, type: () => Key })
  children: Key[];

  @ApiProperty({ isArray: true, type: () => Translation })
  translations: Translation[];

  @ApiProperty({ type: () => Branch })
  branch: Branch;
}
