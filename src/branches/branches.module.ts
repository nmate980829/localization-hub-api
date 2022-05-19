import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { Resolver } from './resolver';
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
