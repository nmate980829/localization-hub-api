import { ApiProperty } from '@nestjs/swagger';

export class Access {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  projectId: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  roleId: number;

  @ApiProperty({ type: Boolean })
  revoked: boolean;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
