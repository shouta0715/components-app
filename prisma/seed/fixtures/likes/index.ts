import {
  Component,
  ComponentLike,
  ComponentSet,
  ComponentSetLike,
  Prisma,
  User,
} from "@prisma/client";
import { randomNum } from "@/utils/random";

function generateComponentLikes({
  components,
  users,
}: {
  components: Component[];
  users: User[];
}): Prisma.ComponentLikeCreateManyInput[] {
  const created = components.map((component) => {
    return Array.from({ length: randomNum(20, 0) }, () => ({
      componentId: component.id,
      userId: users[randomNum(users.length - 1, 0)].id,
    }));
  });

  return created.flat();
}

function generateComponentSetLikes({
  componentSets,
  users,
}: {
  componentSets: ComponentSet[];
  users: User[];
}): Prisma.ComponentSetLikeCreateManyInput[] {
  const created = componentSets.map((componentSet) => {
    return Array.from({ length: randomNum(20, 0) }, () => ({
      componentSetId: componentSet.id,
      userId: users[randomNum(users.length - 1, 0)].id,
    }));
  });

  return created.flat();
}

export async function seedComponentLikes(
  tx: Prisma.TransactionClient,
  components: Component[],
  users: User[]
): Promise<ComponentLike[]> {
  const has = await tx.componentLike.findMany();

  if (has.length) {
    return has;
  }

  const created = generateComponentLikes({ components, users });

  await tx.componentLike.createMany({
    data: created,
  });

  return tx.componentLike.findMany();
}

export async function seedComponentSetLikes(
  tx: Prisma.TransactionClient,
  componentSets: ComponentSet[],
  users: User[]
): Promise<ComponentSetLike[]> {
  const has = await tx.componentSetLike.findMany();

  if (has.length) {
    return has;
  }

  const created = generateComponentSetLikes({ componentSets, users });

  await tx.componentSetLike.createMany({
    data: created,
  });

  return tx.componentSetLike.findMany();
}
