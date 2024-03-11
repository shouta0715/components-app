import { getSessionUser } from "@/lib/auth/handlers";
import { NotFoundError, handleApiError } from "@/lib/errors";
import { componentUpdateSchema } from "@/lib/schema/server/component";
import { validate } from "@/lib/validation";
import { getComponentCreator } from "@/services/components/get/creator";

import { updateComponent } from "@/services/components/patch";

import { Params } from "@/types/next";

const handler = async (req: Request, { params }: Params) => {
  try {
    const user = await getSessionUser();

    const body = await req.json();

    validate(body, componentUpdateSchema);

    const targetId = await getComponentCreator(params.slug);

    if (targetId !== user.id) {
      throw new NotFoundError();
    }

    await updateComponent(params.slug, body);

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const PATCH = handler;
