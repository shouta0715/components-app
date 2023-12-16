import { Category } from "@prisma/client";
import { cache } from "react";

import { toResCategoriesByHome } from "@/domain/categories";
import { prisma } from "@/lib/client/prisma";
import { CategoriesByHome } from "@/types/prisma";

export const getCategories = cache(async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
});

export const getCategoriesByHome = cache(
  async (): Promise<CategoriesByHome[]> => {
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
    });

    return toResCategoriesByHome(result);
  }
);
