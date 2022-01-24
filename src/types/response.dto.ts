import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Response<T> {
  @ApiProperty({ type: Number })
  statusCode: number;
  @ApiPropertyOptional({ type: String })
  message?: string;
  @ApiPropertyOptional()
  data?: T;
}
