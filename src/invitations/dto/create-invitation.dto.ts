import { PickType } from '@nestjs/swagger';
import { SERVER_ROLE } from '@prisma/client';
import { IsEmail, IsEnum } from 'class-validator';
import { Invite } from 'src/entities/invite';

export class CreateInvitationDto extends PickType(Invite, [
  'email',
  'role',
] as const) {
  @IsEmail()
  email: string;
  @IsEnum(SERVER_ROLE)
  role: SERVER_ROLE;
}
