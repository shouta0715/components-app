import "server-only";

import React from "react";
import { CategoryCommand } from "@/components/global/parts/category-command";
import { searchCategories } from "@/services/category/get/search";

export async function CommandPallet() {
  const categories = await searchCategories(null, 20);

  return (
    <div className="flex items-center gap-x-2">
      <CategoryCommand categories={categories} />
    </div>
  );
}
