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
import { Branch } from 'src/entities/branch';
import { EmptyResponse } from 'src/types/response.dto';
import { Rights } from 'src/utils/authorization/rights.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { ListBranchDto } from './dto/list-branch.dto';
import { MergeBranchDto } from './dto/merge-branch.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Rights('create-branch')
  @Post()
  @ApiCreated(Branch)
  create(@Body() dto: CreateBranchDto): Promise<Branch> {
    return this.branchesService.create(dto);
  }

  @Rights('read')
  @Get()
  @ApiOkArray(Branch)
  findAll(@Query() dto: ListBranchDto): Promise<Branch[]> {
    return this.branchesService.findAll(dto);
  }

  @Rights('read')
  @Get(':id')
  @ApiOk(Branch)
  findOne(@Param('id') id: number): Promise<Branch> {
    return this.branchesService.findOne(id);
  }

  @Rights('merge')
  @Put(':id/merge')
  @ApiOk(Branch)
  merge(@Param('id') id: number, @Body() dto: MergeBranchDto): Promise<Branch> {
    return this.branchesService.merge(id, dto);
  }

  //delete is a dangerous operation because it can leave orphan keys. This right should not be given to a lot of people. If you can, please avoid it. Merge instead.
  @Rights('delete-branch')
  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(@Param('id') id: number): Promise<void> {
    return this.branchesService.remove(id);
  }
}
