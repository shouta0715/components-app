import { Follow } from "@prisma/client";
import { prisma } from "@/lib/client/prisma";

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
  await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
}
