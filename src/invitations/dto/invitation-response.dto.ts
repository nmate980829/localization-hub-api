import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Invite } from 'src/entities/invite';

export class InvitationResponse extends Invite {
  @Exclude()
  @ApiHideProperty()
  token: string;
}
