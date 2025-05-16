import { PrismaClient } from '../generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();


  const john = await prisma.user.create({
    data: {
      email:    'john@test.com',
      password: '123456',
      name:     'John Doe',
    },
  });

  const alice = await prisma.user.create({
    data: {
      email:    'alice@test.com',
      password: '123456',
      name:     'Alice Doe',
    },
  });


  const john_invoices = Array.from({ length: 100 }).map(() => ({
    vendor_name:    faker.company.name(),
    amount:         parseFloat(faker.finance.amount({min: 100, max: 1000, dec: 2})),
    due_date:       faker.date.soon({ days: 30 }),
    description:    faker.lorem.sentence(),
    user_id:        john.id,
    paid:           faker.datatype.boolean(),
  }));

  await prisma.invoice.createMany({
    data: john_invoices,
  });

  console.log(`Seeded John with ${john_invoices.length} invoices.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });