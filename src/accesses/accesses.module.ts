import { Module } from '@nestjs/common';
import { AccessesService } from './accesses.service';
import { AccessesController } from './accesses.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { Resolver } from './resolver';

@Module({
  imports: [UtilsModule],
  controllers: [AccessesController],
  providers: [AccessesService, Resolver],
})
export class AccessesModule {}
