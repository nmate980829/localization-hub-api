import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log('inside middleware');
    const authHeader = req.headers.authorization;
    if (authHeader === undefined || !authHeader.startsWith('Bearer '))
      throw new UnauthorizedException();
    const token = authHeader.substring(7);
    const payload = this.jwt.verify(token);
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user || user.disabled === true) throw new UnauthorizedException();
    req.user = user;
    next();
  }
}
