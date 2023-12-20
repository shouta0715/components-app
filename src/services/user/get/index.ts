import { prisma } from "@/lib/client/prisma";

export const getUserCount = async (): Promise<number> => {
  return prisma.user.count();
};
