/* eslint-disable no-console */

import { Category, Component, Prisma, User } from "@prisma/client";
import { randomNum, randomString } from "@/utils/random";

function generateSeedComponents(
  categories: Category[],
  users: User[]
): Prisma.ComponentCreateManyInput[] {
  const created = categories.map((category) => {
    return Array.from({ length: randomNum(1, 50) }).map((_, i) => {
      const data: Prisma.ComponentCreateManyInput = {
        name: `${category.name} Component ${i}`,
        categoryId: category.id,
        draft: i % 10 === 0,
        creatorId: users[randomNum(0, users.length - 1)].id,
        document: randomString(),
        previewUrl: randomString(),
      };

      return data;
    });
  });

  return created.flat();
}

export async function seedComponents(
  tx: Prisma.TransactionClient,
  categories: Category[],
  users: User[]
): Promise<Component[]> {
  const result = await tx.component.findFirst();

  if (result) {
    console.log("Components already seeded");

    return tx.component.findMany();
  }

  const values = generateSeedComponents(categories, users);

  await tx.component.createMany({ data: values });

  return tx.component.findMany();
}
