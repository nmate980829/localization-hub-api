import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Comment } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ListCommentDto } from './dto/list-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCommentDto, user: User): Promise<Comment> {
    const { bundleId, text, status } = dto;
    const bundle = await this.prisma.bundle.findUnique({
      where: {
        id: bundleId,
      },
    });
    if (!bundle) throw new NotFoundException();
    const comment = await this.prisma.comment.create({
      data: {
        bundle: {
          connect: {
            id: bundleId,
          },
        },
        text,
        status,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    await this.prisma.bundle.update({
      where: {
        id: bundleId,
      },
      data: {
        status,
      },
    });
    return comment;
  }

  findAll(dto: ListCommentDto): Promise<Comment[]> {
    const { bundleId } = dto;
    return this.prisma.comment.findMany({
      where: {
        bundleId,
      },
    });
  }

  findOne(id: number): Promise<Comment> {
    return this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async resolve(id: number, userId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (comment.userId !== userId) throw new ForbiddenException();
    return await this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        resolved: true,
      },
    });
  }

  async remove(id: number, userId: number): Promise<void> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    if (comment.userId !== userId) throw new ForbiddenException();
    await this.prisma.comment.delete({ where: { id } });
  }
}
