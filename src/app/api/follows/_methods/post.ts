import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { UnauthorizedError, handleApiError } from "@/lib/errors";
import { followSchema } from "@/lib/schema/server/follow";
import { assertUser, validate } from "@/lib/validation";
import { createFollow, deleteFollow } from "@/services/follow/post";

const handler = async (req: Request) => {
  try {
    const session = await auth();

    if (!session) throw new UnauthorizedError();
    assertUser(session.user);

    const body = await req.json();
    validate(body, followSchema);

    const { trigger, followerId, followingId } = body;

    if (followerId !== session.user.id) throw new UnauthorizedError();

    if (trigger === "unfollow") {
      await deleteFollow(followerId, followingId);
    } else {
      await createFollow(followerId, followingId);
    }

    const result = {
      message: "Success",
      followed: trigger === "follow",
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const POST = handler;
