import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Branch } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { ListBranchDto } from './dto/list-branch.dto';
import { MergeBranchDto } from './dto/merge-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBranchDto): Promise<Branch> {
    const { key, projectId } = dto;
    const conflict = await this.prisma.branch.findUnique({ where: { key } });
    if (conflict && conflict.projectId === projectId)
      throw new ConflictException();
    return await this.prisma.branch.create({
      data: {
        key,
        projectId,
      },
    });
  }

  findAll(dto: ListBranchDto): Promise<Branch[]> {
    const { projectId } = dto;
    return this.prisma.branch.findMany({ where: { projectId } });
  }

  async findOne(id: number): Promise<Branch> {
    const found = await this.prisma.branch.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return found;
  }

  async merge(id: number, dto: MergeBranchDto): Promise<Branch> {
    const { branchId } = dto;
    const found = await this.prisma.branch.findUnique({
      where: { id },
      include: { identifiers: true },
    });
    if (!found) throw new NotFoundException();
    const target = await this.prisma.branch.findUnique({
      where: { id: branchId },
    });
    if (!target) throw new NotFoundException();
    const upTarget = await this.prisma.branch.update({
      where: {
        id: target.id,
      },
      data: {
        identifiers: {
          connect: found.identifiers.map((element) => ({ id: element.id })),
        },
      },
    });
    await this.prisma.branch.delete({ where: { id } });
    return upTarget;
  }

  async remove(id: number): Promise<void> {
    const found = await this.prisma.branch.findUnique({
      where: { id },
      include: { identifiers: true },
    });
    if (!found) throw new NotFoundException();
    await this.prisma.branch.delete({ where: { id } });
  }
}
