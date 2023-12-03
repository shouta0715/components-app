import { Mail } from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import {
  AuthButton,
  SignOutButton,
} from "@/components/global/parts/auth-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { auth } from "@/lib/auth";

function UnAuthorized() {
  return <AuthButton />;
}

function Authorized({ session }: { session: Session }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src={session.user?.image ?? ""} />
          <AvatarFallback>
            {session.user?.name?.slice(0, 2) ?? "UN"}
          </AvatarFallback>
        </Avatar>
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

export async function UserAvatar() {
  const session = await auth();

  return session ? <Authorized session={session} /> : <UnAuthorized />;
}
