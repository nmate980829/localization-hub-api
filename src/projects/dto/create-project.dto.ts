import { PickType } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';
import { Project } from 'src/entities/project';

export class CreateProjectDto extends PickType(Project, [
  'name',
  'description',
]) {
  @MinLength(5)
  @MaxLength(128)
  name: string;
  @MinLength(5)
  @MaxLength(128)
  description: string;
}
