import { getSessionUser } from "@/lib/auth/handlers";
import { handleApiError } from "@/lib/errors";
import { categorySchema } from "@/lib/schema/server/category";
import { validate } from "@/lib/validation";
import { createCategory } from "@/services/category/post";

export const dynamic = "force-dynamic";

const handler = async (req: Request) => {
  try {
    await getSessionUser();

    const body = await req.json();

    validate(body, categorySchema);

    const data = await createCategory(body);

    return Response.json({ category: data }, { status: 201 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const POST = handler;
