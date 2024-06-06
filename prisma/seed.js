const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import path from "path";
import { access } from 'fs';
import { mkdir } from 'fs/promises';

async function main() {
  const types = [
    { name: "Отчет" },
    { name: "Тезис" },
    { name: "Статья" },
    { name: "Монография" },
  ];

  for (const type of types) {
    await prisma.type_Publication.upsert({
      where: { name: type.name },
      update: {},
      create: type,
    });
  }
  access(path.join(process.cwd(), "public/uploads"), async function (err) {
    if (err && err.code === 'ENOENT') {
        console.log('Created uploads folder.')
        await mkdir(path.join(process.cwd(), "public/uploads"), { recursive: true })
    }
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
