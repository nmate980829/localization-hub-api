import { Test, TestingModule } from '@nestjs/testing';
import { IdentifiersController } from './identifiers.controller';
import { IdentifiersService } from './identifiers.service';

describe('IdentifiersController', () => {
  let controller: IdentifiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentifiersController],
      providers: [IdentifiersService],
    }).compile();

    controller = module.get<IdentifiersController>(IdentifiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
