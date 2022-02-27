import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { Resolver } from './resolver';
import { PrismaModule } from 'src/utils/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LanguagesController],
  providers: [
    LanguagesService,
    {
      provide: 'ProjectResolver',
      useClass: Resolver,
    },
  ],
})
export class LanguagesModule {}
