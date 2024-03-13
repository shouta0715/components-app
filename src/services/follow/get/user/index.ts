import { prisma, runPrisma } from "@/lib/client/prisma";

export const getFollowerCount = async (userId: string) => {
  const followerCount = await runPrisma(() =>
    prisma.follow.count({
      where: {
        followingId: userId,
      },
    })
  );

  return followerCount;
};
