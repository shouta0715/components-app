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

export const getCommandPaletteCategories = async (take: number) => {
  return runPrisma(() =>
    prisma.category.findMany({
      select: {
        name: true,
        description: true,
        components: {
          take: 1,
          orderBy: {
            likes: {
              _count: "desc",
            },
          },
          select: {
            id: true,
            previewUrl: true,
            name: true,
            categoryName: true,
          },
        },
        _count: {
          select: {
            components: true,
          },
        },
      },
      take,
      orderBy: {
        components: {
          _count: "desc",
        },
      },
    })
  );
};

export type CommandPaletteCategory = Awaited<
  ReturnType<typeof getCommandPaletteCategories>
>[number];
