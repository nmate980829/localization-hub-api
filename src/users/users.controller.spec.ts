import { Test, TestingModule } from '@nestjs/testing';
import { SERVER_ROLE, User } from '@prisma/client';
import dayjs from 'dayjs';
import { UserResponse } from './dto/user-response.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const testUsers: User[] = [
    {
      id: 1,
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'Er',
      googleId: 'asdasd',
      password: '123456',
      role: SERVER_ROLE.USER,
      disabled: false,
      inviteId: 1,
      updatedAt: dayjs().toDate(),
      createdAt: dayjs().toDate(),
    },
    {
      id: 2,
      email: 'test2@test.com',
      firstName: 'Test',
      lastName: 'Er2',
      googleId: 'asdasd',
      password: '123456',
      role: SERVER_ROLE.PO,
      disabled: false,
      inviteId: 1,
      updatedAt: dayjs().toDate(),
      createdAt: dayjs().toDate(),
    },
    {
      id: 3,
      email: 'test3@test.com',
      firstName: 'Test',
      lastName: 'Er3',
      googleId: 'asdasd',
      password: '123456',
      role: SERVER_ROLE.ADMIN,
      disabled: false,
      inviteId: 1,
      updatedAt: dayjs().toDate(),
      createdAt: dayjs().toDate(),
    },
  ];

  const mockService = {
    findAll: jest.fn(() => testUsers),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should return a list of users ', async () => {
    const users = await controller.findAll();
    users.forEach((user) => expect(user).toBeInstanceOf(UserResponse));
  });
});
