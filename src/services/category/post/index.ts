import { prisma } from "@/lib/client/prisma";
import { CategoryInput } from "@/lib/schema/server/category";

export const createCategory = async (input: CategoryInput) => {
  return prisma.category.create({
    data: input,
    select: { name: true },
  });
};
