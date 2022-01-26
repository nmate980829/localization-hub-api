import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { IdentifierEntity as Identifier } from 'src/identifiers/entities/identifier.entity';
import { Translation } from 'src/entities/translation';
import { TranslationRelations } from 'src/entities/translation_relations';

export class TranslationEntity extends IntersectionType(
  Translation,
  PickType(TranslationRelations, ['language'] as const),
) {}

export class IdentifierEntity extends Identifier {
  @ApiProperty({ isArray: true, type: () => TranslationEntity })
  translations: TranslationEntity[];
}
