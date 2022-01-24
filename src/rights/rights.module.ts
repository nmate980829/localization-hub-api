import { Module } from '@nestjs/common';
import { RightsService } from './rights.service';
import { RightsController } from './rights.controller';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [RightsController],
  providers: [RightsService],
})
export class RightsModule {}
