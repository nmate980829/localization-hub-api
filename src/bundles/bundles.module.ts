import { Module } from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { BundlesController } from './bundles.controller';
import { Resolver } from './resolver';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [BundlesController],
  providers: [BundlesService, Resolver],
})
export class BundlesModule {}
