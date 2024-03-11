import { getSessionUser } from "@/lib/auth/handlers";
import { NotFoundError, handleApiError } from "@/lib/errors";
import { filesUpdateSchema } from "@/lib/schema/server/files";
import { validate } from "@/lib/validation";
import { getComponentCreator } from "@/services/components/get/creator";
import { updateComponentFiles } from "@/services/components/patch";

import { Params } from "@/types/next";

const handler = async (req: Request, { params }: Params) => {
  try {
    const user = await getSessionUser();

    const body = await req.json();

    validate(body, filesUpdateSchema);

    const targetId = await getComponentCreator(params.slug);

    if (targetId !== user.id) {
      throw new NotFoundError();
    }

    const { files } = await updateComponentFiles(params.slug, body);

    const ids: { [key: string]: number } = {};

    for (const file of files) {
      ids[file.objectId] = file.id;
    }

    return Response.json({ ids }, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const PATCH = handler;
