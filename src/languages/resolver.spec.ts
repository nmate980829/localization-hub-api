import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { Resolver } from './resolver';

describe('ProjectResolver', () => {
  let provider: Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Resolver, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    provider = module.get<Resolver>(Resolver);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
