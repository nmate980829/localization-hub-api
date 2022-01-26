import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { UpdateBundleDto } from './dto/update-bundle.dto';

@Injectable()
export class BundlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBundleDto: CreateBundleDto) {
    return 'This action adds a new bundle';
  }

  findAll() {
    return `This action returns all bundles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bundle`;
  }

  update(id: number, updateBundleDto: UpdateBundleDto) {
    return `This action updates a #${id} bundle`;
  }

  async remove(id: number, moderator: boolean, userId: number): Promise<void> {
    const found = await this.prisma.bundle.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    if (found.issuerId !== userId && !moderator) throw new ForbiddenException();
    await this.prisma.bundle.delete({ where: { id } });
  }
}
