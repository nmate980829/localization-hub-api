import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  Body,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Request } from 'express';
import { User } from 'src/utils/user.decorator';
import { TokenResponse } from './dto/token-response.dto';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { TokenDto } from 'src/auth/dto/token.dto';
import { EmptyResponse } from 'src/types/response.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ArrayResponseWrapper,
  ResponseWrapper,
} from 'src/utils/response-wrapper/responseWrapper';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AccessTokenDto } from 'src/auth/dto/access-token.dto';
import { CreateTokenDto } from './dto/create-token.dto';

@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  @ApiCreated(AccessTokenDto)
  create(
    @Body() body: CreateTokenDto,
    @User('id') userId: number,
  ): Promise<AccessTokenDto> {
    return this.tokensService.create(body, userId);
  }

  @Get()
  @ApiOkArray(TokenResponse)
  async findAll(@User('id') userId: number): Promise<TokenResponse[]> {
    return ArrayResponseWrapper(
      TokenResponse,
      await this.tokensService.findAll(userId),
    );
  }

  @Get(':id')
  @ApiOk(TokenResponse)
  async findOne(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<TokenResponse> {
    return ResponseWrapper(
      TokenResponse,
      await this.tokensService.findOne(id, userId),
    );
  }

  @Post('refresh')
  @ApiOk(TokenDto)
  refresh(
    @Body() body: RefreshTokenDto,
    @Req() req: Request,
  ): Promise<TokenDto> {
    return this.tokensService.refresh(req.token, body);
  }

  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(@Param('id') id: number, @User('id') userId: number): Promise<void> {
    return this.tokensService.remove(id, userId);
  }
}
