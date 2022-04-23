import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Token, TOKEN_TYPE } from '@prisma/client';
import dayjs from 'dayjs';
import { TokenResponse } from './dto/token-response.dto';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

describe('TokensController', () => {
  let controller: TokensController;

  const testTokens: Token[] = [
    {
      id: 1,
      token: 'testtoken',
      refresh: null,
      expiration: dayjs().toDate(),
      name: null,
      type: TOKEN_TYPE.ACCESS,
      userId: 1,
      updatedAt: dayjs().toDate(),
      createdAt: dayjs().toDate(),
    },
    {
      id: 2,
      token: 'testtoken',
      refresh: null,
      expiration: dayjs().toDate(),
      name: null,
      type: TOKEN_TYPE.BEARER,
      userId: 1,
      updatedAt: dayjs().toDate(),
      createdAt: dayjs().toDate(),
    },
    {
      id: 3,
      token: 'testtoken',
      refresh: null,
      expiration: dayjs().toDate(),
      name: null,
      type: TOKEN_TYPE.ACCESS,
      userId: 2,
      updatedAt: dayjs().toDate(),
      createdAt: dayjs().toDate(),
    },
  ];
  const mockService = {
    findAll: jest.fn(() => testTokens),
    findOne: jest.fn(() => testTokens[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [TokensService],
    })
      .overrideProvider(TokensService)
      .useValue(mockService)
      .compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should return a list of token responses ', async () => {
    const tokens = await controller.findAll(-1);
    tokens.forEach((token) => expect(token).toBeInstanceOf(TokenResponse));
  });

  it('should return a token response', async () => {
    expect(await controller.findOne(-1, 1)).toBeInstanceOf(TokenResponse);
  });
});
