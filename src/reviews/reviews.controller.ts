import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Rights } from 'src/utils/authorization/rights.decorator';
import {
  ApiCreated,
  ApiOk,
  ApiOkArray,
} from 'src/utils/response-wrapper/wrap.decorator';
import { Review } from 'src/entities/review';
import { User } from 'src/utils/user.decorator';
import { ListReviewDto } from './dto/list-review.dto';
import { Right } from 'src/utils/authorization/right.decorator';
import { EmptyResponse } from 'src/types/response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Rights('review')
  @Post()
  @ApiCreated(Review)
  create(
    @Body() dto: CreateReviewDto,
    @User('id') userId: number,
  ): Promise<Review> {
    return this.reviewsService.create(dto, userId);
  }

  @Rights('read')
  @Get()
  @ApiOkArray(Review)
  findAll(@Body() dto: ListReviewDto): Promise<Review[]> {
    return this.reviewsService.findAll(dto);
  }

  @Rights('read')
  @Get(':id')
  @ApiOk(Review)
  findOne(@Param('id') id: number): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Rights()
  @Delete(':id')
  @ApiOk(EmptyResponse)
  remove(
    @Param('id') id: number,
    @User('id') userId: number,
    @Right('moderator') moderator: boolean,
  ): Promise<void> {
    return this.reviewsService.remove(id, userId, moderator);
  }
}
