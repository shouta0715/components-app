import { prisma, runPrisma } from "@/lib/client/prisma";

export const getComponentCreator = async (id: string) => {
  const component = await runPrisma(() =>
    prisma.component.findUnique({
      where: { id },
      select: { creatorId: true },
    })
  );

  return component?.creatorId;
};
