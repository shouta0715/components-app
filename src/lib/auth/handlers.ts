import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/errors";

export const getSession = async (): Promise<Session> => {
  const session = await auth();

  if (!session) throw new UnauthorizedError();

  return session;
};
