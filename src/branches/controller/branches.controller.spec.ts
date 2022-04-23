import { Test, TestingModule } from '@nestjs/testing';
import { BranchesController } from './branches.controller';
import { BranchesService } from '../service/branches.service';
import { ProjectGuard } from 'src/utils/project/project.guard';
import { RightsGuard } from 'src/utils/authorization/rights.guard';

describe('BranchesController', () => {
  let controller: BranchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchesController],
      providers: [BranchesService],
    })
      .overrideProvider(BranchesService)
      .useValue({})
      .overrideGuard(ProjectGuard)
      .useValue({})
      .overrideGuard(RightsGuard)
      .useValue({})
      .compile();

    controller = module.get<BranchesController>(BranchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
