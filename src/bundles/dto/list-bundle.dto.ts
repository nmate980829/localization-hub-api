import { PartialType, PickType } from '@nestjs/swagger';
import { BUNDLE_STATUS } from '@prisma/client';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { Bundle } from 'src/entities/bundle';

export class ListBundleDto extends PartialType(
  PickType(Bundle, ['projectId', 'issuerId', 'reviewerId', 'status'] as const),
) {
  @IsOptional()
  @IsPositive()
  projectId?: number;

  @IsOptional()
  @IsPositive()
  issuerId?: number;

  @IsOptional()
  @IsPositive()
  reviewerId?: number;

  @IsOptional()
  @IsEnum(BUNDLE_STATUS)
  status?: BUNDLE_STATUS;
}
