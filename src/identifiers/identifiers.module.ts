import { Module } from '@nestjs/common';
import { IdentifiersService } from './identifiers.service';
import { IdentifiersController } from './identifiers.controller';
import { Resolver } from './resolver';
import { PrismaModule } from 'src/utils/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IdentifiersController],
  providers: [
    IdentifiersService,
    {
      provide: 'ProjectResolver',
      useClass: Resolver,
    },
  ],
})
export class IdentifiersModule {}
