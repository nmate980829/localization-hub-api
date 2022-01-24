import { PickType } from '@nestjs/swagger';
import { REVIEW_STATUS } from '@prisma/client';
import { IsEnum, IsOptional, IsPositive, MaxLength } from 'class-validator';
import { Review } from 'src/entities/review';

export class CreateReviewDto extends PickType(Review, [
  'comment',
  'translationId',
  'status',
]) {
  @IsOptional()
  @MaxLength(256)
  comment?: string;
  @IsPositive()
  translationId: number;
  @IsOptional()
  @IsEnum(REVIEW_STATUS)
  status: REVIEW_STATUS;
}
