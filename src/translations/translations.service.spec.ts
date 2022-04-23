import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { TranslationsService } from './translations.service';

describe('TranslationsService', () => {
  let service: TranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    service = module.get<TranslationsService>(TranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
