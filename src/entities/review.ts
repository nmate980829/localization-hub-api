import { REVIEW_STATUS } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Review {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  comment?: string;

  @ApiPropertyOptional({ type: Number })
  reviewerId?: number;

  @ApiProperty({ type: Number })
  translationId: number;

  @ApiProperty({ enum: REVIEW_STATUS, enumName: 'REVIEW_STATUS' })
  status: REVIEW_STATUS = REVIEW_STATUS.CHANGE_REQUEST;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
