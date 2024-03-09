"use server";

import { getSession } from "@/lib/auth/handlers";
import { InternalServerError, UnauthorizedError } from "@/lib/errors";
import { ActionResult } from "@/lib/next/actions";
import { assertUser } from "@/lib/validation";
import { createDraftComponent } from "@/services/components/post";

export type CreateDraftCompInitialValues =
  | {
      name?: string;
      categoryName?: string;
    }
  | undefined;

export const createDraftComp = async (
  initialValues?: CreateDraftCompInitialValues
): Promise<ActionResult> => {
  try {
    const { user } = await getSession();
    assertUser(user);
    const component = await createDraftComponent(user.id, initialValues);

    return {
      success: true,
      redirect: `/components/${component.id}/edit`,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const { message, status } = new UnauthorizedError();

      return {
        success: false,
        message,
        status,
      };
    }

    const { message, status } = new InternalServerError();

    return {
      success: false,
      message,
      status,
    };
  }
};
