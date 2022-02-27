import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import crypto from 'crypto';
import { Invite, SERVER_ROLE, User } from '@prisma/client';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { sendInvitation } from 'src/utils/email.service';
import dayjs from 'dayjs';

@Injectable()
export class InvitationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInvitationDto, user: User): Promise<Invite> {
    const { email, role } = dto;
    if (role === SERVER_ROLE.ADMIN && user.role !== SERVER_ROLE.ADMIN)
      throw new ForbiddenException();
    const token = crypto.randomBytes(20).toString('hex');
    const invite = await this.prisma.invite.create({
      data: {
        email,
        role,
        token,
        expiration: dayjs().add(30, 'days').toDate(),
        initiator: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    if (!invite) return;
    sendInvitation(invite.email, invite.token);
    return invite;
  }

  findAll(): Promise<Invite[]> {
    return this.prisma.invite.findMany({
      where: {
        user: null,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findOne(id: number): Promise<Invite> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        id,
      },
    });
    if (!invite) throw new NotFoundException();
    return invite;
  }

  async resend(id: number): Promise<Invite> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        id,
      },
    });
    if (!invite) throw new NotFoundException();
    const token = crypto.randomBytes(20).toString('hex');
    const inviteUp = await this.prisma.invite.update({
      where: {
        id: invite.id,
      },
      data: {
        token,
        expiration: dayjs().add(30, 'days').toDate(),
      },
    });
    sendInvitation(inviteUp.email, inviteUp.token);
    return inviteUp;
  }

  async remove(id: number, user: User): Promise<void> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        id,
      },
    });
    if (!invite) throw new NotFoundException();
    if (invite.role === SERVER_ROLE.ADMIN && user.role !== SERVER_ROLE.ADMIN)
      throw new ForbiddenException();

    await this.prisma.invite.delete({
      where: {
        id,
      },
    });
  }
}
