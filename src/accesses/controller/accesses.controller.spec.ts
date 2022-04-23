import { Test, TestingModule } from '@nestjs/testing';
import { AccessesController } from './accesses.controller';
import { AccessesService } from '../service/accesses.service';
import { ProjectGuard } from 'src/utils/project/project.guard';
import { RightsGuard } from 'src/utils/authorization/rights.guard';

describe('AccessesController', () => {
  let controller: AccessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessesController],
      providers: [AccessesService],
    })
      .overrideProvider(AccessesService)
      .useValue({})
      .overrideGuard(ProjectGuard)
      .useValue({})
      .overrideGuard(RightsGuard)
      .useValue({})
      .compile();

    controller = module.get<AccessesController>(AccessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
