import "server-only";

import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/errors";
import { assertUser } from "@/lib/validation";

export const getSession = async (): Promise<Session> => {
  const session = await auth();

  if (!session) throw new UnauthorizedError();

  return session;
};

export const assertMine = async (target: string, onError: () => never) => {
  try {
    const session = await getSession();
    assertUser(session.user);

    if (target !== session.user.id) {
      onError();
    }
  } catch (error) {
    onError();
  }
};
