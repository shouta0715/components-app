import { prisma, runPrisma } from "@/lib/client/prisma";

type GetLikesComponentsProps = {
  userId: string;
  take: number;
  skip: number;
};
export const getLikesComponents = ({
  userId,
  take,
  skip,
}: GetLikesComponentsProps) => {
  return runPrisma(() =>
    prisma.component.findMany({
      where: {
        draft: false,
        likes: {
          some: {
            userId,
          },
        },
      },
      take,
      skip,
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
        createdAt: "desc",
      },
    })
  );
};
