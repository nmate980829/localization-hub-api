import { Injectable, NotFoundException } from '@nestjs/common';
import { Access } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { ListAccessDto } from './dto/list-access.dto';

@Injectable()
export class AccessesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAccessDto): Promise<Access> {
    const { userId, projectId, roleId } = dto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });

    if (!user || !project || !role) throw new NotFoundException();

    return await this.prisma.access.create({
      data: {
        userId,
        projectId,
        roleId,
      },
    });
  }

  findAll(dto?: ListAccessDto): Promise<Access[]> {
    const { userId, projectId } = dto;
    return this.prisma.access.findMany({
      where: {
        userId,
        projectId,
      },
    });
  }

  async findOne(id: number): Promise<Access> {
    const access = await this.prisma.access.findUnique({ where: { id } });
    if (!access) throw new NotFoundException();
    return access;
  }

  async revoke(id: number): Promise<Access> {
    const access = await this.prisma.access.findUnique({ where: { id } });
    if (!access) throw new NotFoundException();
    return await this.prisma.access.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  }

  async regrant(id: number): Promise<Access> {
    const access = await this.prisma.access.findUnique({ where: { id } });
    if (!access) throw new NotFoundException();
    return await this.prisma.access.update({
      where: {
        id,
      },
      data: {
        revoked: false,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const access = await this.prisma.access.findUnique({ where: { id } });
    if (!access) throw new NotFoundException();
    await this.prisma.access.delete({
      where: {
        id,
      },
    });
  }
}
