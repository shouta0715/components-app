/* eslint-disable no-console */
import { Prisma, PrismaClient } from "@prisma/client";
import { seedCategories } from "./fixtures/categories";
import { seedComponents } from "./fixtures/components";
import { seedComponentSets } from "./fixtures/componentSet";
import { seedFiles } from "./fixtures/files";
import { seedComponentLikes, seedComponentSetLikes } from "./fixtures/likes";
import { seedPreviewImages } from "./fixtures/preview";
import { seedReviews } from "./fixtures/reviews";
import { seedUser } from "./fixtures/users";

const prisma = new PrismaClient();

async function transaction(tx: Prisma.TransactionClient) {
  const users = await seedUser(tx);
  const categories = await seedCategories(tx);
  const components = await seedComponents(tx, categories, users);
  const componentSets = await seedComponentSets(tx, users);
  await seedFiles(tx, components);
  await seedPreviewImages(tx, components, categories);
  await seedComponentLikes(tx, components, users);
  await seedComponentSetLikes(tx, componentSets, users);
  await seedReviews(tx, components, componentSets, users);
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
