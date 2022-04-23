import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { CreateIdentifierDto } from './create-identifier.dto';

export class TreeIdentifierDto extends PickType(CreateIdentifierDto, [
  'projectId',
] as const) {
  @ApiProperty({ isArray: true, type: () => String })
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  @IsArray()
  branches: string[];
}
