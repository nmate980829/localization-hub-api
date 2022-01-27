import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { Resolver } from './resolver';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
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
