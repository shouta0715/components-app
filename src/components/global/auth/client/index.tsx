"use client";

import { useSession } from "next-auth/react";
import React from "react";

import { AuthorizedAvatar } from "@/components/global/auth/client/avatar";
import { AuthLink } from "@/components/global/auth/server/auth-link";
import { Skeleton } from "@/components/ui/skeleton";

// TODO: pprがproductionになったら、このコンポーネントは Server Sideに移動する

export function ClientSession() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="mx-2 h-8 w-8 rounded-full md:h-10 md:w-10" />;
  }

  return session ? <AuthorizedAvatar session={session} /> : <AuthLink />;
}
