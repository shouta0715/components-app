import { Category } from "@prisma/client";

import { toResCategoriesByHome } from "@/domain/categories";
import { prisma } from "@/lib/client/prisma";

import { CategoriesByHome } from "@/types/prisma";

export const getCategories = async (
  take: number,
  skip = 0
): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    take,
    skip,
  });

  return result;
};

export const searchCategories = async (
  q: string | null,
  take: number,
  skip = 0
): Promise<Pick<Category, "name">[]> => {
  const result = await prisma.category.findMany({
    where: {
      name: {
        contains: q || "",
      },
    },
    orderBy: {
      components: {
        _count: "desc",
      },
    },
    select: {
      name: true,
    },
    take,
    skip,
  });

  return result;
};

export const getCategoriesByHome = async (
  take: number,
  skip = 0
): Promise<CategoriesByHome[]> => {
  const result = await prisma.category.findMany({
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
          previewImages: true,
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
  });

  return toResCategoriesByHome(result);
};
