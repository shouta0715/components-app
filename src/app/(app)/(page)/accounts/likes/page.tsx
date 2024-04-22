import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { SearchParamsPagination } from "@/components/elements/pagination/search-params";
import { UIComponent } from "@/components/elements/ui-components";
import { getSessionUser } from "@/lib/auth/handlers";
import { getLikesComponentCount } from "@/services/components/get/counts";
import { getLikesComponents } from "@/services/components/get/likes";
import { SearchParams } from "@/types/next";
import { parseSearchParams } from "@/utils";
import { checkOverPage, getSkipPage } from "@/utils/pagination";

export default async function Page({ searchParams }: SearchParams) {
  const user = await getSessionUser();
  const search = parseSearchParams(searchParams);

  const maxCount = await getLikesComponentCount(user.id);

  if (maxCount === 0) return notFound();

  checkOverPage({
    total: maxCount,
    current: search.page,
    pathname: `/accounts/likes`,
  });

  const components = await getLikesComponents({
    userId: user.id,
    skip: getSkipPage(search.page),
    take: 20,
  });

  return (
    <div className="animate-fade-in overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">いいねしたコンポーネント</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10">
        {components.map((component) => {
          return (
            <UIComponent
              key={component.id}
              {...component}
              count={component._count.likes}
              extensions={component.files}
            />
          );
        })}
      </div>

      <nav
        aria-label="Pagination"
        className="mt-6 flex items-center justify-between py-3 sm:px-6"
      >
        <div className="flex flex-1 justify-center">
          <Suspense>
            <SearchParamsPagination
              className="font-semibold"
              prevButtonProps={{
                variant: "ghost",
                className: "mr-2",
              }}
              total={maxCount}
            />
          </Suspense>
        </div>
      </nav>
    </div>
  );
}
