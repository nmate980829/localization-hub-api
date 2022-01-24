import { Injectable, NotFoundException } from '@nestjs/common';
import { Language } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { ListLanguage } from './dto/list-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLanguageDto): Promise<Language> {
    const { key, description, projectId } = dto;
    return this.prisma.language.create({
      data: {
        key,
        description,
        projectId,
      },
    });
  }

  findAll(dto?: ListLanguage): Promise<Language[]> {
    const { projectId } = dto;
    return this.prisma.language.findMany(
      projectId ? { where: { projectId } } : undefined,
    );
  }

  findOne(id: number): Promise<Language> {
    return this.prisma.language.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateLanguageDto): Promise<Language> {
    const { key, description, deleted } = dto;
    const found = await this.prisma.language.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return await this.prisma.language.update({
      where: {
        id,
      },
      data: {
        key,
        description,
        deleted,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const found = await this.prisma.language.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    await this.prisma.language.delete({ where: { id } });
  }
}
