import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { Resolver } from './resolver';
import { PrismaModule } from 'src/utils/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TranslationsController],
  providers: [
    TranslationsService,
    {
      provide: 'ProjectResolver',
      useClass: Resolver,
    },
  ],
})
export class TranslationsModule {}
