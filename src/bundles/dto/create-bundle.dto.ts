import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsArray, IsPositive, MaxLength, MinLength } from 'class-validator';
import { Bundle } from 'src/entities/bundle';

export class CreateBundleDto extends PickType(Bundle, [
  'name',
  'description',
  'projectId',
] as const) {
  @MinLength(5)
  @MaxLength(128)
  name: string;

  @MinLength(5)
  @MaxLength(256)
  description: string;

  @IsPositive()
  projectId: number;

  @ApiPropertyOptional({ isArray: true, type: () => Number })
  @IsArray()
  @IsPositive({ each: true })
  translations: number[];
}
