const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const ping = await prisma.$queryRawUnsafe('SELECT 1 AS ok');
  const tables = await prisma.$queryRawUnsafe('SHOW TABLES');

  const counts = {
    users: await prisma.user.count(),
    garages: await prisma.garage.count(),
    vehicles: await prisma.vehicle.count(),
    jobs: await prisma.job.count(),
    invoices: await prisma.invoice.count(),
  };

  console.log('DB ping:', ping);
  console.log('Table count:', Array.isArray(tables) ? tables.length : 0);
  console.log('Core counts:', counts);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
