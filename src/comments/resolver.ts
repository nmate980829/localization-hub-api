import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { ProjectResolver } from 'src/utils/project/project.resolver';

@Injectable()
export class Resolver implements ProjectResolver {
  constructor(private readonly prisma: PrismaService) {}

  async resolve(id: number): Promise<Project> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        bundle: {
          include: {
            project: true,
          },
        },
      },
    });
    if (!comment?.bundle?.project) throw new NotFoundException();
    return comment.bundle.project;
  }
}
