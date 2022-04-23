import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Project, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RightsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rights = this.reflector.get<string[]>('rights', context.getHandler());
    if (!rights) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const project: Project = request.project;
    const accesses = await this.prisma.access.findMany({
      where: {
        projectId: project.id,
        userId: user.id,
        revoked: false,
      },
      include: {
        role: {
          include: {
            rights: true,
          },
        },
      },
    });
    const prismaRights = accesses.flatMap((access) =>
      access.role.rights.map((right) => right.name),
    );
    request.rights = prismaRights;
    return rights.every((right) => prismaRights.includes(right));
  }
}
