import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from 'src/entities/role';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { PO } from 'src/utils/authorization/serverRole.decorator';
import { UpdateRoleDto } from './dto/update-role.dto';
import { EmptyResponse } from 'src/types/response.dto';
import { ApiTags } from '@nestjs/swagger';

@PO()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCreated(Role)
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(dto);
  }

  @Get()
  @ApiOkArray(Role)
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOkArray(Role)
  findOne(@Param('id') id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOk(Role)
  update(@Param('id') id: number, @Body() dto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(@Param('id') id: number): Promise<void> {
    return this.rolesService.remove(+id);
  }
}
