import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Identifier, Translation } from '@prisma/client';
import { TreeIdentifierDto } from 'src/identifiers/dto/tree-identifier.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { ListTranslationDto } from './dto/list-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { IdentifierEntity } from './entities/translation.entity';

@Injectable()
export class TranslationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateTranslationDto,
    userId: number,
  ): Promise<Translation> {
    const { value, identifierId, languageId } = dto;
    const conflict = await this.prisma.translation.findFirst({
      where: {
        identifierId,
        languageId,
      },
    });
    if (conflict) throw new ConflictException();
    return await this.prisma.translation.create({
      data: {
        value,
        identifier: {
          connect: {
            id: identifierId,
          },
        },
        language: {
          connect: {
            id: languageId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll(dto: ListTranslationDto): Promise<Translation[]> {
    const { deleted, identifierId, languageId, userId, allVersions } = dto;
    if (allVersions === true)
      return await this.prisma.translation.findMany({
        where: {
          identifierId,
          languageId,
          userId,
          deleted: deleted ?? false,
        },
      });
    const indexes = await this.prisma.translation.groupBy({
      by: ['identifierId', 'languageId'],
      where: {
        identifierId,
        languageId,
        userId,
        deleted: deleted ?? false,
      },
      _max: {
        version: true,
      },
    });
    return await Promise.all(
      indexes.map((index) => {
        const { identifierId, languageId, _max } = index;
        const { version } = _max;
        return this.prisma.translation.findUnique({
          where: {
            identifierId_languageId_version: {
              identifierId,
              languageId,
              version,
            },
          },
        });
      }),
    );
  }

  async tree(dto: TreeIdentifierDto): Promise<IdentifierEntity[]> {
    const { projectId, branches } = dto;
    const roots = await this.prisma.identifier.findMany({
      where: { parentId: null, projectId, branch: { key: { in: branches } } },
    });
    return await Promise.all(
      roots.map((element) => this.fetchChildren(element, branches)),
    );
  }

  async fetchChildren(
    parent: Identifier,
    branches: string[],
  ): Promise<IdentifierEntity> {
    const { id } = parent;
    const children = await this.prisma.identifier.findMany({
      where: { parentId: id, branch: { key: { in: branches } } },
    });
    const result = parent as IdentifierEntity;
    if (children.length === 0) {
      const indexes = await this.prisma.translation.groupBy({
        by: ['identifierId', 'languageId'],
        where: {
          identifierId: result.id,
          deleted: false,
        },
        _max: {
          version: true,
        },
      });
      result.translations = await Promise.all(
        indexes.map((index) => {
          const { identifierId, languageId, _max } = index;
          const { version } = _max;
          return this.prisma.translation.findUnique({
            where: {
              identifierId_languageId_version: {
                identifierId,
                languageId,
                version,
              },
            },
            include: {
              language: true,
            },
          });
        }),
      );
      result.children = [];
      return result;
    }
    result.children = await Promise.all(
      children.map((child) => this.fetchChildren(child, branches)),
    );
    return result;
  }
  async findOne(id: number): Promise<Translation> {
    const found = await this.prisma.translation.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return found;
  }

  async update(
    id: number,
    dto: UpdateTranslationDto,
    userId: number,
  ): Promise<Translation> {
    const { value } = dto;
    const found = await this.prisma.translation.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    const { identifierId, languageId, version } = found;
    return await this.prisma.translation.create({
      data: {
        value,
        identifier: {
          connect: {
            id: identifierId,
          },
        },
        language: {
          connect: {
            id: languageId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
        version: version + 1,
      },
    });
  }

  async remove(id: number, moderator: boolean, userId: number): Promise<void> {
    const found = await this.prisma.translation.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    if (!moderator && found.userId !== userId) throw new ForbiddenException();
    // We have a unique constraint on @@unique([key, projectId, parentId]) you cannot create a new one if you use the deleted function. this is a temporary solution.
    await this.prisma.translation.delete({ where: { id: found.id } });
    /* await this.prisma.translation.update({
      where: { id },
      data: { deleted: true },
    }); */
  }
}
