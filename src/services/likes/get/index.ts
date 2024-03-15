import { prisma, runPrisma } from "@/lib/client/prisma";

export const getIsLiked = async (componentId: string, userId?: string) => {
  if (!userId) return false;

  const like = await runPrisma(() =>
    prisma.like.findFirst({
      where: {
        componentId,
        userId,
      },
    })
  );

  return !!like;
};
