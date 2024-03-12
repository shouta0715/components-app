import { User } from "@prisma/client";
import { BadRequestError } from "@/lib/errors";
import { RankingUser } from "@/types/prisma";

type InputRankingUsers = {
  users: (Pick<User, "id" | "name" | "image"> & {
    _count: {
      components: number;
    };
  })[];
  likes: {
    userId: string;
    count: bigint;
  }[];
};

export const toResUserRanking = ({
  likes,
  users,
}: InputRankingUsers): RankingUser[] => {
  return likes.map((like) => {
    const user = users.find((u) => u.id === like.userId);

    if (!user) throw new BadRequestError();

    return {
      ...user,
      likes_count: Number(like.count),
      component_count: user._count.components,
    };
  });
};
