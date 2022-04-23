import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class CreateTokenDto {
  @IsOptional()
  @MaxLength(32)
  @ApiPropertyOptional({ type: String })
  tokenDescription?: string;
}
