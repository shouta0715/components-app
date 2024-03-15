import "server-only";
import { AuthorizedAvatar } from "@/components/global/auth/client/avatar";
import { AuthLink } from "@/components/global/auth/server/auth-link";
import { auth } from "@/lib/auth";

export const ServerAuth = async ({ form = true }: { form?: boolean }) => {
  const session = await auth();

  return session ? (
    <AuthorizedAvatar form={form} session={session} />
  ) : (
    <AuthLink />
  );
};
