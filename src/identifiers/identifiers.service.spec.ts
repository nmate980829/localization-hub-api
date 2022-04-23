import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { IdentifiersService } from './identifiers.service';

describe('IdentifiersService', () => {
  let service: IdentifiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentifiersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    service = module.get<IdentifiersService>(IdentifiersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
