/* eslint-disable no-console */

import { Prisma, User } from "@prisma/client";

import { randomEmail, randomString } from "@/utils/random";

function generateSeedUsers(): Prisma.UserCreateManyInput[] {
  return Array.from({ length: 10 }).map(() => {
    return {
      name: randomString(),
      email: randomEmail(),
      image: "https://source.unsplash.com/random",
    };
  });
}

export async function seedUser(tx: Prisma.TransactionClient): Promise<User[]> {
  const result = await tx.user.findMany();

  if (result.length > 1) {
    console.log("Users already seeded");

    return result;
  }

  const values = generateSeedUsers();

  await tx.user.createMany({
    data: values,
  });

  return tx.user.findMany();
}
