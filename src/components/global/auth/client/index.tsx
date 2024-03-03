"use client";

import { LogOutIcon, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSession, SessionProvider } from "next-auth/react";
import React, { useCallback, useEffect } from "react";

import { GitHubIcon } from "@/components/icons/GitHub";
import { GoogleIcon } from "@/components/icons/Google";
import { Icon } from "@/components/icons/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { signInGitHub, signInGoogle, signOutOauth } from "@/lib/auth/actions";

function UnAuthorized() {
  return (
    <Button asChild size="sm">
      <Link href="/auth/login" scroll={false}>
        LogIn
      </Link>
    </Button>
  );
}

function SignOutButton() {
  return (
    <form action={signOutOauth}>
      <button
        className="flex w-full items-center gap-x-2 text-sm"
        type="submit"
      >
        <LogOutIcon className="inline-block h-4 w-4" />
        <span>ログアウト</span>
      </button>
    </form>
  );
}

function Authorized({ session }: { session: Session }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="mx-2 h-8 w-8 overflow-hidden rounded-full border border-input md:h-10 md:w-10"
          variant="ghost"
        >
          <Avatar className="bg-none">
            <AvatarImage src={session.user?.image ?? ""} />
            <AvatarFallback className="animate-pulse">
              {session.user?.name?.slice(0, 2) ?? "UN"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-30 flex w-60 flex-col gap-y-2 bg-popover"
        sideOffset={4}
      >
        <div className="grid gap-y-4">
          <div className="grid gap-y-1 border-b py-2">
            <p className="font-semibold">{session.user?.name ?? ""}</p>
            <p className="flex items-center  gap-x-2 text-sm text-muted-foreground ">
              <Mail className="inline-block h-4 w-4" />
              <span className="line-clamp-1 w-full flex-1">
                {session.user?.email ?? ""}
              </span>
            </p>
          </div>

          <div className="-m-2 p-2 hover:bg-accent">
            <SignOutButton />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const GitHubButton = () => {
  return (
    <form action={signInGitHub}>
      <Button className="flex w-max gap-x-3 font-semibold" variant="outline">
        <GitHubIcon />
        <span className="px-4">GitHubでログイン</span>
      </Button>
    </form>
  );
};

export const GoogleButton = () => {
  return (
    <form action={signInGoogle}>
      <Button className="flex w-max gap-x-3 font-semibold" variant="outline">
        <GoogleIcon />
        <span className="px-4">Googleでログイン</span>
      </Button>
    </form>
  );
};

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
