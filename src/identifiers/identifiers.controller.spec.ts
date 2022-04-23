import { Test, TestingModule } from '@nestjs/testing';
import { RightsGuard } from 'src/utils/authorization/rights.guard';
import { ProjectGuard } from 'src/utils/project/project.guard';
import { IdentifiersController } from './identifiers.controller';
import { IdentifiersService } from './identifiers.service';

describe('IdentifiersController', () => {
  let controller: IdentifiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentifiersController],
      providers: [IdentifiersService],
    })
      .overrideProvider(IdentifiersService)
      .useValue({})
      .overrideGuard(ProjectGuard)
      .useValue({})
      .overrideGuard(RightsGuard)
      .useValue({})
      .compile();

    controller = module.get<IdentifiersController>(IdentifiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
