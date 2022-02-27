import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ListReviewDto } from './dto/list-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateReviewDto, reviewerId: number): Promise<Review> {
    const { comment, translationId, status } = dto;
    return this.prisma.review.create({
      data: {
        comment,
        translationId,
        status,
        reviewerId,
      },
    });
  }

  findAll(dto: ListReviewDto): Promise<Review[]> {
    const { translationId } = dto;
    return this.prisma.review.findMany({ where: { translationId } });
  }

  findOne(id: number): Promise<Review> {
    return this.prisma.review.findUnique({ where: { id } });
  }

  async remove(id: number, userId: number, moderator: boolean): Promise<void> {
    const comment = await this.prisma.review.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (moderator !== true && comment.reviewerId !== userId)
      throw new ForbiddenException();
    await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
