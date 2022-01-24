import { ApiProperty } from '@nestjs/swagger';

export class Translation {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  value: string;

  @ApiProperty({ type: Boolean })
  deleted: boolean;

  @ApiProperty({ type: Number })
  keyId: number;

  @ApiProperty({ type: Number })
  languageId: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  version: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
