import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();


  const john = await prisma.user.create({
    data: {
      email: 'john@test.com',
      password: '123456',
      name: 'John Doe',
    },
  });

  const alice = await prisma.user.create({
    data: {
      email: 'alice@test.com',
      password: '123456',
      name: 'Alice Doe',
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@test.com',
      password: '123456',
      name: 'Bob Doe',
    },
  });


  const john_invoices = Array.from({ length: 74 }).map(() => ({
    vendor_name: faker.company.name(),
    amount: parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 })),
    due_date: faker.date.soon({ days: 30 }),
    description: faker.lorem.sentence(),
    user_id: john.id,
    paid: faker.datatype.boolean(),
  }));

  await prisma.invoice.createMany({
    data: john_invoices,
  });

  console.log(`Seeded John with ${john_invoices.length} invoices.`);


  const alice_invoices = Array.from({ length: 24 }).map(() => ({
    vendor_name: faker.company.name(),
    amount: parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 })),
    due_date: faker.date.soon({ days: 30 }),
    description: faker.lorem.sentence(),
    user_id: alice.id,
    paid: faker.datatype.boolean(),
  }));

  await prisma.invoice.createMany({
    data: alice_invoices,
  });

  console.log(`Seeded Alice with ${alice_invoices.length} invoices.`);

  console.log(`Bob has no invoices to be seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });