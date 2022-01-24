import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ type: String })
  token: string;
}
