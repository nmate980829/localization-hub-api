import { Role } from './role';
import { ApiProperty } from '@nestjs/swagger';

export class RightRelations {
  @ApiProperty({ isArray: true, type: () => Role })
  roles: Role[];
}
