import { PrismaClient, SERVER_ROLE } from '@prisma/client';
import crypto from 'crypto';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

export const rights = [
  {
    name: 'read',
    description: 'The right to update project data',
  },
  {
    name: 'grant-access',
    description: 'The right to update project data',
  },
  {
    name: 'revoke-access',
    description: 'The right to update project data',
  },
  {
    name: 'delete-access',
    description: 'The right to update project data',
  },
  {
    name: 'create-branch',
    description: 'The right to update project data',
  },
  {
    name: 'merge',
    description: 'The right to update project data',
  },
  {
    name: 'delete',
    description: 'The right to update project data',
  },
  {
    name: 'bundle',
    description: 'The right to update project data',
  },
  {
    name: 'bundle-moderator',
    description: 'The right to update project data',
  },
  {
    name: 'comment',
    description: 'The right to update project data',
  },
  {
    name: 'create-language',
    description: 'The right to update project data',
  },
  {
    name: 'update-language',
    description: 'The right to update project data',
  },
  {
    name: 'delete-language',
    description: 'The right to update project data',
  },
  {
    name: 'identifier',
    description: 'The right to update project data',
  },
  {
    name: 'review',
    description: 'The right to update project data',
  },
  {
    name: 'moderator',
    description: 'The right to update project data',
  },
  {
    name: 'translate',
    description: 'The right to update project data',
  },
  {
    name: 'translation-moderator',
    description: 'The right to update project data',
  },
];
export const roles = [
  {
    name: 'owner',
    description: 'The owner of the project',
    rights: ['read', 'grant-access', 'revoke-access'],
  },
];

export const Initialize = async () => {
  await Promise.all(
    rights.map((right) => {
      const { name, description } = right;
      return prisma.right.upsert({
        where: { name },
        update: {},
        create: { name, description },
      });
    }),
  );
  await Promise.all(
    roles.map((role) => {
      const { name, description, rights } = role;
      return prisma.role.upsert({
        where: { name },
        update: {},
        create: {
          name,
          description,
          rights: { connect: rights.map((right) => ({ name: right })) },
        },
      });
    }),
  );
  const invitenum = await prisma.invite.count();
  if (invitenum < 1) {
    const token = crypto.randomBytes(20).toString('hex');
    const invite = await prisma.invite.create({
      data: {
        email: `admin@test.com`,
        role: SERVER_ROLE.ADMIN,
        token,
        expiration: dayjs().add(30, 'days').toDate(),
      },
    });
    console.log(`Your initial admin invite: /register/${token}`);
  }
  await prisma.$disconnect();
};

Initialize();
