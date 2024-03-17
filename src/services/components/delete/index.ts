import { prisma, runPrisma } from "@/lib/client/prisma";

export const deleteComponent = async (id: string) => {
  return runPrisma(() => prisma.component.delete({ where: { id } }));
};
