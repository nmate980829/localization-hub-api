import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SERVER_ROLE, User } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { SocialDto } from 'src/auth/dto/social.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateMe(id: number, dto: UpdateMeDto): Promise<User> {
    const { email, password, firstName, lastName } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException();
    const pwd = await bcrypt.hash(password, 8);
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password: pwd,
        firstName,
        lastName,
      },
    });
  }

  async connectGoogle(me: User, dto: SocialDto): Promise<User> {
    const { token } = dto;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload['sub'];

    const user = await this.prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    if (user) throw new ConflictException();
    if (me.googleId) throw new ConflictException();

    return await this.prisma.user.update({
      where: {
        id: me.id,
      },
      data: {
        googleId,
      },
    });
  }

  async removeMe(id: number, dto: DeleteUserDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException();
    const pwd = await bcrypt.compare(dto.password, user.password);
    if (pwd) {
      if (user.disabled === true)
        throw new UnauthorizedException('Your account is disabled');
    } else throw new ForbiddenException();
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    initiator: User,
  ): Promise<User> {
    const { role, disabled } = updateUserDto;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException();
    if (
      (user.role === SERVER_ROLE.ADMIN || role === SERVER_ROLE.ADMIN) &&
      initiator.role !== SERVER_ROLE.ADMIN
    )
      throw new ForbiddenException();
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
        disabled,
      },
    });
  }

  async remove(id: number, initiator: User): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException();
    if (user.role === SERVER_ROLE.ADMIN && initiator.role !== SERVER_ROLE.ADMIN)
      throw new ForbiddenException();
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
