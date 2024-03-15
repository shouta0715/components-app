import { AuthLink } from "@/components/global/auth/server/auth-link";
import { AuthorizedAvatar } from "@/components/global/auth/server/avatar";
import { auth } from "@/lib/auth";
import "server-only";

export const ServerAuth = async ({ form = true }: { form?: boolean }) => {
  const session = await auth();

  return session ? (
    <AuthorizedAvatar form={form} session={session} />
  ) : (
    <AuthLink />
  );
};
