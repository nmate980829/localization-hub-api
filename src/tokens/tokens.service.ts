import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Token, TOKEN_TYPE } from '@prisma/client';
import { TokenDto } from 'src/auth/dto/token.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AccessTokenDto } from 'src/auth/dto/access-token.dto';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async create(body: CreateTokenDto, userId: number): Promise<AccessTokenDto> {
    const access = crypto.randomBytes(20).toString('hex');
    await this.prisma.token.create({
      data: {
        token: access,
        expiration: dayjs().add(30, 'minutes').toDate(),
        name: body.tokenDescription,
        type: TOKEN_TYPE.ACCESS,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return { access, server: process.env.SERVER_URL };
  }

  findAll(userId: number): Promise<Token[]> {
    return this.prisma.token.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Token> {
    const token = await this.prisma.token.findUnique({ where: { id } });
    if (!token) throw new NotFoundException();
    if (token.userId !== userId) throw new ForbiddenException();
    return token;
  }

  async refresh(tokenEntity: Token, dto: RefreshTokenDto): Promise<TokenDto> {
    const { id, refresh } = tokenEntity;
    if (refresh !== dto.refresh) throw new ForbiddenException();
    const tokenString = crypto.randomBytes(20).toString('hex');
    const refreshToken = crypto.randomBytes(20).toString('hex');
    await this.prisma.token.update({
      where: { id },
      data: {
        token: tokenString,
        refresh: refreshToken,
        expiration: dayjs().add(30, 'days').toDate(),
      },
    });
    const token = this.jwt.sign(
      {
        token: tokenString,
      },
      {
        expiresIn: '30d',
      },
    );
    return {
      token,
      refresh: refreshToken,
      server: process.env.SERVER_URL,
      uiURL: process.env.UI_URL,
    };
  }

  async remove(id: number, userId: number): Promise<void> {
    const token = await this.prisma.token.findUnique({ where: { id } });
    if (!token) throw new NotFoundException();
    if (token.userId !== userId) throw new ForbiddenException();
    await this.prisma.token.delete({ where: { id } });
  }
}
