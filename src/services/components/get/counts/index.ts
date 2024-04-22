import { prisma, runPrisma } from "@/lib/client/prisma";

export const getComponentCount = async (): Promise<number> => {
  return runPrisma(() => prisma.component.count());
};

export const getLikesComponentCount = async (id: string): Promise<number> => {
  return runPrisma(() =>
    prisma.like.count({
      where: {
        userId: id,
      },
    })
  );
};
