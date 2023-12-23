import { prisma } from "@/lib/client/prisma";

export async function getIsFollowing(
  followerId: string | undefined,
  followingId: string
): Promise<boolean> {
  if (!followerId) return false;

  const following = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  return !!following;
}
