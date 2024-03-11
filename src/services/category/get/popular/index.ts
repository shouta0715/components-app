import { toResPopularCategories } from "@/domain/categories";
import { prisma, runPrisma } from "@/lib/client/prisma";

export const getPopularCategories = async (take: number, skip = 0) => {
  const result = await runPrisma(() =>
    prisma.category.findMany({
      orderBy: {
        components: {
          _count: "desc",
        },
      },
      include: {
        components: {
          take: 1,
          select: {
            id: true,
            previewUrl: true,
          },
          orderBy: {
            likes: {
              _count: "desc",
            },
          },
        },
        _count: {
          select: {
            components: true,
          },
        },
      },
      take,
      skip,
    })
  );

  return toResPopularCategories(result);
};
