import { SERVER_ROLE } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  googleId?: string;

  @ApiPropertyOptional({ type: String })
  firstName?: string;

  @ApiPropertyOptional({ type: String })
  lastName?: string;

  @ApiPropertyOptional({ type: String })
  password?: string;

  @ApiProperty({ enum: SERVER_ROLE, enumName: 'SERVER_ROLE' })
  role: SERVER_ROLE = SERVER_ROLE.USER;

  @ApiProperty({ type: Boolean })
  disabled: boolean;

  @ApiProperty({ type: Number })
  inviteId: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
