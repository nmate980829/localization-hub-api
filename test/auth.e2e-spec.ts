import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Invite, PrismaClient, SERVER_ROLE, User } from '@prisma/client';
import dayjs from 'dayjs';
import { UserResponse } from 'src/users/dto/user-response.dto';
import { AccessTokenDto } from 'src/auth/dto/access-token.dto';
import { TokenDto } from 'src/auth/dto/token.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const token = 'tokentokentoken';
  let prisma: PrismaClient;
  let inv: Invite;
  let actoken: AccessTokenDto;
  let btoken: TokenDto;
  let user: User;

  beforeAll(async () => {
    prisma = new PrismaClient();
    inv = await prisma.invite.create({
      data: {
        email: 'testing123456@test.com',
        token,
        role: SERVER_ROLE.ADMIN,
        expiration: dayjs().add(30, 'days').toDate(),
      },
    });
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api/auth/register (GET)', async () => {
    const res = await request(app.getHttpServer()).get(
      `/api/auth/register/${token}`,
    );
    expect(res.body.id).toBe(inv.id);
  });

  it('/api/auth/register (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/auth/register/${token}`)
      .send({
        email: 'test19283465@test.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'Er',
      });
    actoken = res.body;
    expect(actoken).toMatchObject({
      access: expect.any(String),
      server: expect.any(String),
    });
  });

  it('/api/auth/claim (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/auth/claim/`)
      .send({ access: actoken.access });
    btoken = res.body;
    expect(btoken).toMatchObject({
      token: expect.any(String),
      refresh: expect.any(String),
      server: expect.any(String),
    });
  });

  it('/api/users/me (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/users/me`)
      .auth(btoken.token, { type: 'bearer' });
    user = res.body;
    expect(user).toMatchObject({
      id: expect.any(Number),
      email: 'test19283465@test.com',
      role: SERVER_ROLE.ADMIN,
      inviteId: inv.id,
    });
  });

  it('/api/users/me (PATCH)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/users/me`)
      .auth(btoken.token, { type: 'bearer' })
      .send({ firstName: 'E2e', lastName: 'Tester' });
    expect(res.body).toMatchObject({
      id: user.id,
      email: user.email,
      role: SERVER_ROLE.ADMIN,
      inviteId: inv.id,
      firstName: 'E2e',
      lastName: 'Tester',
    });
    user = res.body;
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.invite.delete({ where: { id: inv.id } });
  });
});
