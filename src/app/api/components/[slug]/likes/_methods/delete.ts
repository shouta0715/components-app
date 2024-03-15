import { auth } from "@/lib/auth";
import { UnauthorizedError, handleApiError } from "@/lib/errors";
import { assertUser } from "@/lib/validation";
import { deleteLike } from "@/services/likes/delete";
import { Params } from "@/types/next";

const handler = async (_: Request, { params }: Params) => {
  try {
    const session = await auth();

    if (!session) throw new UnauthorizedError();
    assertUser(session.user);

    await deleteLike(params.slug, session.user.id);

    const result = {
      message: "Success",
      liked: false,
    };

    return Response.json(result, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const DELETE = handler;
