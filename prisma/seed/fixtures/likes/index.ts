import { Component, Like, Prisma, User } from "@prisma/client";
import { randomNum } from "@/utils/random";

function generateComponentLikes({
  components,
  users,
}: {
  components: Component[];
  users: User[];
}): Prisma.LikeCreateManyInput[] {
  const created = components.map((component) => {
    return Array.from({ length: randomNum(0, 20) }, () => ({
      componentId: component.id,
      userId: users[randomNum(0, users.length - 1)].id,
    }));
  });

  return created.flat();
}

export async function seedComponentLikes(
  tx: Prisma.TransactionClient,
  components: Component[],
  users: User[]
): Promise<Like[]> {
  const has = await tx.like.findMany();

  if (has.length) {
    return has;
  }

  const created = generateComponentLikes({ components, users });

  await tx.like.createMany({
    data: created,
  });

  return tx.like.findMany();
}
