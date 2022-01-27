import { User } from './user';
import { Bundle } from './bundle';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CommentRelations {
  @ApiPropertyOptional({ type: () => User })
  author?: User;

  @ApiProperty({ type: () => Bundle })
  bundle: Bundle;
}
