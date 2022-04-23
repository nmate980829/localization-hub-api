import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Token, TOKEN_TYPE } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let service: TokensService;

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
    token: {
      findMany: jest.fn(),
      findUnique: jest.fn((arg) => testTokens[arg.where.id - 1]),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensService, PrismaService, JwtService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockService)
      .overrideProvider(JwtService)
      .useValue({})
      .compile();

    service = module.get<TokensService>(TokensService);
  });

  describe('findAll', () => {
    it('should call prisma findmany', async () => {
      await service.findAll(-1);
      expect(mockService.token.findMany).toBeCalledWith({
        where: { userId: -1 },
      });
    });
  });

  describe('findOne', () => {
    it('should call prisma find unique', async () => {
      await service.findOne(1, 1);
      expect(mockService.token.findUnique).toBeCalledWith({ where: { id: 1 } });
    });

    it('should return token', async () => {
      const token = await service.findOne(1, 1);
      expect(token).toBe(testTokens[0]);
    });

    it('should throw not found exception', () => {
      expect(service.findOne(5, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw forbidden exception', () => {
      expect(service.findOne(3, 1)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('should call prisma find unique and remove', async () => {
      await service.remove(1, 1);
      expect(mockService.token.findUnique).toBeCalledWith({ where: { id: 1 } });
      expect(mockService.token.delete).toBeCalledWith({ where: { id: 1 } });
    });

    it('should return void', () => {
      expect(service.remove(1, 1)).resolves.toBeUndefined();
    });

    it('should throw not found exception', () => {
      expect(service.remove(5, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw forbidden exception', () => {
      expect(service.remove(3, 1)).rejects.toThrow(ForbiddenException);
    });
  });
});
