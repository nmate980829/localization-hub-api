import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { ProjectResolver } from 'src/utils/project/project.resolver';

@Injectable()
export class Resolver implements ProjectResolver {
  constructor(private readonly prisma: PrismaService) {}

  async resolve(id: number): Promise<Project> {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        translation: {
          include: {
            key: {
              include: {
                project: true,
              },
            },
          },
        },
      },
    });
    if (!review) throw new NotFoundException();
    return review.translation.key.project;
  }
}
