import { Test, TestingModule } from '@nestjs/testing';
import { RightsGuard } from 'src/utils/authorization/rights.guard';
import { ProjectGuard } from 'src/utils/project/project.guard';
import { ProjectResolver } from 'src/utils/project/project.resolver';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

describe('TranslationsController', () => {
  let controller: TranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsController],
      providers: [TranslationsService, ProjectResolver],
    })
      .overrideProvider(TranslationsService)
      .useValue({})
      .overrideGuard(ProjectGuard)
      .useValue({})
      .overrideGuard(RightsGuard)
      .useValue({})
      .compile();

    controller = module.get<TranslationsController>(TranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
