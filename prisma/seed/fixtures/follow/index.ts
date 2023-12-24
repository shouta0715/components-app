import { Follow, Prisma, User } from "@prisma/client";
import { randomNum } from "@/utils/random";

function generateSeedFollows(users: User[]): Prisma.FollowCreateManyInput[] {
  const created: Prisma.FollowCreateManyInput[][] = users.map((user) => {
    return Array.from({ length: randomNum(0, 5) }, (_, i) => ({
      followerId: user.id,
      followingId: users[i].id,
    }));
  });

  return created.flat();
}

export async function seedFollows(
  tx: Prisma.TransactionClient,
  users: User[]
): Promise<Follow[]> {
  const has = await tx.follow.findMany();

  if (has.length) {
    return has;
  }

  const created = generateSeedFollows(users);

  await tx.follow.createMany({
    data: created,
  });

  return tx.follow.findMany();
}
