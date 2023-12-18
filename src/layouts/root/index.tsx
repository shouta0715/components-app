import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Footer } from "@/layouts/root/footer";
import { Header } from "@/layouts/root/header";
import { LeftSide } from "@/layouts/root/left";

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="mx-auto flex h-full w-full max-w-7xl flex-1 items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <aside className="sticky top-20 hidden h-full w-52 shrink-0 rounded-md p-2 lg:block">
            <LeftSide />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
