import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Token } from 'src/entities/token';

export class TokenResponse extends Token {
  @Exclude()
  @ApiHideProperty()
  token: string;
  @Exclude()
  @ApiHideProperty()
  refresh: string;
}
