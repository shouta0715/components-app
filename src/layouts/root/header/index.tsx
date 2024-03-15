import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { ClientSession } from "@/components/global/auth/client";
import { CommandPallet } from "@/components/global/command";

import { ThemeToggle } from "@/components/global/theme";
import { Icon } from "@/components/icons/Icon";
import { NavSheet } from "@/layouts/root/nav-sheet";

// 共通のヘッダー
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

// ユーザーセッションを表示する PPRがproductionになったら、このコンポーネントは Server Sideに移動する
export function AppHeader() {
  return (
    <SessionProvider>
      <CommonHeader>
        <ClientSession />
      </CommonHeader>
    </SessionProvider>
  );
}

// ユーザーセッションを表示する PPRがproductionになったら、このコンポーネントは Server Sideに移動する
export function PreviewHeader() {
  return (
    <SessionProvider>
      <CommonHeader preview>
        <ClientSession />
      </CommonHeader>
    </SessionProvider>
  );
}

// 認証ボタンなどを入れていない
export function AuthHeader() {
  return <CommonHeader />;
}
