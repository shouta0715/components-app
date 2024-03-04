"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

import {
  GitHubButton,
  GoogleButton,
} from "@/components/global/auth/server/auth-button";
import { Icon } from "@/components/icons/Icon";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export function AuthModal() {
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
      <DialogContent className="grid max-w-sm gap-8">
        <DialogHeader>
          <h2 className="mx-auto flex flex-col items-center gap-2 text-center text-3xl   text-primary">
            <Icon className="h-7 w-auto sm:h-10" />
            <span className="font-semibold">UI TRADE</span>
          </h2>
        </DialogHeader>

        <p className="text-sm">
          UIをシェアするプラットフォームです。
          あなたの作ったUIが世界中の開発者に使われるかもしれません。
        </p>

        <div className="flex flex-col items-center space-y-4">
          <GitHubButton />
          <GoogleButton />
        </div>
      </DialogContent>
    </Dialog>
  );
}
