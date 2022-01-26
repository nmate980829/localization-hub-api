import { PartialType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateAccessDto } from './create-access.dto';

export class ListAccessDto extends PartialType(
  PickType(CreateAccessDto, ['projectId', 'userId'] as const),
) {
  @IsOptional()
  projectId?: number;
  @IsOptional()
  userId?: number;
}
