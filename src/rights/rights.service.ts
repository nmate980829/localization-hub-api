import { Injectable, NotFoundException } from '@nestjs/common';
import { Right } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { ListRightsDto } from './dto/list-rights.dto';

@Injectable()
export class RightsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(body: ListRightsDto): Promise<Right[]> {
    if (body.roleId === undefined) return this.prisma.right.findMany();
    return this.prisma.right.findMany({
      where: { roles: { some: { id: body.roleId } } },
    });
  }

  async findOne(id: number): Promise<Right> {
    const rights = await this.prisma.right.findUnique({ where: { id } });
    if (!rights) throw new NotFoundException();
    return rights;
  }
}
