import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { ServerAuth } from "@/components/global/auth/server";
import { ThemeToggle } from "@/components/global/theme";
import { Skeleton } from "@/components/ui/skeleton";
import { NavSheet } from "@/layouts/root/nav-sheet";

const DynamicComponentBreadcrumbs = dynamic(
  () =>
    import(
      "@/app/(app)/(edit)/components/[slug]/edit/_features/common/components/client/breadcrumbs"
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="mx-2 h-10 flex-1" />,
  }
);

export async function EditHeader() {
  return (
    <div className="sticky top-0 z-20 -mx-4 -mt-10 border-b border-border bg-background/90 px-2.5 py-2 sm:-mx-6 md:px-4 lg:-mx-8">
      <div className="flex h-full items-center justify-between">
        <div className="flex h-full">
          <NavSheet preview />
          <div aria-hidden className="mx-2 my-1 w-px bg-border" />
        </div>

        <Suspense fallback={<Skeleton className="my-2 h-10" />}>
          <DynamicComponentBreadcrumbs />
        </Suspense>

        <div className="flex h-full">
          <div aria-hidden className="my-1 mr-2 w-px  bg-border" />
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            <Suspense>
              <ServerAuth />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
