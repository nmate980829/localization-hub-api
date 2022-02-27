import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { initRights } from './rights';
import { initRoles } from './roles';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.initialize();
  }

  async initialize() {
    await Promise.all(
      initRights.map((right) => {
        const { name, description } = right;
        return this.right.upsert({
          where: { name },
          update: {},
          create: { name, description },
        });
      }),
    );
    await Promise.all(
      initRoles.map((role) => {
        const { name, description, rights } = role;
        return this.role.upsert({
          where: { name },
          update: {},
          create: {
            name,
            description,
            rights: { connect: rights.map((right) => ({ name: right })) },
          },
        });
      }),
    );
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
