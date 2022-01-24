import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from './project.resolver';

describe('ProjectResolver', () => {
  let provider: ProjectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectResolver],
    }).compile();

    provider = module.get<ProjectResolver>(ProjectResolver);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
