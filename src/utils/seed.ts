import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.right.upsert({
    where: {
      name: 'update-project',
    },
    update: {},
    create: {
      name: 'update-project',
      description: 'The right to update project data',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
