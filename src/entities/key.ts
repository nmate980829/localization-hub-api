import { ApiProperty } from '@nestjs/swagger';

export class Key {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  key: string;

  @ApiProperty({ type: Number })
  projectId: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  parentId: number;

  @ApiProperty({ type: Boolean })
  deleted: boolean;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
