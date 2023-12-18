import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";

export const getSession = async (): Promise<Session> => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
};
