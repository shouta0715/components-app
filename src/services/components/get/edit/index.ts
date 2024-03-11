import { prisma, runPrisma } from "@/lib/client/prisma";

export const getEditComponent = async (id: string) => {
  const component = await runPrisma(() =>
    prisma.component.findUnique({
      where: { id },
      include: {
        files: true,
        creator: {
          select: {
            id: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    })
  );

  return component;
};

export type EditComponent = Awaited<ReturnType<typeof getEditComponent>>;
