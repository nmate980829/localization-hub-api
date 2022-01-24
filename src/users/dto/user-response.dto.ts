import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/entities/user';

export class UserResponse extends User {
  @Exclude()
  @ApiHideProperty()
  password?: string;
}
