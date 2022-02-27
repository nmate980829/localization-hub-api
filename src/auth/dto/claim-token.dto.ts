import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, Length } from 'class-validator';

export class ClaimTokenDto {
  @Length(20)
  @IsHexadecimal()
  @ApiProperty({ type: String })
  access: string;
}
