"server only";

import { LogOutIcon, Mail } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOutOauth } from "@/lib/auth/actions";

export function UnAuthorized() {
  return (
    <Button asChild size="sm">
      <Link href="/auth/login" scroll={false}>
        LogIn
      </Link>
    </Button>
  );
}

export function SignOutButton() {
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

export function Authorized({ session }: { session: Session }) {
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
        className="flex w-60 flex-col gap-y-2 bg-popover"
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
