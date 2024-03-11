import { prisma, runPrisma } from "@/lib/client/prisma";

export async function getIsFollowing(
  followerId: string | undefined,
  followingId: string
): Promise<boolean> {
  if (!followerId) return false;

  const following = await runPrisma(() =>
    prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })
  );

  return !!following;
}
