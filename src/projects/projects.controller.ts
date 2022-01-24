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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PO } from 'src/utils/authorization/serverRole.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { Project } from 'src/entities/project';
import { User } from 'src/utils/user.decorator';
import { User as UserEntity } from '@prisma/client';
import { TransferProjectDto } from './dto/transfer-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @PO()
  @Post()
  @ApiCreated(Project)
  create(
    @Body() dto: CreateProjectDto,
    @User() user: UserEntity,
  ): Promise<Project> {
    return this.projectsService.create(dto, user);
  }

  @Get()
  @ApiOkArray(Project)
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOk(Project)
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @PO()
  @Patch(':id')
  @ApiOk(Project)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, dto);
  }

  // now it is limited to po-s, later we can limit this action to the owner of the project or admins
  @PO()
  @Put(':id/transfer')
  @ApiOk(Project)
  transfer(
    @Param('id') id: number,
    @Body() dto: TransferProjectDto,
  ): Promise<Project> {
    return this.projectsService.transfer(id, dto);
  }

  @PO()
  @Delete(':id')
  @ApiOk(undefined)
  remove(@Param('id') id: number): Promise<void> {
    return this.projectsService.remove(id);
  }
}
