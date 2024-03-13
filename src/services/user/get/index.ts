import { prisma, runPrisma } from "@/lib/client/prisma";
import { getFollowerCount } from "@/services/follow/get/user";
import { getLikesCountsByUser } from "@/services/likes/get/count/user";

export const getUserPageData = async (userId: string) => {
  const user = await runPrisma(() =>
    prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        _count: {
          select: {
            components: true,
          },
        },
        components: {
          where: {
            draft: false,
          },
          select: {
            id: true,
            previewUrl: true,
            name: true,
            createdAt: true,
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
          take: 50,
          orderBy: {
            createdAt: "desc",
          },
        },
        profile: {
          select: {
            website: true,
            github: true,
            twitter: true,
          },
        },
      },
    })
  );

  if (!user) return null;

  const [followerCount, likesCount] = await Promise.all([
    getFollowerCount(userId),
    getLikesCountsByUser(userId),
  ]);

  const { components, profile } = user;

  return {
    id: user.id,
    name: user.name,
    image: user.image,
    components,
    profile,
    followerCount,
    likesCount,
    componentsCount: user._count.components,
  };
};

export type UserPageData = Awaited<ReturnType<typeof getUserPageData>>;
