import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ProjectGuard } from '../project/project.guard';
import { RightsGuard } from './rights.guard';

export const Rights = (...rights: string[]) =>
  applyDecorators(
    SetMetadata('rights', rights),
    UseGuards(ProjectGuard, RightsGuard),
  );
