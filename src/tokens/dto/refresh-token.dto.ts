import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsHexadecimal, Length } from 'class-validator';
import { Token } from 'src/entities/token';

export class RefreshTokenDto extends PickType(Token, ['refresh'] as const) {
  @Length(20)
  @IsHexadecimal()
  @ApiProperty({ type: String })
  refresh: string;
}
