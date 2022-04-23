import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockService = {
    user: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockService)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should call findall', async () => {
    await service.findAll();
    expect(mockService.user.findMany).toBeCalledWith({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  });
});
