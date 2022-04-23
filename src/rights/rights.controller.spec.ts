import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { rights } from 'src/utils/init';
import { RightsController } from './rights.controller';
import { RightsService } from './rights.service';

describe('RightsController', () => {
  let controller: RightsController;

  const mockService = {
    findAll: jest.fn(() => rights),
    findOne: jest.fn(async (id) => rights[id]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RightsController],
      providers: [RightsService],
    })
      .overrideProvider(RightsService)
      .useValue(mockService)
      .compile();

    controller = module.get<RightsController>(RightsController);
  });

  it('should return a list of rights', async () => {
    const rightsArr = await controller.findAll({});
    rightsArr.forEach((right) =>
      expect(right).toMatchObject({
        name: expect.any(String),
        description: expect.any(String),
      }),
    );
  });

  it('should return a right', () => {
    expect(controller.findOne(0)).resolves.toBe(rights[0]);
  });
});
