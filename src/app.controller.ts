import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Response } from './types/response.dto';

@ApiTags('App')
@ApiExtraModels(Response)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  getHello(): string {
    return this.appService.getHello();
  }
}
