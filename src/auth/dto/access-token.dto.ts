import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({ type: String })
  access: string;
  @ApiProperty({ type: String })
  server: string;
}
