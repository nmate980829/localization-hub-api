import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Invite, TOKEN_TYPE } from '@prisma/client';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { TokenDto } from '../dto/token.dto';
import { SocialDto } from '../dto/social.dto';
import { AccessTokenDto } from '../dto/access-token.dto';
import { ClaimTokenDto } from '../dto/claim-token.dto';

// TODO: email verification
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(body: LoginDto): Promise<AccessTokenDto> {
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
      const access = crypto.randomBytes(20).toString('hex');
      await this.prisma.token.create({
        data: {
          token: access,
          expiration: dayjs().add(30, 'minutes').toDate(),
          name: body.tokenDescription,
          type: TOKEN_TYPE.ACCESS,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return { access, server: process.env.SERVER_URL };
    } else throw new UnauthorizedException();
  }

  async registerProbe(token: string): Promise<Invite> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        token,
      },
    });
    if (!invite || dayjs().isAfter(invite.expiration))
      throw new UnauthorizedException();
    return invite;
  }

  async register(token: string, body: RegisterDto): Promise<AccessTokenDto> {
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
      const access = crypto.randomBytes(20).toString('hex');
      await this.prisma.token.create({
        data: {
          token: access,
          expiration: dayjs().add(30, 'minutes').toDate(),
          name: body.tokenDescription,
          type: TOKEN_TYPE.ACCESS,
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
      return { access, server: process.env.SERVER_URL };
    } else throw new InternalServerErrorException();
  }

  async loginGoogle(body: SocialDto): Promise<AccessTokenDto> {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: body.token,
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
    const access = crypto.randomBytes(20).toString('hex');
    await this.prisma.token.create({
      data: {
        token: access,
        expiration: dayjs().add(30, 'minutes').toDate(),
        name: body.tokenDescription,
        type: TOKEN_TYPE.ACCESS,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return { access, server: process.env.SERVER_URL };
  }

  async registerGoogle(
    token: string,
    body: SocialDto,
  ): Promise<AccessTokenDto> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        token,
      },
    });
    if (!invite || dayjs().isAfter(invite.expiration))
      throw new UnauthorizedException('invite expired');

    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: body.token,
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
      const access = crypto.randomBytes(20).toString('hex');
      await this.prisma.token.create({
        data: {
          token: access,
          expiration: dayjs().add(30, 'minutes').toDate(),
          name: body.tokenDescription,
          type: TOKEN_TYPE.ACCESS,
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
      return { access, server: process.env.SERVER_URL };
    } else throw new InternalServerErrorException();
  }
  async claim(dto: ClaimTokenDto): Promise<TokenDto> {
    const { access } = dto;
    const accessToken = await this.prisma.token.findUnique({
      where: { token: access },
    });
    if (
      !accessToken ||
      accessToken.type !== TOKEN_TYPE.ACCESS ||
      dayjs().isAfter(accessToken.expiration)
    )
      throw new UnauthorizedException();
    const token = crypto.randomBytes(20).toString('hex');
    const refresh = crypto.randomBytes(20).toString('hex');
    await this.prisma.token.create({
      data: {
        token,
        refresh,
        expiration: dayjs().add(30, 'days').toDate(),
        name: accessToken.name,
        type: TOKEN_TYPE.BEARER,
        user: {
          connect: {
            id: accessToken.userId,
          },
        },
      },
    });
    await this.prisma.token.delete({ where: { id: accessToken.id } });
    const jwt = this.jwt.sign(
      {
        token,
      },
      {
        expiresIn: '30d',
      },
    );
    return {
      token: jwt,
      refresh,
      server: process.env.SERVER_URL,
      uiURL: process.env.UI_URL,
    };
  }
}
