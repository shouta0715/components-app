"server only";

import React from "react";
import { CategoryCommand } from "@/components/global/parts/category-command";
import { getCategories } from "@/services/category/get";

export async function CommandPallet() {
  const categories = await getCategories(50);

  return (
    <div className="flex items-center gap-x-2">
      <CategoryCommand categories={categories} />
    </div>
  );
}
