import { ApiProperty } from '@nestjs/swagger';

export class Branch {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  key: string;

  @ApiProperty({ type: Number })
  projectId: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
