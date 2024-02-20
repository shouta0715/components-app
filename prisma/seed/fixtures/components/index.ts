/* eslint-disable no-console */

import { Category, Component, Prisma, User } from "@prisma/client";
import { getMarkdownText } from "../lib/loadMarkdown";
import { uploadImage } from "../lib/uploadimage";
import { randomNum, randomString } from "@/utils/random";

async function generateSeedComponents(
  categories: Category[],
  users: User[]
): Promise<Prisma.ComponentCreateManyInput[]> {
  const created = await Promise.all(
    categories.map(async (category) => {
      const image = await uploadImage(category.name);

      return Array.from({ length: randomNum(1, 25) }).map((_, i) => {
        const data: Prisma.ComponentCreateManyInput = {
          name: `${category.name} Component ${i}`,
          categoryName: category.name,
          description: randomString(),
          draft: i % 10 === 0,
          creatorId: users[randomNum(0, users.length - 1)].id,
          document: getMarkdownText(),
          previewUrl: image.id,
        };

        return data;
      });
    })
  );

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

  const values = await generateSeedComponents(categories, users);

  await tx.component.createMany({ data: values });

  return tx.component.findMany();
}
