import { Access } from './access';
import { Right } from './right';
import { ApiProperty } from '@nestjs/swagger';

export class RoleRelations {
  @ApiProperty({ isArray: true, type: () => Access })
  accesses: Access[];

  @ApiProperty({ isArray: true, type: () => Right })
  rights: Right[];
}
