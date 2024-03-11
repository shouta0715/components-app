import { Follow } from "@prisma/client";
import { prisma, runPrisma } from "@/lib/client/prisma";

export async function createFollow(
  followerId: string,
  followingId: string
): Promise<Follow> {
  return prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
}

export async function deleteFollow(
  followerId: string,
  followingId: string
): Promise<void> {
  await runPrisma(() =>
    prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })
  );
}
