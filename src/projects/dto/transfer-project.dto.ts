import { PickType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { Project } from 'src/entities/project';

export class TransferProjectDto extends PickType(Project, ['ownerId']) {
  @IsPositive()
  ownerId: number;
}
