import { Test, TestingModule } from '@nestjs/testing';
import { RightsGuard } from 'src/utils/authorization/rights.guard';
import { ProjectGuard } from 'src/utils/project/project.guard';
import { ProjectResolver } from 'src/utils/project/project.resolver';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

describe('LanguagesController', () => {
  let controller: LanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguagesController],
      providers: [LanguagesService],
    })
      .overrideProvider(LanguagesService)
      .useValue({})
      .overrideGuard(ProjectGuard)
      .useValue({})
      .overrideGuard(RightsGuard)
      .useValue({})
      .compile();

    controller = module.get<LanguagesController>(LanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
