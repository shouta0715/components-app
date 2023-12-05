/* eslint-disable no-console */
import { createId } from "@paralleldrive/cuid2";
import { componentSets, components } from "@/db/schema";
import { Tx } from "@/db/seed/client";
import {
  Category,
  Component,
  ComponentSet,
  InsertComponent,
  InsertComponentSet,
  User,
} from "@/types/drizzle";
import { randomNum } from "@/utils/random";

function generateSeedComponents(
  categories: Category[],
  users: User[]
): InsertComponent[] {
  const created = categories.map((category) => {
    return Array.from({ length: randomNum(5, 10) }).map((_, i) => {
      return {
        id: createId(),
        name: `${category.name} Component ${i}`,
        description: `This is a ${category.name} component`,
        categoryId: category.id,
        creatorId: users[randomNum(0, users.length - 1)].id,
        free: i % 2 === 0,
        price: i % 2 === 0 ? 0 : randomNum(100, 1000),
      };
    });
  });

  return created.flat();
}

function generateSeedComponentSets(users: User[]): InsertComponentSet[] {
  const created = users.map((user) => {
    return Array.from({ length: randomNum(5, 10) }).map((_, i) => {
      return {
        id: createId(),
        name: `${user.name} Component Set ${i}`,
        creatorId: user.id,
        description: `This is a component set create by ${user.name} ${i}`,
        price: i % 2 === 0 ? 0 : randomNum(100, 1000),
      };
    });
  });

  return created.flat();
}

export async function seedComponents(
  tx: Tx,
  categories: Category[],
  users: User[]
): Promise<Component[]> {
  const result = await tx.query.components.findFirst();

  if (result) {
    console.log("Components already seeded");

    return tx.query.components.findMany();
  }

  const values = generateSeedComponents(categories, users);

  await tx.insert(components).values(values);

  return tx.query.components.findMany();
}

export async function seedComponentsSets(
  tx: Tx,
  users: User[]
): Promise<ComponentSet[]> {
  const result = await tx.query.componentSets.findFirst();

  if (result) {
    console.log("Components already seeded");

    return tx.query.componentSets.findMany();
  }

  const values = generateSeedComponentSets(users);

  await tx.insert(componentSets).values(values);

  return tx.query.componentSets.findMany();
}
