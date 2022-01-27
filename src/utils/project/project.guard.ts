import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectResolver } from './project.resolver';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    @Inject('ProjectResolver') private readonly resolver: ProjectResolver,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    if (id === undefined) {
      if (request.body.projectId === undefined) return false;
      request.project = await this.prisma.project.findUnique({
        where: { id: request.body.projectId },
      });
    } else request.project = await this.resolver.resolve(Number.parseInt(id));
    return request.project !== undefined;
  }
}
