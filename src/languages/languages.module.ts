import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { Resolver } from './resolver';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [LanguagesController],
  providers: [LanguagesService, Resolver],
})
export class LanguagesModule {}
