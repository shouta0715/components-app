"use server";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/handlers";
import { REDIRECT_PUSH } from "@/lib/constant";
import { assertUser } from "@/lib/validation";
import { createDraftComponent } from "@/services/components/post";

export const createDraftComp = async () => {
  const { user } = await getSession();
  assertUser(user);

  const component = await createDraftComponent(user.id);

  redirect(`/components/${component.id}`, REDIRECT_PUSH);
};
