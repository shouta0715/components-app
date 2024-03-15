import React from "react";

import { Pattern } from "@/components/ui/pattern";
import { Providers } from "@/layouts/providers";
import { Footer } from "@/layouts/root/footer";
import { AppHeader, AuthHeader, PreviewHeader } from "@/layouts/root/header";
import { LeftSide } from "@/layouts/root/left";

// ルートページのレイアウト
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <AppHeader />
        </div>
        <div className="mx-auto flex h-full w-full max-w-7xl flex-1 items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <aside className="sticky top-20 hidden h-full w-52 shrink-0 rounded-md p-2 lg:block">
            <LeftSide />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};

// プレビューページのレイアウト Side Barを表示しない
export function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <PreviewHeader />
        </div>
        <div className="mx-auto h-full w-full max-w-7xl flex-1 items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </Providers>
  );
}

// 認証ページのレイアウト 認証ボタンなどを入れていない
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <AuthHeader />
        </div>
        <div className="mx-auto flex h-full w-full max-w-7xl flex-1 items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <aside className="sticky top-20 hidden h-full w-52 shrink-0 rounded-md p-2 lg:block">
            <LeftSide />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};

// 編集ページのレイアウト Headerを表示しない
export const EditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Pattern />
      <div className="flex min-h-screen flex-col">
        <div className="mx-auto h-full w-full max-w-screen-2xl flex-1 items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};
