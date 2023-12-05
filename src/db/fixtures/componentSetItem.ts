/* eslint-disable no-console */
import { componentSetItems } from "@/db/schema";
import { Tx } from "@/db/seed/client";
import {
  Component,
  ComponentSet,
  ComponentSetItem,
  InsertComponentSetItem,
} from "@/types/drizzle";
import { randomNum } from "@/utils/random";

function generateSeedComponentSetItems(
  c: ComponentSet[],
  cs: Component[]
): InsertComponentSetItem[] {
  const created = c.map((component, i) => {
    return Array.from({ length: randomNum(5, 10) }).map((_) => {
      return {
        componentSetId: component.id,
        componentId: cs[i].id,
      };
    });
  });

  return created.flat();
}

export async function seedComponentSetItems(
  tx: Tx,
  components: Component[],
  componentSets: ComponentSet[]
): Promise<ComponentSetItem[]> {
  const result = await tx.query.componentSetItems.findFirst();

  if (result) {
    console.log("ComponentSetItems already seeded");

    return tx.query.componentSetItems.findMany();
  }

  const values = generateSeedComponentSetItems(componentSets, components);

  await tx.insert(componentSetItems).values(values);

  return tx.query.componentSetItems.findMany();
}
