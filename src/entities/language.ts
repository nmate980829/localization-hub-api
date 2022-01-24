import { ApiProperty } from '@nestjs/swagger';

export class Language {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  key: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Boolean })
  deleted: boolean;

  @ApiProperty({ type: Number })
  projectId: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
