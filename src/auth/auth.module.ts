import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
  exports: [JwtModule, AuthMiddleware],
})
export class AuthModule {}
