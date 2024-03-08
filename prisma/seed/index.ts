/* eslint-disable no-console */
import { Prisma, PrismaClient } from "@prisma/client";
import { seedCategories } from "./fixtures/categories";
import { seedComponents } from "./fixtures/components";
import { seedFiles } from "./fixtures/files";
import { seedFollows } from "./fixtures/follow";
import { seedComponentLikes } from "./fixtures/likes";

import { seedUser } from "./fixtures/users";

const prisma = new PrismaClient();

async function transaction(tx: Prisma.TransactionClient) {
  const users = await seedUser(tx);
  const categories = await seedCategories(tx);
  const components = await seedComponents(tx, categories, users);
  await seedFiles(tx, components);
  await seedComponentLikes(tx, components, users);
  await seedFollows(tx, users);
}

async function main() {
  await prisma.$transaction(async (tx) => {
    await transaction(tx);
  });
}

main()
  .then(() => {
    console.log("Seeding complete.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
