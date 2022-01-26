import { Module } from '@nestjs/common';
import { IdentifiersService } from './identifiers.service';
import { IdentifiersController } from './identifiers.controller';
import { Resolver } from './resolver';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [IdentifiersController],
  providers: [IdentifiersService, Resolver],
})
export class IdentifiersModule {}
