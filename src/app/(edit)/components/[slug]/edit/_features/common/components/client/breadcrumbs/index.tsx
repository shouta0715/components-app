"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useMediaQuery } from "@/components/elements/category/form/useCategoryForm";
import { Skeleton } from "@/components/ui/skeleton";

const DynamicDesktopComponentBreadcrumbs = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/common/components/client/breadcrumbs/desktop"
    ),
  {
    ssr: true,
    loading: () => <Skeleton className="mx-2 h-10 flex-1" />,
  }
);

const DynamicMobileComponentBreadcrumbs = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/common/components/client/breadcrumbs/mobile"
    ),
  {
    ssr: true,
    loading: () => <Skeleton className="mx-2 h-10 flex-1" />,
  }
);

function ComponentBreadcrumbs() {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <div className="h-full flex-1">
      <nav className="flex">
        {isDesktop ? (
          <div className="hidden flex-1 sm:flex sm:gap-x-2 md:gap-x-1 lg:gap-x-3">
            <Suspense fallback={<Skeleton className="mx-2 h-10 flex-1" />}>
              <DynamicDesktopComponentBreadcrumbs />
            </Suspense>
          </div>
        ) : (
          <div className="flex-1 sm:hidden">
            <Suspense fallback={<Skeleton className="mx-2 h-10 flex-1" />}>
              <DynamicMobileComponentBreadcrumbs />
            </Suspense>
          </div>
        )}
      </nav>
    </div>
  );
}

export default ComponentBreadcrumbs;
