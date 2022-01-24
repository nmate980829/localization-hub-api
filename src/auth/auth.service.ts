import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Invite } from '@prisma/client';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { OAuth2Client } from 'google-auth-library';

import { PrismaService } from 'src/utils/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(body: LoginDto): Promise<TokenDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) throw new UnauthorizedException();
    const pwd = await bcrypt.compare(body.password, user.password);
    if (pwd) {
      if (user.disabled === true)
        throw new UnauthorizedException('Your account is disabled');
      const token = this.jwt.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '30d',
        },
      );
      return { token };
    } else throw new UnauthorizedException();
  }
  async registerProbe(token: string): Promise<Invite> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        token,
      },
    });
    Logger.log('inside service');
    if (!invite || dayjs().isAfter(invite.expiration))
      throw new UnauthorizedException();
    return invite;
  }
  async register(token: string, body: RegisterDto): Promise<TokenDto> {
    const { email, password, firstName, lastName } = body;
    const invite = await this.prisma.invite.findUnique({
      where: {
        token,
      },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!invite || dayjs().isAfter(invite.expiration))
      throw new UnauthorizedException('invite expired');

    if (user) throw new UnauthorizedException('email already taken');
    const pwd = await bcrypt.hash(password, 8);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: pwd,
        firstName,
        lastName,
        role: invite.role,
        invite: {
          connect: {
            id: invite.id,
          },
        },
      },
    });

    if (newUser) {
      const resToken = this.jwt.sign(
        {
          id: newUser.id,
        },
        {
          expiresIn: '30d',
        },
      );
      return { token: resToken };
    } else throw new InternalServerErrorException();
  }

  async loginGoogle(body: string): Promise<TokenDto> {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: body,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload['sub'];

    const user = await this.prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    if (!user) throw new UnauthorizedException();
    if (user.disabled === true)
      throw new UnauthorizedException('Your account is disabled');
    const token = this.jwt.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30d',
      },
    );
    return { token };
  }

  async registerGoogle(token: string, body: string): Promise<TokenDto> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        token,
      },
    });
    if (!invite || dayjs().isAfter(invite.expiration))
      throw new UnauthorizedException('invite expired');

    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: body,
      audience: process.env.CLIENT_ID,
    });
    const { sub, email, given_name, family_name, /*name,*/ email_verified } =
      ticket.getPayload();

    const gUser = await this.prisma.user.findUnique({
      where: {
        googleId: sub,
      },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if ((user && email_verified) || gUser)
      throw new UnauthorizedException('email already taken');

    const newUser = await this.prisma.user.create({
      data: {
        email,
        firstName: given_name,
        lastName: family_name,
        role: invite.role,
        invite: {
          connect: {
            id: invite.id,
          },
        },
      },
    });

    if (newUser) {
      const resToken = this.jwt.sign(
        {
          id: newUser.id,
        },
        {
          expiresIn: '30d',
        },
      );
      return { token: resToken };
    } else throw new InternalServerErrorException();
  }
}
