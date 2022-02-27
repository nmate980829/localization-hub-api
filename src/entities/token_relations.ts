import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class TokenRelations {
  @ApiProperty({ type: () => User })
  user: User;
}
