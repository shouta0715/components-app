import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { CategoryInfo } from "@/app/(app)/(page)/categories/[name]/_features/category/components";
import { OrderButton } from "@/app/(app)/(page)/categories/[name]/_features/common/components/order-button";
import { CategoryComponents } from "@/app/(app)/(page)/categories/[name]/_features/ui-components/components/category-component";
import { getCategoryOrder } from "@/app/(app)/(page)/categories/[name]/_features/ui-components/utils";
import { SearchParamsPagination } from "@/components/elements/pagination/search-params";
import { UIComponentLoader } from "@/components/elements/ui-components/loader";
import { getCategoryByName } from "@/services/category/get/by-name";
import { Params, SearchParams } from "@/types/next";
import { parseSearchParams } from "@/utils";
import { checkOverPage, getSkipPage } from "@/utils/pagination";

function CategoryLoader() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10">
      <UIComponentLoader />
    </div>
  );
}

export default async function Page({
  params,
  searchParams,
}: Params<"name"> & SearchParams) {
  const search = parseSearchParams(searchParams);

  const category = await getCategoryByName(params.name);

  if (!category) notFound();

  const order = getCategoryOrder(search.order);

  checkOverPage({
    total: category.count,
    current: search.page,
    pathname: `/categories/${params.name}`,
  });

  return (
    <div className="animate-fade-in overflow-hidden">
      <CategoryInfo data={category} />
      <div className="mb-6 mt-12 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Components</h2>
        <OrderButton name={params.name} order={order} />
      </div>
      <Suspense fallback={<CategoryLoader />}>
        <CategoryComponents
          name={params.name}
          order={order}
          skip={getSkipPage(search.page)}
        />
      </Suspense>

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
              total={category.count}
            />
          </Suspense>
        </div>
      </nav>
    </div>
  );
}
