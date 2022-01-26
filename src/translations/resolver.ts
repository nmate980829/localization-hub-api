import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { ProjectResolver } from 'src/utils/project/project.resolver';

@Injectable()
export class Resolver implements ProjectResolver {
  constructor(private readonly prisma: PrismaService) {}

  async resolve(id: number): Promise<Project> {
    const translation = await this.prisma.translation.findUnique({
      where: { id },
      include: { language: { include: { project: true } } },
    });
    if (!translation) throw new NotFoundException();
    return translation.language.project;
  }
}
