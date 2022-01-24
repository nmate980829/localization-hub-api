import { PickType } from '@nestjs/swagger';
import { BUNDLE_STATUS } from '@prisma/client';
import { IsEnum, IsOptional, IsPositive, MaxLength } from 'class-validator';
import { Comment } from 'src/entities/comment';

export class ListCommentDto extends PickType(Comment, ['bundleId']) {}
