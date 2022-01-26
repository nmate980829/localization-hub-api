import { ApiProperty } from '@nestjs/swagger';
import { Identifier } from 'src/entities/identifier';

export class IdentifierEntity extends Identifier {
  @ApiProperty({ isArray: true, type: () => IdentifierEntity })
  children: IdentifierEntity[];
}
