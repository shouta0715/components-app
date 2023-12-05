import React from "react";
import { CommandPallet } from "@/components/global/server/command-pallet";
import { NavSheet } from "@/components/global/server/nav-sheet";
import { UserAvatar } from "@/components/global/server/user-avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  return (
    <header className="shrink-0 border-b bg-background dark:border-gray-700">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-2">
          <NavSheet />
          <img
            alt="Your Company"
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          />
        </div>
        <div className="flex items-center gap-x-4 md:gap-x-6">
          <CommandPallet />
          <ThemeToggle />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
