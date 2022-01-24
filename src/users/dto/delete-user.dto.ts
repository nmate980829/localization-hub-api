import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';
import { User } from 'src/entities/user';

export class DeleteUserDto extends PickType(User, ['password']) {
  @ApiProperty() //{ type: String })
  @MinLength(6)
  @MaxLength(128)
  password: string;
}
