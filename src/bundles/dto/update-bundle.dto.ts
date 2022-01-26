import { PartialType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateBundleDto } from './create-bundle.dto';

export class UpdateBundleDto extends PartialType(
  PickType(CreateBundleDto, ['name', 'description', 'translations'] as const),
) {
  @IsOptional()
  name?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  translations?: number[];
}
