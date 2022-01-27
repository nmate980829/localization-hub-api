import { Module } from '@nestjs/common';
import { AccessesService } from './accesses.service';
import { AccessesController } from './accesses.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { Resolver } from './resolver';

@Module({
  imports: [UtilsModule],
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
