import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, Length } from 'class-validator';

export class SocialDto {
  @ApiProperty({ type: String })
  @Length(40)
  @IsHexadecimal()
  token: string;
}
