/* eslint-disable no-console */
import { dependencies } from "@/db/schema";
import { Tx } from "@/db/seed/client";
import { Code, InsertDependency } from "@/types/drizzle";
import { randomCommand, randomString } from "@/utils/random";

function generateSeedDependencies(codes: Code[]): InsertDependency[] {
  const created = codes.map((code) => {
    return Array.from({ length: 10 }).map(() => {
      return {
        name: randomString(),
        codeId: code.id,
        command: randomCommand(),
      };
    });
  });

  return created.flat();
}

export async function seedDependencies(
  tx: Tx,
  codes: Code[]
): Promise<InsertDependency[]> {
  const result = await tx.query.dependencies.findFirst();

  if (result) {
    console.log("Dependencies already seeded");

    return tx.query.dependencies.findMany();
  }

  const values = generateSeedDependencies(codes);

  await tx.insert(dependencies).values(values);

  return tx.query.dependencies.findMany();
}
