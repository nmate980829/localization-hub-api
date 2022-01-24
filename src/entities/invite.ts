import { SERVER_ROLE } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Invite {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  token: string;

  @ApiProperty({ enum: SERVER_ROLE, enumName: 'SERVER_ROLE' })
  role: SERVER_ROLE = SERVER_ROLE.USER;

  @ApiProperty({ type: Date })
  expiration: Date;

  @ApiPropertyOptional({ type: Number })
  initiatorId?: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
