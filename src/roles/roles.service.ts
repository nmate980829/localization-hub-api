import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    const { name, description, rights } = dto;
    const conflict = await this.prisma.role.findUnique({ where: { name } });
    if (conflict) throw new ConflictException();
    const rightsCount = await this.prisma.right.count({
      where: {
        id: {
          in: rights,
        },
      },
    });
    if (rightsCount !== rights.length) throw new NotFoundException();
    const rightEntities = rights.map((right) => ({ id: right }));
    return await this.prisma.role.create({
      data: {
        name,
        description,
        rights: {
          connect: rightEntities,
        },
      },
    });
  }

  findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException();
    return role;
  }

  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const { name, description, rights } = dto;

    const found = await this.prisma.role.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();

    if (name !== undefined) {
      const conflict = await this.prisma.role.findUnique({ where: { name } });
      if (conflict) throw new ConflictException();
    }

    if (rights !== undefined) {
      const rightsCount = await this.prisma.right.count({
        where: {
          id: {
            in: rights,
          },
        },
      });
      if (rightsCount !== rights.length) throw new NotFoundException();
    }

    const rightEntities = {
      connect: rights?.map((right) => ({ id: right })),
    };

    return await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        rights: rights !== undefined ? rightEntities : undefined,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const found = await this.prisma.role.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    await this.prisma.role.delete({ where: { id } });
  }
}
