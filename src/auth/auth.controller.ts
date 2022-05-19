import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Invite } from 'src/entities/invite';
import { ApiCreated, ApiOk } from 'src/utils/response-wrapper/wrap.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SocialDto } from './dto/social.dto';
import { TokenDto } from './dto/token.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { ClaimTokenDto } from './dto/claim-token.dto';

@ApiSecurity({})
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Post('login')
  @ApiCreated(AccessTokenDto)
  login(@Body() body: LoginDto): Promise<AccessTokenDto> {
    return this.authService.login(body);
  }

  @Post('register/:token')
  @ApiCreated(AccessTokenDto)
  register(
    @Param('token') token: string,
    @Body() body: RegisterDto,
  ): Promise<AccessTokenDto> {
    return this.authService.register(token, body);
  }

  @Get('register/:token')
  @ApiOk(Invite)
  registerProbe(@Param('token') token: string): Promise<Invite> {
    return this.authService.registerProbe(token);
  }

  @Post('google-signin/register/:token')
  @ApiCreated(AccessTokenDto)
  googleRegister(
    @Param('token') token: string,
    @Body() body: SocialDto,
  ): Promise<AccessTokenDto> {
    return this.authService.registerGoogle(token, body);
  }

  @Post('google-signin/login')
  @ApiCreated(AccessTokenDto)
  googleLogin(@Body() body: SocialDto): Promise<AccessTokenDto> {
    return this.authService.loginGoogle(body);
  }

  @Post('claim')
  @ApiCreated(TokenDto)
  claim(@Body() body: ClaimTokenDto): Promise<TokenDto> {
    return this.authService.claim(body);
  }
}
