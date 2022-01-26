import { PickType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { CreateBranchDto } from './create-branch.dto';

export class ListBranchDto extends PickType(CreateBranchDto, [
  'projectId',
] as const) {
  @IsPositive()
  projectId: number;
}
