import { prisma, runPrisma } from "@/lib/client/prisma";

export const getComponentCount = async (): Promise<number> => {
  return runPrisma(() => prisma.component.count());
};

export const getMeComponentCount = async (userId: string): Promise<number> => {
  return runPrisma(() =>
    prisma.component.count({ where: { creatorId: userId } })
  );
};
