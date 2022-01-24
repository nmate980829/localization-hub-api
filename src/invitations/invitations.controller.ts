import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { HR } from 'src/utils/authorization/serverRole.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { InvitationResponse } from './dto/invitation-response.dto';
import {
  ArrayResponseWrapper,
  ResponseWrapper,
} from 'src/utils/response-wrapper/responseWrapper';
import { User } from 'src/utils/user.decorator';
import { User as UserEntity } from '@prisma/client';

@HR()
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  @ApiCreated(InvitationResponse)
  async create(
    @Body() dto: CreateInvitationDto,
    @User() user: UserEntity,
  ): Promise<InvitationResponse> {
    return ResponseWrapper(
      InvitationResponse,
      await this.invitationsService.create(dto, user),
    );
  }

  @Get()
  @ApiOkArray(InvitationResponse)
  async findAll(): Promise<InvitationResponse[]> {
    return ArrayResponseWrapper(
      InvitationResponse,
      await this.invitationsService.findAll(),
    );
  }

  @Get(':id')
  @ApiOk(InvitationResponse)
  async findOne(@Param('id') id: number): Promise<InvitationResponse> {
    return ResponseWrapper(
      InvitationResponse,
      await this.invitationsService.findOne(id),
    );
  }

  @Put(':id/resend')
  @ApiOk(InvitationResponse)
  async resend(@Param('id') id: number): Promise<InvitationResponse> {
    return ResponseWrapper(
      InvitationResponse,
      await this.invitationsService.resend(+id),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: UserEntity): Promise<void> {
    return this.invitationsService.remove(id, user);
  }
}
