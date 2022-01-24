import { BUNDLE_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Bundle {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  issuerId: number;

  @ApiPropertyOptional({ type: Number })
  reviewerId?: number;

  @ApiProperty({ type: Number })
  projectId: number;

  @ApiProperty({ enum: BUNDLE_STATUS, enumName: 'BUNDLE_STATUS' })
  status: BUNDLE_STATUS = BUNDLE_STATUS.DRAFT;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
