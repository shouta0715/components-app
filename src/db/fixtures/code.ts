/* eslint-disable no-console */
import { createId } from "@paralleldrive/cuid2";
import { codes } from "@/db/schema";
import { Tx } from "@/db/seed/client";
import { Code, Component, InsertCode } from "@/types/drizzle";
import { randomCodeType, randomString } from "@/utils/random";

function generateSeedCode(components: Component[]): InsertCode[] {
  const created = components.map((component) => {
    return {
      id: createId(),
      componentId: component.id,
      url: randomString(),
      type: randomCodeType(),
    };
  });

  return created.flat();
}

export async function seedCodes(
  tx: Tx,
  components: Component[]
): Promise<Code[]> {
  const result = await tx.query.codes.findFirst();

  if (result) {
    console.log("Code already seeded");

    return tx.query.codes.findMany();
  }

  const values = generateSeedCode(components);

  await tx.insert(codes).values(values);

  return tx.query.codes.findMany();
}
