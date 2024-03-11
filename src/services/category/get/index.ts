import { Category } from "@prisma/client";

import { prisma, runPrisma } from "@/lib/client/prisma";

export const getCategories = async (
  take: number,
  skip = 0
): Promise<Category[]> => {
  const result = await runPrisma(() =>
    prisma.category.findMany({
      take,
      skip,
      orderBy: {
        components: {
          _count: "desc",
        },
      },
    })
  );

  return result;
};
