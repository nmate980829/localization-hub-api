import { Module } from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { BundlesController } from './bundles.controller';
import { Resolver } from './resolver';
import { PrismaModule } from 'src/utils/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BundlesController],
  providers: [
    BundlesService,
    {
      provide: 'ProjectResolver',
      useClass: Resolver,
    },
  ],
})
export class BundlesModule {}
