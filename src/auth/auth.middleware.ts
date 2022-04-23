import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_TYPE } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined || !authHeader.startsWith('Bearer '))
      throw new UnauthorizedException();
    const payload = this.jwt.verify(authHeader.substring(7));
    const jwtEntity = plainToInstance(JwtDto, payload);
    const validationErrors = await validate(jwtEntity);
    if (validationErrors.length > 0) throw new UnauthorizedException();
    const token = await this.prisma.token.findUnique({
      where: {
        token: jwtEntity.token,
      },
    });
    if (
      !token ||
      token.type !== TOKEN_TYPE.BEARER ||
      dayjs().isAfter(token.expiration)
    )
      throw new UnauthorizedException();
    const user = await this.prisma.user.findUnique({
      where: {
        id: token.userId,
      },
    });
    if (!user || user.disabled === true) throw new UnauthorizedException();
    req.token = token;
    req.user = user;
    next();
  }
}
