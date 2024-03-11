import { Extension } from "@prisma/client";
import { prisma, runPrisma } from "@/lib/client/prisma";

export const getCategoryComponentsByExtension = async (type: Extension) => {
  const components = await runPrisma(() =>
    prisma.component.findMany({
      where: {
        draft: false,
        files: {
          some: {
            extension: type,
          },
        },
      },
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
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: 6,
    })
  );

  return components;
};
