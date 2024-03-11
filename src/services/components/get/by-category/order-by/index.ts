import { Prisma } from "@prisma/client";
import { prisma, runPrisma } from "@/lib/client/prisma";

type GetComponentsByCategory = {
  name: string;
  take: number;
  skip: number;
  order: "popular" | "new";
};

const getOrderBy = (
  order: "popular" | "new"
): Prisma.ComponentOrderByWithRelationInput => {
  if (order === "popular") {
    return {
      likes: {
        _count: "desc",
      },
    };
  }

  return {
    createdAt: "desc",
  };
};

export const getCategoryComponents = async ({
  name,
  take,
  skip,
  order,
}: GetComponentsByCategory) => {
  const orderBy = getOrderBy(order);

  const components = await runPrisma(() =>
    prisma.component.findMany({
      where: { categoryName: name, draft: false },
      select: {
        id: true,
        name: true,
        previewUrl: true,
        createdAt: true,
        files: {
          select: {
            extension: true,
          },
        },
        creator: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      take,
      skip,
      orderBy,
    })
  );

  return components;
};

export type CategoryComponent = Awaited<
  ReturnType<typeof getCategoryComponents>
>;
