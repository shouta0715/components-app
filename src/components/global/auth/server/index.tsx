import { AuthLink } from "@/components/global/auth/server/atuh-link";
import { AuthorizedAvatar } from "@/components/global/auth/server/avatar";
import { auth } from "@/lib/auth";
import "server-only";

export const ServerAuth = async () => {
  const session = await auth();

  return session ? <AuthorizedAvatar session={session} /> : <AuthLink />;
};
