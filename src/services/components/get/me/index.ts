import { prisma, runPrisma } from "@/lib/client/prisma";

type GetMeComponentsProps = {
  userId: string;
};
export const getMeComponents = ({ userId }: GetMeComponentsProps) => {
  return runPrisma(() =>
    prisma.component.findMany({
      where: {
        creatorId: userId,
      },
      select: {
        id: true,
        name: true,
        previewUrl: true,
        draft: true,
        updatedAt: true,
        categoryName: true,
        description: true,
        files: {
          select: {
            extension: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  );
};
