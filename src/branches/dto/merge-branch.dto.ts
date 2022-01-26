import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { CreateBranchDto } from './create-branch.dto';

export class MergeBranchDto {
  @ApiProperty({ type: Number, description: 'Target branch to merge into' })
  @IsPositive()
  branchId: number;
}
