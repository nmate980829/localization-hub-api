import { User } from './user';
import { Bundle } from './bundle';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRelations {
  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ type: () => Bundle })
  bundle: Bundle;
}
