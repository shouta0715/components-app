import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { CategoryInfo } from "@/app/(app)/categories/[name]/_features/category/components";
import { OrderButton } from "@/app/(app)/categories/[name]/_features/common/components/order-button";
import { ComponentsOrder } from "@/app/(app)/categories/[name]/_features/common/types";
import { CategoryComponents } from "@/app/(app)/categories/[name]/_features/ui-components/components/category-component";
import { UIComponentLoader } from "@/components/elements/ui-components/loader";
import { getCategoryByName } from "@/services/category/get";
import { Params, SearchParams } from "@/types/next";
import { parseSearchParams } from "@/utils";

const getOrder = (order: string): ComponentsOrder => {
  if (order === "new") return "new";
  if (order === "popular") return "popular";

  return "trend";
};

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

  const order = getOrder(search.order);

  return (
    <div className="overflow-hidden">
      <CategoryInfo data={category} />
      <div className="mb-6 mt-12 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Components</h2>
        <OrderButton name={params.name} order={order} />
      </div>
      <Suspense fallback={<CategoryLoader />}>
        <CategoryComponents
          name={params.name}
          order={order}
          skip={search.skip}
          take={search.take}
        />
      </Suspense>
    </div>
  );
}
