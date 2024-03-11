import { prisma, runPrisma } from "@/lib/client/prisma";

export const searchCategories = async (
  q: string | null,
  take: number,
  skip = 0
) => {
  const result = await runPrisma(() =>
    prisma.category.findMany({
      where: {
        name: {
          contains: q || "",
        },
      },
      select: {
        name: true,
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
      take,
      skip,
    })
  );

  return result;
};

export type SearchCategory = Awaited<
  ReturnType<typeof searchCategories>
>[number];
