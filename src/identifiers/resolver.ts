import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { ProjectResolver } from 'src/utils/project/project.resolver';

@Injectable()
export class Resolver implements ProjectResolver {
  constructor(private readonly prisma: PrismaService) {}

  async resolve(id: number): Promise<Project> {
    const identifier = await this.prisma.identifier.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!identifier) throw new NotFoundException();
    return identifier.project;
  }
}
