import { User } from './user';
import { Translation } from './translation';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRelations {
  @ApiProperty({ type: () => User })
  reviewer: User;

  @ApiProperty({ type: () => Translation })
  translation: Translation;
}
