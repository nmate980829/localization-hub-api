import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, Length } from 'class-validator';

export class JwtDto {
  @Length(20)
  @IsHexadecimal()
  @ApiProperty({ type: String })
  token: string;
}
