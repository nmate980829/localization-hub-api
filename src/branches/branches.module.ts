import { Module } from '@nestjs/common';
import { BranchesService } from './service/branches.service';
import { BranchesController } from './controller/branches.controller';
import { Resolver } from './resolver/resolver';
import { PrismaModule } from 'src/utils/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BranchesController],
  providers: [
    BranchesService,
    {
      provide: 'ProjectResolver',
      useClass: Resolver,
    },
  ],
})
export class BranchesModule {}
