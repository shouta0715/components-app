import { prisma, runPrisma } from "@/lib/client/prisma";

export const getPreviewComponent = async (id: string) => {
  const component = await runPrisma(() =>
    prisma.component.findUnique({
      where: { id },
      include: {
        files: true,
        creator: {
          select: {
            name: true,
            image: true,
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

export type PreviewComponent = Awaited<ReturnType<typeof getPreviewComponent>>;
