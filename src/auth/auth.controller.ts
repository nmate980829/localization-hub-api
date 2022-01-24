import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiSecurity } from '@nestjs/swagger';
import { Invite } from 'src/entities/invite';
import { ApiCreated, ApiOk } from 'src/utils/response-wrapper/wrap.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SocialDto } from './dto/social.dto';
import { TokenDto } from './dto/token.dto';

@ApiSecurity({})
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Post('login')
  @ApiOk(TokenDto)
  login(@Body() body: LoginDto): Promise<TokenDto> {
    return this.authService.login(body);
  }

  @Post('register/:token')
  @ApiCreated(TokenDto)
  register(
    @Param('token') token: string,
    @Body() body: RegisterDto,
  ): Promise<TokenDto> {
    return this.authService.register(token, body);
  }

  @Get('register/:token')
  @ApiOk(Invite)
  registerProbe(@Param('token') token: string): Promise<Invite> {
    return this.authService.registerProbe(token);
  }

  @Post('google-signin/register/:token')
  @ApiCreated(TokenDto)
  googleRegister(
    @Param('token') token: string,
    @Body() body: SocialDto,
  ): Promise<TokenDto> {
    return this.authService.registerGoogle(token, body.token);
  }
  @Post('google-signin/login')
  @ApiCreated(TokenDto)
  googleLogin(@Body() body: SocialDto): Promise<TokenDto> {
    return this.authService.loginGoogle(body.token);
  }
}
