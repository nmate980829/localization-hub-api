import { ImATeapotException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new ImATeapotException('pong v2');
  }
}
