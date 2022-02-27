import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Rights } from 'src/utils/authorization/rights.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { Language } from 'src/entities/language';
import { ListLanguage } from './dto/list-language.dto';
import { EmptyResponse } from 'src/types/response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}
  @Rights('create-language')
  @Post()
  @ApiCreated(Language)
  create(@Body() dto: CreateLanguageDto): Promise<Language> {
    return this.languagesService.create(dto);
  }

  @Get()
  @ApiOkArray(Language)
  findAll(@Body() dto?: ListLanguage): Promise<Language[]> {
    return this.languagesService.findAll(dto);
  }

  @Get(':id')
  @ApiOk(Language)
  findOne(@Param('id') id: number): Promise<Language> {
    return this.languagesService.findOne(id);
  }

  @Rights('update-language')
  @Patch(':id')
  @ApiOk(Language)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateLanguageDto,
  ): Promise<Language> {
    return this.languagesService.update(id, dto);
  }
  @Rights('delete-language')
  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(@Param('id') id: number): Promise<void> {
    return this.languagesService.remove(id);
  }
}
