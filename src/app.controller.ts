import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Response } from './types/response.dto';

@ApiExtraModels(Response)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
