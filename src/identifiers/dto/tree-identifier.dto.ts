import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsPositive } from 'class-validator';
import { CreateIdentifierDto } from './create-identifier.dto';

export class TreeIdentifierDto extends PickType(CreateIdentifierDto, [
  'projectId',
] as const) {
  @ApiProperty({ isArray: true, type: () => Number })
  @IsArray()
  @IsPositive({ each: true })
  branches: number[];
}
