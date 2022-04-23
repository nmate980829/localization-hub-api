import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Access } from 'src/entities/access';
import { EmptyResponse } from 'src/types/response.dto';
import { Rights } from 'src/utils/authorization/rights.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { AccessesService } from '../service/accesses.service';
import { CreateAccessDto } from '../dto/create-access.dto';
import { ListAccessDto } from '../dto/list-access.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Access')
@Controller('accesses')
export class AccessesController {
  constructor(private readonly accessesService: AccessesService) {}

  @Rights('grant-access')
  @Post()
  @ApiCreated(Access)
  create(@Body() dto: CreateAccessDto): Promise<Access> {
    return this.accessesService.create(dto);
  }

  @Get()
  @ApiOkArray(Access)
  findAll(@Query() dto?: ListAccessDto): Promise<Access[]> {
    return this.accessesService.findAll(dto);
  }

  @Get(':id')
  @ApiOk(Access)
  findOne(@Param('id') id: number): Promise<Access> {
    return this.accessesService.findOne(id);
  }

  @Rights('revoke-access')
  @Put(':id/revoke')
  @ApiOk(Access)
  revoke(@Param('id') id: number): Promise<Access> {
    return this.accessesService.revoke(id);
  }

  @Rights('grant-access')
  @Put(':id/regrant')
  @ApiOk(Access)
  regrant(@Param('id') id: number): Promise<Access> {
    return this.accessesService.regrant(id);
  }

  @Rights('delete-access')
  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(@Param('id') id: number): Promise<void> {
    return this.accessesService.remove(id);
  }
}
