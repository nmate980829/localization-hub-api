import { Identifier } from './identifier';
import { Language } from './language';
import { User } from './user';
import { Review } from './review';
import { Bundle } from './bundle';
import { ApiProperty } from '@nestjs/swagger';

export class TranslationRelations {
  @ApiProperty({ type: () => Identifier })
  identifier: Identifier;

  @ApiProperty({ type: () => Language })
  language: Language;

  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ isArray: true, type: () => Review })
  reviews: Review[];

  @ApiProperty({ isArray: true, type: () => Bundle })
  bundles: Bundle[];
}
