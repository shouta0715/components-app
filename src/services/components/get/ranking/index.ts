import { prisma, runPrisma } from "@/lib/client/prisma";

export const getRankingComponents = async (take: number) => {
  const components = await runPrisma(() =>
    prisma.component.findMany({
      where: {
        draft: false,
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
      take,
    })
  );

  return components;
};
