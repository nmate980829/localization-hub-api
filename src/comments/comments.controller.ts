import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { User as UserEntity } from '@prisma/client';
import { Comment } from 'src/entities/comment';
import { Rights } from 'src/utils/authorization/rights.decorator';
import { User } from 'src/utils/user.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ListCommentDto } from './dto/list-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // todo add option to reply threads
  @Rights('comment')
  @Post()
  @ApiCreated(Comment)
  create(
    @Body() dto: CreateCommentDto,
    @User() user: UserEntity,
  ): Promise<Comment> {
    return this.commentsService.create(dto, user);
  }

  @Rights('read')
  @Get()
  @ApiOkArray(Comment)
  findAll(@Body() dto: ListCommentDto): Promise<Comment[]> {
    return this.commentsService.findAll(dto);
  }

  @Rights('read')
  @Get(':id')
  @ApiOk(Comment)
  findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Rights('comment')
  @Put(':id/resolve')
  @ApiOk(Comment)
  resolve(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<Comment> {
    return this.commentsService.resolve(id, userId);
  }

  @Rights('comment')
  @Delete(':id')
  @ApiOk(undefined)
  remove(@Param('id') id: number, @User('id') userId: number): Promise<void> {
    return this.commentsService.remove(id, userId);
  }
}
