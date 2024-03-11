import { prisma, runPrisma } from "@/lib/client/prisma";

export const getCategoryByName = async (name: string) => {
  const result = await runPrisma(() =>
    prisma.category.findUnique({
      where: { name },
      include: {
        _count: {
          select: {
            components: { where: { draft: false } },
          },
        },
        components: {
          take: 1,
          where: { draft: false },
          select: {
            id: true,
            previewUrl: true,
            creator: {
              select: {
                name: true,
                image: true,
                id: true,
              },
            },
          },
          orderBy: {
            likes: {
              _count: "desc",
            },
          },
        },
      },
    })
  );

  if (!result) return null;

  const component = result.components.length ? result.components[0] : null;

  return {
    name: result.name,
    description: result.description,
    count: result._count.components,
    previewUrl: component?.previewUrl,
    componentId: component?.id,
    creator: component?.creator || null,
  };
};
