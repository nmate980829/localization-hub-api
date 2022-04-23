import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { AccessesService } from './accesses.service';

describe('AccessesService', () => {
  let service: AccessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    service = module.get<AccessesService>(AccessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
