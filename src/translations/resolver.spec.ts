import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { Resolver } from './resolver';

describe('Resolver', () => {
  let provider: Resolver;

  const mockService = {
    translation: {
      findUnique: jest.fn(() => undefined),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Resolver, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockService)
      .compile();

    provider = module.get<Resolver>(Resolver);
  });

  it('should throw not found exception if prisma returns undefined', () => {
    expect(provider.resolve(-1)).rejects.toThrow(NotFoundException);
  });
});
