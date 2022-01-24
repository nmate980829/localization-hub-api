import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { ProjectResolver } from './project.resolver';

@Injectable()
export class ProjectInterceptor implements NestInterceptor {
  constructor(
    private readonly resolver: ProjectResolver,
    private readonly prisma: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    if (id === undefined)
      request.project = await this.prisma.project.findUnique({
        where: { id: request.body.projectId },
      });
    else request.project = await this.resolver.resolve(Number.parseInt(id));
    return next.handle();
  }
}
