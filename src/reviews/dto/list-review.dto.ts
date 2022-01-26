import { PickType } from '@nestjs/swagger';
import { REVIEW_STATUS } from '@prisma/client';
import { IsEnum, IsOptional, IsPositive, MaxLength } from 'class-validator';
import { Review } from 'src/entities/review';
import { CreateReviewDto } from './create-review.dto';

export class ListReviewDto extends PickType(CreateReviewDto, [
  'translationId',
] as const) {}
