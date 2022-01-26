import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Identifier } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateIdentifierDto } from './dto/create-identifier.dto';
import { ListIdentifierDto } from './dto/list-identifier.dto';
import { TreeIdentifierDto } from './dto/tree-identifier.dto';
import { UpdateIdentifierDto } from './dto/update-identifier.dto';
import { IdentifierEntity } from './entities/identifier.entity';

@Injectable()
export class IdentifiersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateIdentifierDto, userId: number): Promise<Identifier> {
    const { key, projectId, branchId, parentId } = dto;
    const conflict = await this.prisma.identifier.findFirst({
      where: {
        key,
        projectId,
        parentId,
      },
    });
    if (conflict) throw new ConflictException();
    return await this.prisma.identifier.create({
      data: {
        key,
        author: { connect: { id: userId } },
        project: { connect: { id: projectId } },
        branch: { connect: { id: branchId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
    });
  }

  findAll(dto: ListIdentifierDto): Promise<Identifier[]> {
    const { projectId, parentId, branches } = dto;
    return this.prisma.identifier.findMany({
      where: {
        projectId,
        parentId,
        branchId: {
          in: branches,
        },
      },
    });
  }

  async tree(dto: TreeIdentifierDto): Promise<IdentifierEntity[]> {
    const { projectId, branches } = dto;
    const roots = await this.prisma.identifier.findMany({
      where: { parentId: null, projectId, branchId: { in: branches } },
    });
    return await Promise.all(
      roots.map((element) => this.fetchChildren(element, branches)),
    );
  }

  async fetchChildren(
    parent: Identifier,
    branches: number[],
  ): Promise<IdentifierEntity> {
    const { parentId } = parent;
    const children = await this.prisma.identifier.findMany({
      where: { parentId, branchId: { in: branches } },
    });
    const result = parent as IdentifierEntity;
    if (children.length === 0) {
      result.children = [];
      return result;
    }
    result.children = await Promise.all(
      children.map((child) => this.fetchChildren(child, branches)),
    );
  }

  async findOne(id: number): Promise<Identifier> {
    const found = await this.prisma.identifier.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return found;
  }

  async update(id: number, dto: UpdateIdentifierDto): Promise<Identifier> {
    const { key, branchId } = dto;
    const found = await this.prisma.identifier.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return await this.prisma.identifier.update({
      where: {
        id,
      },
      data: {
        key,
        branchId,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const found = await this.prisma.identifier.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    await this.prisma.identifier.delete({ where: { id } });
  }
}
