import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { InvitationsService } from './invitations.service';

describe('InvitationsService', () => {
  let service: InvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    service = module.get<InvitationsService>(InvitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
