"use client";

import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { Authorized, UnAuthorized } from "@/components/global/auth/server";
import { GitHubIcon } from "@/components/icons/GitHub";
import { GoogleIcon } from "@/components/icons/Google";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { signInGitHub, signInGoogle } from "@/lib/auth/actions";

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
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <h2 className="text-center text-lg font-bold uppercase text-primary">
            Log in to your account
          </h2>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <form action={signInGitHub}>
            <Button
              className="flex w-max gap-x-3 font-semibold"
              variant="outline"
            >
              <GitHubIcon />
              <span>Log in with GitHub</span>
            </Button>
          </form>
          <form action={signInGoogle}>
            <Button
              className="flex w-max gap-x-3 font-semibold"
              variant="outline"
            >
              <GoogleIcon />
              <span>Log in with GitHub</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
