import { prisma, runPrisma } from "@/lib/client/prisma";
import { getLikesCountsGroupByUserSQL } from "@/services/likes/get/count/user/sql";

type Likes = {
  userId: string;
  count: bigint;
};

export const getLikesCountsGroupByUser = async (take: number) => {
  const sql = getLikesCountsGroupByUserSQL(take);

  const likes = await runPrisma<Likes[]>(() => prisma.$queryRaw(sql));

  return likes;
};

export const getLikesCountsByUser = async (userId: string) => {
  const likes = await runPrisma(() =>
    prisma.like.count({
      where: {
        userId,
      },
    })
  );

  return likes;
};
