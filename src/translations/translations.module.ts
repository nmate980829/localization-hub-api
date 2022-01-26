import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { Resolver } from './resolver';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [TranslationsController],
  providers: [TranslationsService, Resolver],
})
export class TranslationsModule {}
