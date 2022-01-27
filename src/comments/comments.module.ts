import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Resolver } from './resolver';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: 'ProjectResolver',
      useClass: Resolver,
    },
  ],
})
export class CommentsModule {}
