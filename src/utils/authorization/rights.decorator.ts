import {
  applyDecorators,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectInterceptor } from '../project/project.interceptor';
import { RightsGuard } from './rights.guard';

export const Rights = (...rights: string[]) =>
  applyDecorators(
    UseInterceptors(ProjectInterceptor),
    SetMetadata('rights', rights),
    UseGuards(RightsGuard),
  );
