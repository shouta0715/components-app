import { prisma, runPrisma } from "@/lib/client/prisma";
import { CategoryInput } from "@/lib/schema/server/category";

export const createCategory = async (input: CategoryInput) => {
  return runPrisma(() =>
    prisma.category.create({
      data: input,
      select: { name: true },
    })
  );
};
