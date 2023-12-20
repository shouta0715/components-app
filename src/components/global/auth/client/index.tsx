"use client";

import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import { useCallback, useEffect } from "react";
import {
  Authorized,
  GitHubButton,
  GoogleButton,
  UnAuthorized,
} from "@/components/global/auth/server";
import { Icon } from "@/components/icons/Icon";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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
          <h2 className="mx-auto flex items-center gap-2 text-center text-3xl   text-primary">
            <Icon className="h-7 w-auto" />
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
