import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { rights } from 'src/utils/init';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { RightsService } from './rights.service';

describe('RightsService', () => {
  let service: RightsService;

  const mockService = {
    right: {
      findMany: jest.fn(() => rights),
      findUnique: jest.fn((id) => rights[id]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RightsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockService)
      .compile();

    service = module.get<RightsService>(RightsService);
  });

  it('should return a list of rights', async () => {
    const rightsArr = await service.findAll({});
    rightsArr.forEach((right) =>
      expect(right).toMatchObject({
        name: expect.any(String),
        description: expect.any(String),
      }),
    );
  });

  it('should return a right', () => {
    expect(service.findOne(0)).resolves.toBe(rights[0]);
  });

  it('should throw not found exception', () => {
    expect(service.findOne(30)).rejects.toThrow(NotFoundException);
  });
});
