import { toResUserRanking } from "@/domain/users/rankings";
import { prisma, runPrisma } from "@/lib/client/prisma";
import { getLikesCountsGroupByUser } from "@/services/likes/get/count/user";

export const getRankingUsers = async (take: number) => {
  const likes = await getLikesCountsGroupByUser(take);

  const userIds = likes.map((like) => like.userId);

  const users = await runPrisma(() =>
    prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        profile: {
          select: {
            website: true,
            twitter: true,
            github: true,
          },
        },
        _count: {
          select: {
            components: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })
  );

  return toResUserRanking({ likes, users });
};
