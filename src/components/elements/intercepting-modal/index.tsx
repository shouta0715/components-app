"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

import { Dialog } from "@/components/ui/dialog";

export function InterceptingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <Dialog defaultOpen onOpenChange={onDismiss}>
      {children}
    </Dialog>
  );
}
