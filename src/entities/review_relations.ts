import { User } from './user';
import { Translation } from './translation';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class ReviewRelations {
  @ApiPropertyOptional({ type: () => User })
  reviewer?: User;

  @ApiProperty({ type: () => Translation })
  translation: Translation;
}
