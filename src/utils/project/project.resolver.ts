import { Injectable, NotImplementedException } from '@nestjs/common';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectResolver {
  resolve(id: number): Promise<Project> {
    throw new NotImplementedException();
  }
}
