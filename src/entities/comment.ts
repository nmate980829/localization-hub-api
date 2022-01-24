import { BUNDLE_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  text?: string;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  bundleId: number;

  @ApiPropertyOptional({ enum: BUNDLE_STATUS, enumName: 'BUNDLE_STATUS' })
  status?: BUNDLE_STATUS;

  @ApiProperty({ type: Boolean })
  resolved: boolean;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
