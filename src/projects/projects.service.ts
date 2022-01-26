import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Project, User } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { TransferProjectDto } from './dto/transfer-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto, user: User): Promise<Project> {
    const { name, description } = dto;
    const conflict = await this.prisma.project.findUnique({ where: { name } });
    if (conflict) throw new ConflictException();
    const project = await this.prisma.project.create({
      data: {
        name,
        description,
        owner: {
          connect: {
            id: user.id,
          },
        },
        branches: {
          create: {
            key: 'main',
          },
        },
      },
    });
    return project;
  }

  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  findOne(id: number): Promise<Project> {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const { name, description } = dto;
    const found = await this.prisma.project.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return await this.prisma.project.update({
      where: { id },
      data: { name, description },
    });
  }

  async transfer(id: number, dto: TransferProjectDto): Promise<Project> {
    const { ownerId } = dto;
    const found = await this.prisma.project.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return await this.prisma.project.update({
      where: { id },
      data: { ownerId },
    });
  }

  async remove(id: number): Promise<void> {
    const found = await this.prisma.project.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
