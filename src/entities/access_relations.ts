import { Project } from './project';
import { User } from './user';
import { Role } from './role';
import { ApiProperty } from '@nestjs/swagger';

export class AccessRelations {
  @ApiProperty({ type: () => Project })
  project: Project;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => Role })
  role: Role;
}
