const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const garages = await prisma.garage.findMany({
    where: {
      isPublic: true,
      name: { not: '' },
    },
    orderBy: { createdAt: 'desc' },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  });

  console.log(`Found ${garages.length} garages`);

  for (const garage of garages) {
    if (!garage.slug && garage.name) {
      const normalized = garage.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      let candidate = normalized || 'garage';
      let counter = 2;

      while (true) {
        const existing = await prisma.garage.findFirst({
          where: {
            slug: candidate,
            NOT: { id: garage.id },
          },
          select: { id: true },
        });

        if (!existing) break;
        candidate = `${normalized}-${counter}`;
        counter += 1;
      }

      await prisma.garage.update({
        where: { id: garage.id },
        data: { slug: candidate },
      });

      console.log(`Updated slug for ${garage.id} => ${candidate}`);
    }
  }
}

main()
  .catch((error) => {
    console.error('Script error:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
