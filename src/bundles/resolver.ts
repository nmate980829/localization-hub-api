import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { ProjectResolver } from 'src/utils/project/project.resolver';

@Injectable()
export class Resolver implements ProjectResolver {
  constructor(private readonly prisma: PrismaService) {}

  async resolve(id: number): Promise<Project> {
    const bundle = await this.prisma.bundle.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!bundle) throw new NotFoundException();
    return bundle.project;
  }
}
