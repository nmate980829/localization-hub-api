import { Injectable } from '@nestjs/common';
import { Right } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class RightsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(): Promise<Right[]> {
    return this.prisma.right.findMany();
  }

  findOne(id: number): Promise<Right> {
    return this.prisma.right.findUnique({ where: { id } });
  }
}
