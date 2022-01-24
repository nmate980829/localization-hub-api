import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  name?: string;
  @IsOptional()
  description?: string;
}
