import { prisma, runPrisma } from "@/lib/client/prisma";

export const createLike = async (componentId: string, userId: string) => {
  return runPrisma(() =>
    prisma.like.create({ data: { componentId, userId }, select: { id: true } })
  );
};
