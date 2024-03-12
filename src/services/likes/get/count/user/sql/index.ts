import { Prisma } from "@prisma/client";

export const getLikesCountsGroupByUserSQL = (take: number) => {
  return Prisma.sql`
    SELECT "userId", COUNT("userId") as "count"
    FROM "likes"
    GROUP BY "userId"
    ORDER BY "count" DESC
    LIMIT ${take}
  `;
};
