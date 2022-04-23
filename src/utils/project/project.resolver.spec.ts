import { NotImplementedException } from '@nestjs/common';
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

  it('should not be implemented', () => {
    expect(() => provider.resolve(1)).toThrow(NotImplementedException);
  });
});
