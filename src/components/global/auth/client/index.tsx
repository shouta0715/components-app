"use client";

import { useSession, SessionProvider } from "next-auth/react";
import React from "react";

import { AuthLink } from "@/components/global/auth/server/atuh-link";
import { AuthorizedAvatar } from "@/components/global/auth/server/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function Session() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="mx-2 h-8 w-8 rounded-full md:h-10 md:w-10" />;
  }

  return session ? <AuthorizedAvatar session={session} /> : <AuthLink />;
}

export function ClientAuth() {
  return (
    <SessionProvider>
      <Session />
    </SessionProvider>
  );
}
