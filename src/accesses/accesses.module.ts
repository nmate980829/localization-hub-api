import { Module } from '@nestjs/common';
import { AccessesService } from './accesses.service';
import { AccessesController } from './accesses.controller';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { Resolver } from './resolver';

@Module({
  imports: [PrismaModule],
  controllers: [AccessesController],
  providers: [
    AccessesService,
    {
      provide: 'ProjectResolver',
      useClass: Resolver,
    },
  ],
})
export class AccessesModule {}
