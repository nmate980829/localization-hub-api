import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    UtilsModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
  exports: [JwtModule, AuthMiddleware],
})
export class AuthModule {}
