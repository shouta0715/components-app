"use client";

import { FolderLock, Heart, LucideIcon, UserCog, Users } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import React from "react";

import { createDraftComponentWithRedirect } from "@/actions/components/create";
import { SignOutButton } from "@/components/global/auth/server/auth-button";
import { ActiveLink } from "@/components/ui/active-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};
const links: TLink[] = [
  {
    name: "投稿の管理",
    href: "/accounts/components",
    icon: FolderLock,
  },
  {
    name: "プロフィールの編集",
    href: "/accounts/profile",
    icon: UserCog,
  },
  {
    name: "いいねした投稿",
    href: "/accounts/likes",
    icon: Heart,
  },
  {
    name: "フォロワーの投稿",
    href: "/accounts/followers",
    icon: Users,
  },
];

export function AuthorizedAvatar({
  session,
  form = true,
}: {
  session: Session;
  form?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className="mx-2 h-8 w-8 overflow-hidden rounded-full border border-input md:h-10 md:w-10"
            variant="ghost"
          >
            <Avatar className="bg-none">
              <AvatarImage
                className="object-cover"
                src={session.user?.image ?? ""}
              />
              <AvatarFallback className="animate-pulse">
                {session.user?.name?.slice(0, 2) ?? "UN"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="z-50 w-60 p-0 text-sm"
          sideOffset={4}
        >
          <div className="border-b border-border">
            <Link
              className="flex items-center border-b border-border p-4 text-sm font-semibold hover:bg-accent"
              href={`/users/${session.user?.id}`}
              onClick={() => setOpen(false)}
            >
              <span className="line-clamp-1 flex-1">
                {session.user?.name ?? ""}
              </span>
            </Link>

            {links.map((link) => (
              <ActiveLink
                key={link.name}
                activeClass="pointer-events-none"
                className="group relative flex h-auto justify-start rounded-none px-4 py-3 hover:bg-accent hover:no-underline"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <div className="mr-2 size-5">
                  <link.icon
                    aria-hidden="true"
                    className="size-full text-muted-foreground"
                  />
                </div>
                <div>
                  <span>{link.name}</span>
                </div>
              </ActiveLink>
            ))}
          </div>

          <div>
            <SignOutButton className="p-4 hover:bg-accent" />
          </div>
        </PopoverContent>
      </Popover>
      {form && (
        <form
          action={createDraftComponentWithRedirect}
          className="hidden sm:block"
        >
          <Button className="font-semibold" size="sm" type="submit">
            投稿する
          </Button>
        </form>
      )}
    </>
  );
}
