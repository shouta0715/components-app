import { describe, expect, test } from "vitest";
import { prisma } from "@/lib/client/prisma";
import { createFollow, deleteFollow } from "@/services/follow/post";
import { defineFollowFactory, defineUserFactory } from "@/tests/fabbrica";

describe("POST Follow RDB test", () => {
  test("createFollow", async () => {
    const follower = await defineUserFactory().create();

    const following = await defineUserFactory().create();

    const result = await createFollow(follower.id, following.id);

    expect(result.followerId).toStrictEqual(follower.id);
    expect(result.followingId).toStrictEqual(following.id);
    expect(result.createdAt).not.toBeUndefined();
  });

  test("deleteFollow", async () => {
    const follower = defineUserFactory();
    const following = defineUserFactory();

    const follow = await defineFollowFactory({
      defaultData: {
        follower,
        following,
      },
    }).create();

    const createdFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: follow.followerId,
          followingId: follow.followingId,
        },
      },
    });

    expect(createdFollow).not.toBeNull();
    expect(createdFollow?.followerId).toStrictEqual(follow.followerId);
    expect(createdFollow?.followingId).toStrictEqual(follow.followingId);

    await deleteFollow(follow.followerId, follow.followingId);

    const deletedFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: follow.followerId,
          followingId: follow.followingId,
        },
      },
    });

    expect(deletedFollow).toBeNull();
  });
});
