import { prisma, runPrisma } from "@/lib/client/prisma";

export const getCategoriesWithComponentCount = async (
  take: number,
  skip = 0
) => {
  const result = await runPrisma(() =>
    prisma.category.findMany({
      take,
      skip,
      select: {
        name: true,
        description: true,
        _count: {
          select: {
            components: true,
          },
        },
      },
      orderBy: {
        components: {
          _count: "desc",
        },
      },
    })
  );

  return result;
};
