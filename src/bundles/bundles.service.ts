import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Bundle } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { ListBundleDto } from './dto/list-bundle.dto';
import { UpdateBundleDto } from './dto/update-bundle.dto';

@Injectable()
export class BundlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBundleDto, userId: number): Promise<Bundle> {
    const { name, description, projectId, translations } = dto;
    return this.prisma.bundle.create({
      data: {
        name,
        description,
        project: {
          connect: {
            id: projectId,
          },
        },
        translations: {
          connect: translations.map((id) => ({ id })),
        },
        issuer: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(dto: ListBundleDto): Promise<Bundle[]> {
    const { projectId, issuerId, reviewerId, status } = dto;
    return this.prisma.bundle.findMany({
      where: {
        projectId,
        issuerId,
        reviewerId,
        status,
      },
    });
  }

  async findOne(id: number): Promise<Bundle> {
    const bundle = await this.prisma.bundle.findUnique({ where: { id } });
    if (!bundle) throw new NotFoundException();
    return bundle;
  }

  async update(
    id: number,
    dto: UpdateBundleDto,
    userId: number,
  ): Promise<Bundle> {
    const { name, description, translations } = dto;
    const bundle = await this.prisma.bundle.findUnique({ where: { id } });
    if (!bundle) throw new NotFoundException();
    if (bundle.issuerId !== userId) throw new ForbiddenException();
    return await this.prisma.bundle.update({
      where: { id },
      data: {
        name,
        description,
        translations: {
          set: translations.map((id) => ({ id })),
        },
      },
    });
  }

  async remove(id: number, moderator: boolean, userId: number): Promise<void> {
    const found = await this.prisma.bundle.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    if (found.issuerId !== userId && !moderator) throw new ForbiddenException();
    await this.prisma.bundle.delete({ where: { id } });
  }
}
