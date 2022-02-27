import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ type: String })
  token: string;
  @ApiProperty({ type: String })
  refresh: string;
  @ApiProperty({ type: String })
  server: string;
}
