/* eslint-disable no-console */
import { ComponentSet, Prisma, User } from "@prisma/client";
import { uploadImage } from "../lib/uploadimage";
import { randomNum, randomString } from "@/utils/random";

async function generateSeedComponentSets(
  users: User[]
): Promise<Prisma.ComponentSetCreateManyInput[]> {
  const image = await uploadImage();

  const created = users.map((user) => {
    return Array.from({
      length: randomNum(100, 0),
    }).map((_, i) => {
      return {
        name: `${user.name} Component Set ${i}`,
        creatorId: user.id,
        draft: i % 2 === 0,
        document: randomString(),
        previewImageUrl: image.id,
      };
    });
  });

  return created.flat();
}

export async function seedComponentSets(
  tx: Prisma.TransactionClient,
  users: User[]
): Promise<ComponentSet[]> {
  const result = await tx.componentSet.findFirst();

  if (result) {
    console.log("Components already seeded");

    return tx.componentSet.findMany();
  }

  const values = await generateSeedComponentSets(users);

  await tx.componentSet.createMany({ data: values });

  return tx.componentSet.findMany();
}
