import { prisma, runPrisma } from "@/lib/client/prisma";

export const getUserCount = async (): Promise<number> => {
  return runPrisma(() => prisma.user.count());
};
