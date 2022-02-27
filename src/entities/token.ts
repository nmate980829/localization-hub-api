import { TOKEN_TYPE } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Token {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  token: string;

  @ApiPropertyOptional({ type: String })
  refresh?: string;

  @ApiProperty({ type: Date })
  expiration: Date;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiProperty({ enum: TOKEN_TYPE, enumName: 'TOKEN_TYPE' })
  type: TOKEN_TYPE = TOKEN_TYPE.ACCESS;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
