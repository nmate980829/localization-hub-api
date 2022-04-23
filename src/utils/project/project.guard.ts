import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectResolver } from './project.resolver';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    @Inject('ProjectResolver') private readonly resolver: ProjectResolver,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let id = request.params.id;
    if (id === undefined) {
      id = request.body.projectId;
      if (id === undefined) {
        id = request.query.projectId;
        if (id === undefined) {
          id = request.body.identifierId;
          if (id === undefined) {
            id = request.query.identifierId;
            if (id === undefined) return false;
          }
          const identifier = await this.prisma.identifier.findUnique({
            where: { id: Number.parseInt(id) },
          });
          id = identifier.projectId;
        }
      }
      request.project = await this.prisma.project.findUnique({
        where: { id: Number.parseInt(id) },
      });
    } else request.project = await this.resolver.resolve(Number.parseInt(id));
    return request.project !== undefined;
  }
}
