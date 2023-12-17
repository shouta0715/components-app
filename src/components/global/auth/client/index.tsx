"use client";

import { useSession, SessionProvider } from "next-auth/react";
import { Authorized, UnAuthorized } from "@/components/global/auth/server";
import { Skeleton } from "@/components/ui/skeleton";

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

function UserAvatar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="mx-2 h-8 w-8 rounded-full md:h-10 md:w-10" />;
  }

  return session ? <Authorized session={session} /> : <UnAuthorized />;
}

export function AuthUser() {
  return (
    <AuthProvider>
      <UserAvatar />
    </AuthProvider>
  );
}
