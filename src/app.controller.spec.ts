import { ImATeapotException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should throw im a teapot exception with the word pong!"', () => {
      expect(() => appController.getHello()).toThrow(ImATeapotException);
      expect(() => appController.getHello()).toThrow('pong');
    });
  });
});
