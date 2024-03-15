import { auth } from "@/lib/auth";
import { UnauthorizedError, handleApiError } from "@/lib/errors";
import { assertUser } from "@/lib/validation";
import { createLike } from "@/services/likes/post";
import { Params } from "@/types/next";

const handler = async (_: Request, { params }: Params) => {
  try {
    const session = await auth();

    if (!session) throw new UnauthorizedError();
    assertUser(session.user);

    await createLike(params.slug, session.user.id);

    const result = {
      message: "Success",
      liked: true,
    };

    return Response.json(result, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const POST = handler;
