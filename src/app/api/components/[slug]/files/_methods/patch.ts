import { getSessionUser } from "@/lib/auth/handlers";
import { NotFoundError, handleApiError } from "@/lib/errors";
import { filesUpdateSchema } from "@/lib/schema/server/files";
import { validate } from "@/lib/validation";
import { getComponentCreatorId } from "@/services/components/get";
import { updateComponentFiles } from "@/services/components/patch";

import { Params } from "@/types/next";

const handler = async (req: Request, { params }: Params) => {
  try {
    const user = await getSessionUser();

    const body = await req.json();

    validate(body, filesUpdateSchema);

    const targetId = await getComponentCreatorId(params.slug);

    if (targetId !== user.id) {
      throw new NotFoundError();
    }

    await updateComponentFiles(params.slug, body);

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const PATCH = handler;
