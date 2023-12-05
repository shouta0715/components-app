/* eslint-disable no-console */
import { createId } from "@paralleldrive/cuid2";
import { users } from "@/db/schema";
import { Tx } from "@/db/seed/client";
import { InsertUser, User } from "@/types/drizzle";
import { randomEmail, randomString } from "@/utils/random";

function generateSeedUsers(): InsertUser[] {
  return Array.from({ length: 10 }).map(() => {
    return {
      id: createId(),
      name: randomString(),
      email: randomEmail(),
    };
  });
}

export async function seedUser(tx: Tx): Promise<User[]> {
  const result = await tx.query.users.findMany();

  if (result.length > 1) {
    console.log("Users already seeded");

    return result;
  }

  const values = generateSeedUsers();

  await tx.insert(users).values(values);

  return tx.query.users.findMany();
}
