import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexadecimal, IsOptional, Length, MaxLength } from 'class-validator';

export class SocialDto {
  @ApiProperty({ type: String })
  @Length(40)
  @IsHexadecimal()
  token: string;
  @IsOptional()
  @MaxLength(32)
  @ApiPropertyOptional({ type: Number })
  tokenDescription?: string;
}
