import { Controller, Get, Param } from '@nestjs/common';
import { RightsService } from './rights.service';
import { ApiOk, ApiOkArray } from 'src/utils/response-wrapper/wrap.decorator';
import { Right } from 'src/entities/right';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rights')
@Controller('rights')
export class RightsController {
  constructor(private readonly rightsService: RightsService) {}

  @Get()
  @ApiOkArray(Right)
  findAll(): Promise<Right[]> {
    return this.rightsService.findAll();
  }

  @Get(':id')
  @ApiOk(Right)
  findOne(@Param('id') id: number): Promise<Right> {
    return this.rightsService.findOne(id);
  }
}
