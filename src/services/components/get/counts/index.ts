import { prisma, runPrisma } from "@/lib/client/prisma";

export const getComponentCount = async (): Promise<number> => {
  return runPrisma(() => prisma.component.count());
};
