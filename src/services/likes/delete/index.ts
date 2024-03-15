import { prisma, runPrisma } from "@/lib/client/prisma";

export const deleteLike = async (componentId: string, userId: string) => {
  return runPrisma(() =>
    prisma.like.delete({
      where: { componentId_userId: { componentId, userId } },
      select: { id: true },
    })
  );
};
