import { ApiProperty } from '@nestjs/swagger';

export class Config {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  key: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  value: string;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
