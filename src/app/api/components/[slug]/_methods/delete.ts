import { getSessionUser } from "@/lib/auth/handlers";
import { NotFoundError, handleApiError } from "@/lib/errors";
import { deleteComponent } from "@/services/components/delete";
import { getComponentCreator } from "@/services/components/get/creator";

import { Params } from "@/types/next";

const handler = async (_: Request, { params }: Params) => {
  try {
    const user = await getSessionUser();

    const targetId = await getComponentCreator(params.slug);

    if (targetId !== user.id) {
      throw new NotFoundError();
    }

    await deleteComponent(params.slug);

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const DELETE = handler;
