import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Identifier {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  key: string;

  @ApiProperty({ type: Number })
  projectId: number;

  @ApiPropertyOptional({ type: Number })
  userId?: number;

  @ApiPropertyOptional({ type: Number })
  parentId?: number;

  @ApiProperty({ type: Number })
  branchId: number;

  @ApiProperty({ type: Boolean })
  deleted: boolean;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
