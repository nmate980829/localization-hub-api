import { PickType } from '@nestjs/swagger';
import { BUNDLE_STATUS } from '@prisma/client';
import { IsEnum, IsOptional, IsPositive, MaxLength } from 'class-validator';
import { Comment } from 'src/entities/comment';

export class CreateCommentDto extends PickType(Comment, [
  'text',
  'bundleId',
  'status',
]) {
  @IsOptional()
  @MaxLength(256)
  text?: string;

  @IsPositive()
  bundleId: number;

  @IsOptional()
  @IsEnum(BUNDLE_STATUS)
  status?: BUNDLE_STATUS;
}
