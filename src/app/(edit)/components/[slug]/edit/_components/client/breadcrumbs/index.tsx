"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useMediaQuery } from "@/components/elements/category/form/useCategoryForm";
import { Skeleton } from "@/components/ui/skeleton";

function DesktopLoading() {
  return [1, 2, 3].map((i) => (
    <Skeleton key={i} className="my-2 h-10 w-full flex-1" />
  ));
}

const DynamicDesktopComponentBreadcrumbs = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_components/client/breadcrumbs/desktop"
    ),
  {
    ssr: false,
    loading: () => <DesktopLoading />,
  }
);

const DynamicMobileComponentBreadcrumbs = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_components/client/breadcrumbs/mobile"
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-full flex-1" />,
  }
);

function ComponentBreadcrumbs() {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <div className="h-full flex-1">
      <nav className="flex">
        {isDesktop ? (
          <div className="hidden flex-1  grid-cols-3 divide-x divide-border sm:grid">
            <Suspense fallback={<DesktopLoading />}>
              <DynamicDesktopComponentBreadcrumbs />
            </Suspense>
          </div>
        ) : (
          <div className="flex-1 py-2 sm:hidden">
            <Suspense fallback={<Skeleton className="h-10 flex-1" />}>
              <DynamicMobileComponentBreadcrumbs />
            </Suspense>
          </div>
        )}
      </nav>
    </div>
  );
}

export default ComponentBreadcrumbs;
