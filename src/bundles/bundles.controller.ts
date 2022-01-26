import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Bundle } from 'src/entities/bundle';
import { Right } from 'src/utils/authorization/right.decorator';
import { Rights } from 'src/utils/authorization/rights.decorator';
import { ApiCreated, ApiOk, ApiOkArray } from 'src/utils/response-wrapper/wrap.decorator';
import { User } from 'src/utils/user.decorator';
import { BundlesService } from './bundles.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { ListBundleDto } from './dto/list-bundle.dto';
import { UpdateBundleDto } from './dto/update-bundle.dto';

@Controller('bundles')
export class BundlesController {
  constructor(private readonly bundlesService: BundlesService) {}

  @Rights('bundle')
  @Post()
  @ApiCreated(Bundle)
  create(
    @Body() createBundleDto: CreateBundleDto,
    @User('id') userId: number,
  ): Promise<Bundle> {
    return this.bundlesService.create(createBundleDto, userId);
  }

  @Rights('read')
  @Get()
  @ApiOkArray(Bundle)
  findAll(dto: ListBundleDto): Promise<Bundle[]> {
    return this.bundlesService.findAll(dto);
  }

  @Rights('read')
  @Get(':id')
  @ApiOk(Bundle)
  findOne(@Param('id') id: number): Promise<Bundle> {
    return this.bundlesService.findOne(id);
  }

  @Rights('bundle')
  @Patch(':id')
  @ApiOk(Bundle)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateBundleDto,
    @User('id') userId: number,
  ): Promise<Bundle> {
    return this.bundlesService.update(id, dto, userId);
  }

  @Rights('bundle')
  @Delete(':id')
  @ApiOk(undefined)
  remove(
    @Param('id') id: number,
    @Right('bundle-moderator') moderator: boolean,
    @User('id') userId: number,
  ): Promise<void> {
    return this.bundlesService.remove(id, moderator, userId);
  }
}
