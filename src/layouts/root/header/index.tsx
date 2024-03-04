import Link from "next/link";
import React from "react";

import { ClientAuth } from "@/components/global/auth/client";
import { CommandPallet } from "@/components/global/server/command-pallet";
import { NavSheet } from "@/components/global/server/nav-sheet";

import { Icon } from "@/components/icons/Icon";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function CommonHeader({
  children,
  preview = false,
}: {
  children?: React.ReactNode;
  preview?: boolean;
}) {
  return (
    <header className="shrink-0 border-b bg-background dark:border-gray-700">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-2">
          <NavSheet preview={preview} />
          <Link className="flex items-center gap-4" href="/">
            <Icon className="hidden h-6 w-auto lg:block" />
            <span className="text-xl font-bold sm:inline-block">UI TRADE</span>
          </Link>
        </div>
        <div className="flex items-center gap-x-4 transition-opacity duration-1000 animate-in fade-in-0 md:gap-x-6">
          <CommandPallet />
          <ThemeToggle />
          {children}
        </div>
      </div>
    </header>
  );
}

export function AppHeader() {
  return (
    <CommonHeader>
      <ClientAuth />
    </CommonHeader>
  );
}

export function PreviewHeader() {
  return (
    <CommonHeader preview>
      <ClientAuth />
    </CommonHeader>
  );
}

export function AuthHeader() {
  return <CommonHeader />;
}
