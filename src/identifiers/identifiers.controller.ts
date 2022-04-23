import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IdentifiersService } from './identifiers.service';
import { CreateIdentifierDto } from './dto/create-identifier.dto';
import { UpdateIdentifierDto } from './dto/update-identifier.dto';
import { Rights } from 'src/utils/authorization/rights.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { Identifier } from 'src/entities/identifier';
import { ListIdentifierDto } from './dto/list-identifier.dto';
import { TreeIdentifierDto } from './dto/tree-identifier.dto';
import { User } from 'src/utils/user.decorator';
import { EmptyResponse } from 'src/types/response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Identifiers')
@Controller('identifiers')
export class IdentifiersController {
  constructor(private readonly identifiersService: IdentifiersService) {}

  @Rights('identifier')
  @Post()
  @ApiCreated(Identifier)
  create(
    @Body() dto: CreateIdentifierDto,
    @User('id') userId: number,
  ): Promise<Identifier> {
    return this.identifiersService.create(dto, userId);
  }

  @Rights('read')
  @Get()
  @ApiOkArray(Identifier)
  findAll(@Query() dto: ListIdentifierDto): Promise<Identifier[]> {
    return this.identifiersService.findAll(dto);
  }

  @Rights('read')
  @Get('/tree')
  @ApiOkArray(Identifier)
  tree(@Query() dto: TreeIdentifierDto): Promise<Identifier[]> {
    return this.identifiersService.tree(dto);
  }

  @Rights('read')
  @Get(':id')
  @ApiOk(Identifier)
  findOne(@Param('id') id: number): Promise<Identifier> {
    return this.identifiersService.findOne(id);
  }

  @Rights('identifier')
  @Patch(':id')
  @ApiOk(Identifier)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateIdentifierDto,
  ): Promise<Identifier> {
    return this.identifiersService.update(id, dto);
  }

  @Rights('identifier')
  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(@Param('id') id: number): Promise<void> {
    return this.identifiersService.remove(id);
  }
}
