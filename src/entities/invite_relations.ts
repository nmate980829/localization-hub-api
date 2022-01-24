import { User } from './user';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class InviteRelations {
  @ApiPropertyOptional({ type: () => User })
  user?: User;

  @ApiPropertyOptional({ type: () => User })
  initiator?: User;
}
