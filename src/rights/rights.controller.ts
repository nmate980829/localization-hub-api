import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { RightsService } from './rights.service';
import { ApiOk, ApiOkArray } from 'src/utils/response-wrapper/wrap.decorator';
import { Right } from 'src/entities/right';
import { ApiTags } from '@nestjs/swagger';
import { ListRightsDto } from './dto/list-rights.dto';

@ApiTags('Rights')
@Controller('rights')
export class RightsController {
  constructor(private readonly rightsService: RightsService) {}

  @Get()
  @ApiOkArray(Right)
  findAll(@Query() body: ListRightsDto): Promise<Right[]> {
    return this.rightsService.findAll(body);
  }

  @Get(':id')
  @ApiOk(Right)
  findOne(@Param('id') id: number): Promise<Right> {
    return this.rightsService.findOne(id);
  }
}
