/* eslint-disable no-console */
import { purchases } from "@/db/schema";
import { Tx } from "@/db/seed/client";
import {
  Component,
  ComponentSet,
  InsertPurchase,
  Purchase,
  User,
} from "@/types/drizzle";
import { randomNum } from "@/utils/random";

function generateSeedPurchases(
  components: Component[],
  componentsSets: ComponentSet[],
  users: User[]
): InsertPurchase[] {
  const created = users.map((user) => {
    return Array.from({ length: randomNum(5, 10) }).map((_, i) => {
      return {
        userId: user.id,
        componentId:
          i % 2 === 0
            ? components[randomNum(0, components.length - 1)].id
            : null,
        componentSetId:
          i % 2 === 0
            ? null
            : componentsSets[randomNum(0, componentsSets.length - 1)].id,

        amount: randomNum(100, 1000),
      };
    });
  });

  return created.flat();
}

export async function seedPurchases(
  tx: Tx,
  components: Component[],
  componentSets: ComponentSet[],
  users: User[]
): Promise<Purchase[]> {
  const result = await tx.query.purchases.findFirst();

  if (result) {
    console.log("Purchases already seeded");

    return tx.query.purchases.findMany();
  }

  const values = generateSeedPurchases(components, componentSets, users);

  await tx.insert(purchases).values(values);

  return tx.query.purchases.findMany();
}
