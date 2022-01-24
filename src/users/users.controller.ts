import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/utils/user.decorator';
import { HR } from 'src/utils/authorization/serverRole.decorator';
import { User as UserEntity } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserResponse } from './dto/user-response.dto';
import { ApiOk, ApiOkArray } from 'src/utils/response-wrapper/wrap.decorator';
import {
  ArrayResponseWrapper,
  ResponseWrapper,
} from 'src/utils/response-wrapper/responseWrapper';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { SocialDto } from 'src/auth/dto/social.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HR()
  @Get()
  @ApiOkArray(UserResponse)
  async findAll(): Promise<UserResponse[]> {
    return ArrayResponseWrapper(
      UserResponse,
      await this.usersService.findAll(),
    );
  }

  @Get('me')
  @ApiOk(UserResponse)
  getMe(@User() user: UserEntity): UserResponse {
    return ResponseWrapper(UserResponse, user);
  }

  @Patch('me')
  @ApiOk(UserResponse)
  async updateMe(
    @Body() dto: UpdateMeDto,
    @User('id') id: number,
  ): Promise<UserResponse> {
    return ResponseWrapper(
      UserResponse,
      await this.usersService.updateMe(id, dto),
    );
  }

  @Patch('me/connect-google')
  @ApiOk(UserResponse)
  async connectGoogle(
    @Body() dto: SocialDto,
    @User() user: UserEntity,
  ): Promise<UserResponse> {
    return ResponseWrapper(
      UserResponse,
      await this.usersService.connectGoogle(user, dto),
    );
  }

  @Delete('me')
  @ApiOk(undefined)
  deleteMe(@Body() dto: DeleteUserDto, @User('id') id: number): Promise<void> {
    return this.usersService.removeMe(id, dto);
  }

  @HR()
  @Get(':id')
  @ApiOk(UserResponse)
  async findOne(@Param('id') id: number): Promise<UserResponse> {
    return ResponseWrapper(UserResponse, await this.usersService.findOne(id));
  }

  @HR()
  @Patch(':id')
  @ApiOk(UserResponse)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity,
  ): Promise<UserResponse> {
    return ResponseWrapper(
      UserResponse,
      await this.usersService.update(id, updateUserDto, user),
    );
  }

  @HR()
  @Delete(':id')
  @ApiOk(undefined)
  remove(@Param('id') id: number, @User() user: UserEntity): Promise<void> {
    return this.usersService.remove(id, user);
  }
}
