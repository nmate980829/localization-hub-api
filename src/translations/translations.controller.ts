import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { ListTranslationDto } from './dto/list-translation.dto';
import { Rights } from 'src/utils/authorization/rights.decorator';
import { Right } from 'src/utils/authorization/right.decorator';
import { User } from 'src/utils/user.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { Translation } from 'src/entities/translation';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { IdentifierEntity } from './entities/translation.entity';
import { TreeIdentifierDto } from 'src/identifiers/dto/tree-identifier.dto';
import { EmptyResponse } from 'src/types/response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Rights('translate')
  @Post()
  @ApiCreated(Translation)
  create(
    @Body() dto: CreateTranslationDto,
    @User('id') userId: number,
  ): Promise<Translation> {
    return this.translationsService.create(dto, userId);
  }

  @Rights('read')
  @Get()
  @ApiOkArray(Translation)
  findAll(@Body() dto: ListTranslationDto): Promise<Translation[]> {
    return this.translationsService.findAll(dto);
  }

  @Rights('read')
  @Get('/tree')
  @ApiOkArray(IdentifierEntity)
  tree(@Body() dto: TreeIdentifierDto): Promise<IdentifierEntity[]> {
    return this.translationsService.tree(dto);
  }

  @Rights('read')
  @Get(':id')
  @ApiOk(Translation)
  findOne(@Param('id') id: number): Promise<Translation> {
    return this.translationsService.findOne(id);
  }

  @Rights('translate')
  @Patch(':id')
  @ApiOk(Translation)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTranslationDto,
    @User('id') userId: number,
  ): Promise<Translation> {
    return this.translationsService.update(id, dto, userId);
  }

  @Rights('translate')
  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(
    @Param('id') id: number,
    @Right('translation-moderator') moderator: boolean,
    @User('id') userId: number,
  ): Promise<void> {
    return this.translationsService.remove(id, moderator, userId);
  }
}
