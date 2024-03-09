import { prisma } from "@/lib/client/prisma";
import { defineCategoryFactory } from "@/tests/fabbrica";

export const createOtherCategory = async () => {
  const category = await defineCategoryFactory({
    defaultData: { name: "other" },
  }).build();

  return prisma.category.createMany({
    data: category,
    skipDuplicates: true,
  });
};
